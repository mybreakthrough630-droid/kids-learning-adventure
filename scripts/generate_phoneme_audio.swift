import AVFoundation
import Foundation

struct Phoneme {
    let fileName: String
    let ipa: String
}

let phonemes = [
    Phoneme(fileName: "p", ipa: "p"),
    Phoneme(fileName: "b", ipa: "b"),
    Phoneme(fileName: "t", ipa: "t"),
    Phoneme(fileName: "d", ipa: "d"),
    Phoneme(fileName: "k", ipa: "k"),
    Phoneme(fileName: "g", ipa: "g"),
    Phoneme(fileName: "f", ipa: "f"),
    Phoneme(fileName: "v", ipa: "v"),
    Phoneme(fileName: "theta", ipa: "θ"),
    Phoneme(fileName: "eth", ipa: "ð"),
    Phoneme(fileName: "s", ipa: "s"),
    Phoneme(fileName: "z", ipa: "z"),
    Phoneme(fileName: "sh", ipa: "ʃ"),
    Phoneme(fileName: "zh", ipa: "ʒ"),
    Phoneme(fileName: "h", ipa: "h"),
    Phoneme(fileName: "ch", ipa: "tʃ"),
    Phoneme(fileName: "j", ipa: "dʒ"),
    Phoneme(fileName: "m", ipa: "m"),
    Phoneme(fileName: "n", ipa: "n"),
    Phoneme(fileName: "ng", ipa: "ŋ"),
    Phoneme(fileName: "l", ipa: "l"),
    Phoneme(fileName: "r", ipa: "ɹ"),
    Phoneme(fileName: "w", ipa: "w"),
    Phoneme(fileName: "y", ipa: "j"),
    Phoneme(fileName: "i-long", ipa: "iː"),
    Phoneme(fileName: "i-short", ipa: "ɪ"),
    Phoneme(fileName: "e", ipa: "e"),
    Phoneme(fileName: "a", ipa: "æ"),
    Phoneme(fileName: "ar", ipa: "ɑː"),
    Phoneme(fileName: "o-short", ipa: "ɒ"),
    Phoneme(fileName: "or", ipa: "ɔː"),
    Phoneme(fileName: "u-short", ipa: "ʊ"),
    Phoneme(fileName: "u-long", ipa: "uː"),
    Phoneme(fileName: "uh", ipa: "ʌ"),
    Phoneme(fileName: "ur", ipa: "ɜː"),
    Phoneme(fileName: "schwa", ipa: "ə"),
    Phoneme(fileName: "ai", ipa: "eɪ"),
    Phoneme(fileName: "igh", ipa: "aɪ"),
    Phoneme(fileName: "oi", ipa: "ɔɪ"),
    Phoneme(fileName: "oa", ipa: "əʊ"),
    Phoneme(fileName: "ow", ipa: "aʊ"),
    Phoneme(fileName: "ear", ipa: "ɪə"),
    Phoneme(fileName: "air", ipa: "eə"),
    Phoneme(fileName: "ure", ipa: "ʊə"),
    Phoneme(fileName: "x", ipa: "ks"),
    Phoneme(fileName: "qu", ipa: "kw")
]

let outputDirectory = URL(fileURLWithPath: CommandLine.arguments.dropFirst().first ?? "assets/phonemes", isDirectory: true)
try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)

let requestedVoice = CommandLine.arguments.dropFirst(2).first ?? "com.apple.voice.compact.en-GB.Daniel"
guard let voice = AVSpeechSynthesisVoice(identifier: requestedVoice)
    ?? AVSpeechSynthesisVoice.speechVoices().first(where: { $0.name == "Daniel" && $0.language == "en-GB" }) else {
    fputs("The British English voice used for phoneme audio is unavailable.\n", stderr)
    exit(1)
}

print("Generating with \(voice.name) (\(voice.language))")

for phoneme in phonemes {
    // Continuous consonants need a little extra length to be clearly audible to
    // young learners. Stops and affricates stay short so that /p/ does not turn
    // into "puh". The length mark changes duration, not the target phoneme.
    let sustained = Set(["f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "h", "m", "n", "ŋ", "l", "ɹ"])
    // Put sustained copies inside one phoneme instruction. This lengthens the
    // sound as one continuous utterance instead of creating stop-start repeats.
    let recordingIPA = sustained.contains(phoneme.ipa)
        ? Array(repeating: "\(phoneme.ipa)ː", count: 3).joined()
        : phoneme.ipa
    let ssml = "<speak version=\"1.1\" xml:lang=\"en-GB\"><phoneme alphabet=\"ipa\" ph=\"\(recordingIPA)\">sound</phoneme></speak>"
    guard let utterance = AVSpeechUtterance(ssmlRepresentation: ssml) else {
        throw NSError(domain: "PhonemeAudio", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not create the /\(phoneme.ipa)/ utterance"])
    }
    utterance.voice = voice
    utterance.rate = 0.22
    utterance.pitchMultiplier = 1.04
    utterance.preUtteranceDelay = 0.04
    utterance.postUtteranceDelay = 0.08

    let pcmURL = outputDirectory.appendingPathComponent("\(phoneme.fileName).caf")
    let outputURL = outputDirectory.appendingPathComponent("\(phoneme.fileName).m4a")
    try? FileManager.default.removeItem(at: pcmURL)
    try? FileManager.default.removeItem(at: outputURL)

    let synthesizer = AVSpeechSynthesizer()
    let finished = DispatchSemaphore(value: 0)
    var audioFile: AVAudioFile?
    var writeError: Error?

    synthesizer.write(utterance) { buffer in
        guard let pcmBuffer = buffer as? AVAudioPCMBuffer else {
            writeError = NSError(domain: "PhonemeAudio", code: 1, userInfo: [NSLocalizedDescriptionKey: "Unexpected audio buffer type"])
            finished.signal()
            return
        }

        if pcmBuffer.frameLength == 0 {
            finished.signal()
            return
        }

        do {
            if audioFile == nil {
                audioFile = try AVAudioFile(forWriting: pcmURL, settings: pcmBuffer.format.settings)
            }
            try audioFile?.write(from: pcmBuffer)
        } catch {
            writeError = error
            finished.signal()
        }
    }

    while finished.wait(timeout: .now() + 0.05) == .timedOut {
        RunLoop.current.run(until: Date(timeIntervalSinceNow: 0.02))
    }

    if let writeError {
        throw writeError
    }

    audioFile = nil
    let converter = Process()
    converter.executableURL = URL(fileURLWithPath: "/usr/bin/afconvert")
    converter.arguments = [pcmURL.path, outputURL.path, "-f", "m4af", "-d", "aac", "-b", "64000", "-q", "127"]
    try converter.run()
    converter.waitUntilExit()
    guard converter.terminationStatus == 0 else {
        throw NSError(domain: "PhonemeAudio", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not convert /\(phoneme.ipa)/ to M4A"])
    }
    try FileManager.default.removeItem(at: pcmURL)
    print("Created \(outputURL.lastPathComponent) from /\(phoneme.ipa)/")
}
