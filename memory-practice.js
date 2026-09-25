"use strict";
(() => {
  const $=id=>document.getElementById(id);
  const sets={gems:[{key:'star',glyph:'★',name:'星星'},{key:'diamond',glyph:'◆',name:'鑽石'},{key:'heart',glyph:'♥',name:'心心'}],shapes:[{key:'circle',glyph:'●',name:'圓形'},{key:'triangle',glyph:'▲',name:'三角形'},{key:'square',glyph:'■',name:'正方形'}]};
  const config={warmup:{count:2,seconds:9},middle:{count:4,seconds:13},full:{count:6,seconds:18}};
  const shuffle=items=>{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
  let puzzle=null,answer=[],selected=null,phase='idle',timer=null,deadline=0;
  const stop=()=>{clearInterval(timer);timer=null;};
  const cellName=i=>`第 ${Math.floor(i/4)+1} 行第 ${i%4+1} 格`;
  const icon=value=>value?`<span class="symbol ${value.key}" aria-hidden="true">${value.glyph}</span>`:'<span class="symbol">·</span>';
  function makePuzzle(){const cfg=config[$('level').value],types=sets[$('mode').value],items=shuffle(Array.from({length:cfg.count},(_,i)=>types[i%types.length]));return {cfg,types,target:shuffle([...items,...Array(12-cfg.count).fill(null)])};}
  function palette(){
    $('palette').replaceChildren();[...puzzle.types,null].forEach(value=>{const b=document.createElement('button');b.type='button';b.innerHTML=value?`${icon(value)}<span>${value.name}</span>`:'⌫<span>擦膠</span>';b.setAttribute('aria-pressed',String(value===selected));b.addEventListener('click',()=>{selected=value;palette();});$('palette').append(b);});
  }
  function render(id,values,editable=false,feedback=false){
    const holder=$(id);holder.replaceChildren();values.forEach((value,i)=>{const b=document.createElement('button');b.type='button';b.className='cell';b.disabled=!editable;b.setAttribute('aria-label',`${cellName(i)}：${value?value.name:'空白'}`);b.innerHTML=icon(value);b.insertAdjacentHTML('beforeend',`<span class="position">${Math.floor(i/4)+1}-${i%4+1}</span>`);if(feedback){const ok=value===puzzle.target[i];b.classList.add(ok?'correct':'wrong');if(!ok){const mark=document.createElement('span');mark.className='mark';mark.textContent='×';b.append(mark);}}b.addEventListener('click',()=>{if(phase!=='recall')return;answer[i]=selected;render('grid',answer,true);});holder.append(b);});
  }
  function observe(){stop();phase='observe';answer=Array(12).fill(null);$('review').hidden=true;$('route').hidden=false;$('palette').hidden=true;$('recall').hidden=false;$('check').hidden=true;$('retry').hidden=true;$('heading').textContent='先用固定路線看一遍';$('instruction').textContent=`記住 ${puzzle.cfg.count} 個圖形和空白格的位置。先講行數，再講格數。`;render('grid',puzzle.target);deadline=Date.now()+puzzle.cfg.seconds*1000;const tick=()=>{const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('timer').textContent=`${left} 秒`;if(!left)recall();};tick();timer=setInterval(tick,200);}
  function recall(){if(phase!=='observe')return;stop();phase='recall';selected=puzzle.types[0];$('timer').textContent='';$('route').hidden=true;$('recall').hidden=true;$('palette').hidden=false;$('check').hidden=false;$('heading').textContent='輪到你作答';$('instruction').textContent='先揀圖案，再點格子放入；如要改答案，揀「擦膠」再點該格。';palette();render('grid',answer,true);}
  function check(){if(phase!=='recall')return;phase='result';const exact=answer.every((v,i)=>v===puzzle.target[i]);$('palette').hidden=true;$('check').hidden=true;$('retry').hidden=false;$('review').hidden=false;$('heading').textContent=exact?'太好了，你記住了！':'一起看原圖，再試一次。';$('feedback').textContent=exact?'你有用固定路線來記位置。下次可以挑戰更多圖形。':'先找出放錯的格，再說一次「第幾行、第幾格」。答案在下面。';render('grid',answer,false,true);render('solution',puzzle.target,false,true);}
  function next(){puzzle=makePuzzle();observe();}
  $('new').addEventListener('click',next);$('mode').addEventListener('change',next);$('level').addEventListener('change',next);$('recall').addEventListener('click',recall);$('check').addEventListener('click',check);$('retry').addEventListener('click',observe);window.addEventListener('pagehide',stop);
})();
