(() => {
  const language = document.body.dataset.language === "en" ? "en" : "zh";
  const categories = window.WORD_LIBRARY.categories;
  const itemsByCategory = window.WORD_LIBRARY.items;
  const $ = (selector) => document.querySelector(selector);
  const state = {
    categoryId: categories[0].id,
    currentIndex: -1,
    order: [],
    score: Number(sessionStorage.getItem(`wordScore-${language}`) || 0),
    celebratedKey: "",
    activeAudio: null,
    buildTimers: []
  };

  const categoryList = $("#categoryList");
  const wordCard = $("#wordCard");
  const wordElement = $("#word");
  const feedback = $("#feedback");
  const micBtn = $("#micBtn");
  const buildBtn = $("#buildBtn");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function shuffle(length) {
    const values = Array.from({ length }, (_, index) => index);
    for (let index = values.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
    }
    return values;
  }

  function category() {
    return categories.find((item) => item.id === state.categoryId);
  }

  function categoryItems() {
    return itemsByCategory[state.categoryId];
  }

  function currentItem() {
    return categoryItems()[state.order[state.currentIndex]];
  }

  function itemKey() {
    return `${language}-${state.categoryId}-${currentItem().id}`;
  }

  function renderCategories() {
    categoryList.innerHTML = categories.map((item) => `
      <button class="category-button ${item.id === state.categoryId ? "active" : ""}" type="button" data-category="${item.id}">
        <span class="category-icon" aria-hidden="true">${item.icon}</span>
        <span>${language === "en" ? item.en : item.zh}</span>
      </button>
    `).join("");
  }

  function renderSoundBuilder(item) {
    const container = $("#soundBuilder");
    if (language === "en") {
      container.innerHTML = item.chunks.map((chunk, index) => `
        <span class="sound-part" data-part="${index}">
          <strong>${chunk}</strong>
          <span>${item.phonemes[index] || ""}</span>
        </span>
      `).join("");
      return;
    }
    const syllables = item.jyutping.split(" ");
    const characters = [...item.zh];
    container.innerHTML = syllables.map((syllable, index) => `
      <span class="sound-part">
        <strong>${characters[index] || ""}</strong>
        <span>${syllable}</span>
      </span>
    `).join("");
  }

  function renderWord() {
    const item = currentItem();
    const currentCategory = category();
    stopAudio();
    clearBuildTimers();
    wordCard.classList.remove("celebrate");
    $("#confetti").innerHTML = "";
    $("#categoryTitle").textContent = `${currentCategory.icon} ${language === "en" ? currentCategory.en : currentCategory.zh}`;
    wordElement.textContent = language === "en" ? item.en : item.zh;
    const length = [...wordElement.textContent].length;
    wordElement.className = `word${length > 15 ? " long" : length > 8 ? " medium" : ""}`;
    const pronunciation = $("#pronunciation");
    const pronunciationText = language === "en" ? item.ipa : "";
    pronunciation.textContent = pronunciationText;
    pronunciation.hidden = !pronunciationText;
    renderSoundBuilder(item);
    $("#teachingNote").innerHTML = language === "en"
      ? `<strong>拼讀方法：</strong>${item.enGuide}`
      : `<strong>讀音提示：</strong>${item.zhGuide}`;
    $("#meaning").innerHTML = `<strong>意思：</strong>${language === "en" ? item.enExplain : item.zhExplain}`;
    feedback.textContent = language === "en"
      ? "Listen, sound it out, then say the word."
      : "先聽一次，再大聲讀出生字。";
    feedback.className = "feedback";
    $("#score").textContent = `⭐ ${state.score}`;
    renderCategories();
  }

  function stopAudio() {
    if (!state.activeAudio) return;
    state.activeAudio.pause();
    state.activeAudio.currentTime = 0;
    state.activeAudio = null;
  }

  function audioPath(item) {
    return `assets/word-audio/${language}/${state.categoryId}-${item.id}.m4a`;
  }

  function fallbackSpeak(text, slow) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "en" ? "en-GB" : "zh-HK";
    utterance.rate = slow ? 0.62 : language === "en" ? 0.82 : 0.76;
    const voices = window.speechSynthesis.getVoices();
    const preferredNames = language === "en" ? /Daniel|Serena|Kate|Stephanie|Oliver|Arthur/i : /Sinji/i;
    utterance.voice = voices.find((voice) => preferredNames.test(voice.name) && voice.lang.toLowerCase() === (language === "en" ? "en-gb" : "yue-hk"))
      || voices.find((voice) => voice.lang.toLowerCase() === (language === "en" ? "en-gb" : "yue-hk"))
      || voices.find((voice) => language === "zh" && /zh-hk|yue/i.test(voice.lang));
    window.speechSynthesis.speak(utterance);
  }

  function playWord(slow = false) {
    const item = currentItem();
    stopAudio();
    const audio = new Audio(audioPath(item));
    audio.playbackRate = slow ? 0.72 : 1;
    state.activeAudio = audio;
    audio.addEventListener("error", () => fallbackSpeak(language === "en" ? item.en : item.zh, slow), { once: true });
    audio.play().catch(() => fallbackSpeak(language === "en" ? item.en : item.zh, slow));
  }

  function clearBuildTimers() {
    state.buildTimers.forEach((timer) => window.clearTimeout(timer));
    state.buildTimers = [];
    document.querySelectorAll(".sound-part").forEach((part) => part.classList.remove("active"));
  }

  function demonstrateBuild() {
    const item = currentItem();
    clearBuildTimers();
    const parts = [...document.querySelectorAll(".sound-part")];
    parts.forEach((part, index) => {
      state.buildTimers.push(window.setTimeout(() => {
        parts.forEach((candidate) => candidate.classList.remove("active"));
        part.classList.add("active");
      }, index * 620));
    });
    state.buildTimers.push(window.setTimeout(() => {
      parts.forEach((part) => part.classList.add("active"));
      playWord(true);
      feedback.textContent = `Blend the sounds smoothly: ${item.chunks.join(" · ")} → ${item.en}`;
    }, parts.length * 620));
    state.buildTimers.push(window.setTimeout(() => parts.forEach((part) => part.classList.remove("active")), parts.length * 620 + 1800));
  }

  function playReward() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContextClass();
      [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + index * .09;
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(.16, start + .025);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .28);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + .3);
      });
    } catch (_) {
      // Visual reward remains available when Web Audio is unavailable.
    }
  }

  function addConfetti() {
    const symbols = ["⭐", "🎉", "✨", "🌈", "💛"];
    $("#confetti").innerHTML = Array.from({ length: 28 }, (_, index) => (
      `<span class="confetti-piece" style="left:${(index * 37) % 96}%;animation-delay:${(index % 7) * .05}s">${symbols[index % symbols.length]}</span>`
    )).join("");
  }

  function celebrate() {
    const key = itemKey();
    if (state.celebratedKey !== key) {
      state.score += 1;
      state.celebratedKey = key;
      sessionStorage.setItem(`wordScore-${language}`, String(state.score));
      $("#score").textContent = `⭐ ${state.score}`;
    }
    feedback.textContent = language === "en" ? "Excellent reading! You did it!" : "讀得啱！好清楚，好叻呀！";
    feedback.className = "feedback good";
    wordCard.classList.remove("celebrate");
    void wordCard.offsetWidth;
    wordCard.classList.add("celebrate");
    addConfetti();
    playReward();
  }

  function normalize(text) {
    return text.toLocaleLowerCase(language === "en" ? "en-GB" : "zh-HK")
      .replace(/[\s.,!?，。！？'’\-]/g, "");
  }

  function trySpeechRecognition() {
    if (!SpeechRecognition) return;
    const item = currentItem();
    const recognition = new SpeechRecognition();
    recognition.lang = language === "en" ? "en-GB" : "zh-HK";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    micBtn.disabled = true;
    micBtn.textContent = language === "en" ? "🎧 Listening..." : "🎧 聽緊你讀…";
    feedback.textContent = language === "en" ? `Say “${item.en}” clearly.` : `請清楚讀出「${item.zh}」。`;
    recognition.onresult = (event) => {
      const heard = Array.from(event.results[0]).map((result) => result.transcript);
      const target = language === "en" ? item.en : item.zh;
      const accepted = [target, ...(item.alternatives || [])].map(normalize);
      if (heard.some((result) => accepted.includes(normalize(result)))) {
        celebrate();
      } else {
        feedback.textContent = language === "en"
          ? `I heard “${heard[0]}”. Listen once more and try again.`
          : `我聽到「${heard[0]}」。再聽一次標準讀音，然後慢慢讀。`;
        feedback.className = "feedback try";
      }
    };
    recognition.onerror = () => {
      feedback.textContent = language === "en"
        ? "The microphone could not check this time. You can use “I can read it”."
        : "今次未能用咪高峰檢查，可以按「我讀啱喇」自己記錄。";
      feedback.className = "feedback try";
    };
    recognition.onend = () => {
      micBtn.disabled = false;
      micBtn.textContent = language === "en" ? "🎤 Try saying it" : "🎤 用咪高峰試讀";
    };
    recognition.start();
  }

  function nextWord() {
    if (!state.order.length || state.currentIndex >= state.order.length - 1) {
      state.order = shuffle(categoryItems().length);
      state.currentIndex = 0;
    } else {
      state.currentIndex += 1;
    }
    renderWord();
  }

  categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.categoryId = button.dataset.category;
    state.order = [];
    state.currentIndex = -1;
    nextWord();
  });

  $("#listenBtn").addEventListener("click", () => playWord(false));
  $("#slowBtn").addEventListener("click", () => playWord(true));
  if (buildBtn) buildBtn.addEventListener("click", demonstrateBuild);
  micBtn.addEventListener("click", trySpeechRecognition);
  $("#knowBtn").addEventListener("click", celebrate);
  $("#nextBtn").addEventListener("click", nextWord);

  if (!SpeechRecognition) {
    micBtn.disabled = true;
    $("#supportNote").textContent = language === "en"
      ? "This browser cannot check speech automatically. Listen and use “I can read it” with an adult."
      : "此瀏覽器未能自動檢查讀音；可以聽完示範後，由家長陪同按「我讀啱喇」。";
  } else {
    $("#supportNote").textContent = language === "en"
      ? "Speech checking is a helpful practice tool; an adult should help with close pronunciations."
      : "語音辨識只作練習參考；讀音相近時，可由家長或老師協助判斷。";
  }

  nextWord();
})();
