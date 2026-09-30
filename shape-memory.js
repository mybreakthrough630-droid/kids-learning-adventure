"use strict";
(() => {
  const shapes = [
    ['心形','#ed8da8','<path d="M50 84 16 49C-5 20 30 3 50 28 70 3 105 20 84 49Z"/>'],
    ['鑽石','#82cce9','<path d="M12 32 29 12H71L88 32 50 88Z"/><path d="M12 32H88M29 12 36 32 50 88 64 32 71 12M36 32 50 12 64 32" fill="none"/>'],
    ['圓形','#f2bf58','<circle cx="50" cy="50" r="34"/>'],
    ['正方形','#96d1ab','<rect x="19" y="19" width="62" height="62"/>'],
    ['長方形','#b8acf0','<rect x="9" y="28" width="82" height="44"/>'],
    ['菱形','#eca479','<path d="M50 8 80 50 50 92 20 50Z"/>'],
    ['三角形','#a4c4ee','<path d="M50 12 90 84H10Z"/>'],
    ['星形','#eed36f','<path d="m50 8 12 27 29 3-22 20 6 30-25-15-25 15 6-30L9 38l29-3Z"/>']
  ];
  const levels = [
    {count:3,times:[3000]}, {count:4,times:[2500]},
    {count:5,times:[1500,2000]}, {count:6,times:[750,1000,1500]},
    {count:8,times:[500,500,500,1000,1000,2000]}
  ];
  const $ = id => document.getElementById(id);
  const pick = array => array[Math.floor(Math.random()*array.length)];
  const svg = n => `<svg viewBox="0 0 100 100" aria-hidden="true" fill="${shapes[n][1]}" stroke="#284555" stroke-width="4" stroke-linejoin="round">${shapes[n][2]}</svg>`;
  let sequence=[], durations=[], answer=[], phase='idle', timer=null, position=0;
  let audioContext=null, soundOn=true;
  const soundButton=document.createElement('button');
  soundButton.type='button';soundButton.textContent='♫ 聲效：開';soundButton.setAttribute('aria-pressed','true');
  $('start').parentElement.append(soundButton);
  soundButton.onclick=()=>{soundOn=!soundOn;soundButton.textContent=`♫ 聲效：${soundOn?'開':'關'}`;soundButton.setAttribute('aria-pressed',String(soundOn));};
  async function celebrate(perfect){
    if(!soundOn)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return;
      audioContext=audioContext||new Audio();
      await audioContext.resume();
      if(!soundOn)return;
      const notes=perfect?[523.25,659.25,783.99,1046.5]:[523.25,659.25,783.99];
      notes.forEach((frequency,i)=>{
        const start=audioContext.currentTime+i*.15,osc=audioContext.createOscillator(),gain=audioContext.createGain();
        osc.type='sine';osc.frequency.value=frequency;
        gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.12,start+.02);gain.gain.exponentialRampToValueAtTime(.001,start+.36);
        osc.connect(gain);gain.connect(audioContext.destination);osc.start(start);osc.stop(start+.4);
        osc.onended=()=>{osc.disconnect();gain.disconnect();};
      });
    }catch(error){/* Sound is optional; visual feedback remains available. */}
  }
  function review(){
    $('track').innerHTML=sequence.map((expected,i)=>{
      const correct=answer[i]===expected;
      return `<div class="slot review-slot ${correct?'correct':'wrong'}"><div class="number">第 ${i+1} 個</div><div class="answer-label">你的答案</div><div class="tile ${correct?'correct':'wrong'}" aria-label="你的答案：${shapes[answer[i]][0]}">${svg(answer[i])}</div><div class="result-mark">${correct?'✓ 記啱！':'✗ 要再試'}</div>${correct?'':`<div class="correction">正確：${shapes[expected][0]}${svg(expected)}</div>`}</div>`;
    }).join('');
    $('track').scrollLeft=0;
  }
  function stop(){clearTimeout(timer);timer=null;}
  function description(){const config=levels[Number($('level').value)];$('description').textContent=`${config.count} 個形狀 · 每個停留 ${[...new Set(config.times)].map(t=>t/1000).join('／')} 秒${config.times.length>1?'（隨機）':''}`;}
  function draw(values, active=-1){
    $('track').innerHTML=values.map((n,i)=>`<div class="slot"><div class="number">第 ${i+1} 個</div><div class="tile ${i===active?'active':''}" aria-label="第 ${i+1} 個：${n===null?'空白':shapes[n][0]}">${n===null?'':svg(n)}</div></div>`).join('');
    if(active>=0){const slot=$('track').children[active];$('track').scrollLeft=Math.max(0,slot.offsetLeft-$('track').offsetLeft-20);}
  }
  function updateAnswer(){draw(sequence.map((_,i)=>answer[i]??null));$('check').disabled=answer.length!==sequence.length;$('undo').disabled=!answer.length;$('status').textContent=`輪到你！已填 ${answer.length} / ${sequence.length} 個`;}
  function beginRecall(){phase='recall';answer=[];$('track').scrollLeft=0;$('recall').hidden=false;updateAnswer();}
  function showNext(){
    if(position===sequence.length){beginRecall();return;}
    const shown=Array(sequence.length).fill(null);shown[position]=sequence[position];draw(shown,position);$('status').textContent=`仔細看：第 ${position+1} / ${sequence.length} 個`;
    timer=setTimeout(()=>{draw(Array(sequence.length).fill(null));position++;timer=setTimeout(showNext,250);},durations[position]);
  }
  function play(){stop();phase='observe';position=0;$('recall').hidden=true;$('feedback').hidden=true;$('replay').hidden=true;draw(Array(sequence.length).fill(null));$('track').scrollLeft=0;$('status').textContent='準備……由左至右記住次序！';timer=setTimeout(showNext,1000);}
  function next(){const config=levels[Number($('level').value)];const previous=sequence.join(',');do{sequence=Array.from({length:config.count},()=>Math.floor(Math.random()*shapes.length));}while(sequence.join(',')===previous);durations=sequence.map(()=>pick(config.times));play();}
  shapes.forEach((shape,n)=>{const button=document.createElement('button');button.type='button';button.innerHTML=svg(n)+shape[0];button.setAttribute('aria-label',shape[0]);button.onclick=()=>{if(phase!=='recall'||answer.length>=sequence.length)return;answer.push(n);updateAnswer();};$('palette').append(button);});
  $('undo').onclick=()=>{if(phase==='recall'){answer.pop();updateAnswer();}};
  $('check').onclick=()=>{if(phase!=='recall'||answer.length!==sequence.length)return;phase='result';const correct=answer.filter((n,i)=>n===sequence[i]).length;$('recall').hidden=true;$('status').textContent=correct===sequence.length?'全部記啱，好叻！':`答啱 ${correct} / ${sequence.length} 個`;$('feedback').hidden=false;$('feedback').textContent=`綠色 ✓ 是記啱的位置，橙色 ✗ 是需要再練習的位置；下方會列出正確圖形。${correct===sequence.length?'全部記啱，可以挑戰下一題！':'可以重看同一題再試。'}`;review();celebrate(correct===sequence.length);$('replay').hidden=false;};
  $('start').onclick=next;$('replay').onclick=play;
  $('level').onchange=()=>{stop();phase='idle';sequence=[];$('recall').hidden=true;$('feedback').hidden=true;$('replay').hidden=true;$('status').textContent='按「開始新題」挑戰新難度。';draw([]);description();};
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&phase==='observe'){stop();phase='paused';draw(Array(sequence.length).fill(null));$('status').textContent='播放已暫停，請重看同一題。';$('replay').hidden=false;}});
  window.addEventListener('pagehide',stop);description();
})();
