"use strict";
(() => {
  const drawings = {
    cat:['貓','<path d="M22 40 20 16 40 30M60 30 80 16 78 40" fill="#efa648"/><circle cx="50" cy="55" r="32" fill="#efa648"/><path d="M20 55h20m20 0h20M25 65l15-5m20 0 15 5"/><circle cx="39" cy="48" r="2"/><circle cx="61" cy="48" r="2"/><path d="m46 57 4 5 4-5z"/>'],
    fish:['魚','<ellipse cx="43" cy="50" rx="30" ry="23" fill="#71c6df"/><path d="m70 50 22-22v44z" fill="#71c6df"/><circle cx="28" cy="45" r="3"/>'],
    carrot:['紅蘿蔔','<path d="m30 30 40 0-20 60z" fill="#f0a145"/><path d="m50 30-13-20m13 20 12-20M38 45h17m-12 14h12"/>'],
    apple:['蘋果','<path d="M50 28C18 10 10 50 25 72Q37 88 50 80Q66 90 80 65C98 26 70 15 50 28Z" fill="#ed6b70"/><path d="m50 28 4-17"/><path d="M55 21Q62 4 79 12Q72 29 55 21" fill="#71ac69"/>'],
    sun:['太陽','<circle cx="50" cy="50" r="24" fill="#f9d063"/><path d="M50 6v12m0 64v12M6 50h12m64 0h12M19 19l9 9m44 44 9 9M19 81l9-9m44-44 9-9"/>'],
    moon:['月亮','<path d="M68 12A39 39 0 1 0 83 75A37 37 0 0 1 68 12Z" fill="#f9d063"/>'],
    house:['屋','<path d="M24 44h52v43H24z" fill="#f9d063"/><path d="m14 44 36-31 36 31z" fill="#ed6b70"/><path d="M43 87V60h16v27" fill="#8dc8e1"/>'],
    boat:['帆船','<path d="M12 66h76L74 87H27z" fill="#71c6df"/><path d="M48 65V10l31 46H48" fill="#f9d063"/>'],
    balloon:['氣球','<ellipse cx="50" cy="35" rx="25" ry="29" fill="#e99abf"/><path d="m50 64-4 8h8zM50 72q-13 10 0 22"/>'],
    icecream:['雪糕','<path d="m28 47 44 0-22 47z" fill="#e7b775"/><circle cx="50" cy="33" r="25" fill="#e99abf"/>']
  };
  const names={cars:'車車出發',animals:'動物派對',dolls:'公仔朋友',food:'美食記憶',transport:'交通出發',gems:'寶石記憶',classic:'圖案放回原位'};
  const questions={cars:'哪些車原本有司機？',animals:'哪些動物原本戴帽子？',dolls:'哪些公仔原本抱着小熊？',food:'哪些食物原本插着小旗？',transport:'哪些交通工具原本有乘客？',gems:'星星、鑽石、心心原本在哪一格？',classic:'把圖案放回原位。'};
  const labels={star:'星星',diamond:'鑽石',heart:'心心'};
  const $=id=>document.getElementById(id);
  const svg=k=>`<svg viewBox="0 0 100 100" aria-hidden="true" fill="#27364a" stroke="#27364a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${drawings[k][1]}</svg>`;
  let puzzle=null,answer=[],selected=null,phase='idle',timer=null,deadline=0,round=0,lastSignature='';
  const placement=()=>puzzle.game==='gems'||puzzle.game==='classic';
  const label=k=>labels[k]||drawings[k]?.[0]||'空白';
  const art=(value,i)=>puzzle.game==='classic'?(value?svg(value):''):puzzle.game==='gems'?(value?MemoryArt.shape(value):''):MemoryArt.picture(puzzle.game,puzzle.cells[i],value);
  function stop(){clearInterval(timer);timer=null;}
  function renderGrid(id,values,editable=false,feedback=false){
    $(id).replaceChildren();$(id).style.gridTemplateColumns=`repeat(${puzzle.columns},minmax(0,1fr))`;
    values.forEach((value,i)=>{
      const b=document.createElement('button');b.type='button';b.className='cell';b.disabled=!editable;
      const position=`第 ${i+1} 格`;
      const shown=editable&&!placement()?false:value;
      b.setAttribute('aria-label',`${position}：${placement()?label(value):editable?(value?'已選':'未選'):(value?'有目標':'沒有目標')}`);
      b.innerHTML=art(shown,i)+`<span class="cell-number">${i+1}</span>`;
      if(editable&&!placement()){b.setAttribute('aria-pressed',String(value));b.classList.toggle('picked',value);}
      if(feedback){const ok=value===puzzle.target[i];b.classList.add(ok?'correct':'wrong');const mark=document.createElement('span');mark.className='mark';mark.textContent=ok?'✓':'×';b.append(mark);}
      b.addEventListener('click',()=>{
        if(phase!=='recall')return;answer[i]=placement()?selected:!answer[i];
        if(placement())b.innerHTML=art(answer[i],i)+`<span class="cell-number">${i+1}</span>`;
        else {b.setAttribute('aria-pressed',String(answer[i]));b.classList.toggle('picked',answer[i]);}
        b.setAttribute('aria-label',`${position}：${placement()?label(answer[i]):answer[i]?'已選':'未選'}`);
      });
      $(id).append(b);
    });
  }
  function palette(){
    $('palette').replaceChildren();
    [...puzzle.types,null].forEach(k=>{const b=document.createElement('button');b.type='button';b.innerHTML=(k?(puzzle.game==='gems'?MemoryArt.shape(k):svg(k)):'⌫')+(k?label(k):'擦膠');b.setAttribute('aria-pressed',String(k===selected));b.addEventListener('click',()=>{selected=k;palette();});$('palette').append(b);});
  }
  function recall(){
    if(phase!=='observe')return;stop();phase='recall';answer=Array(puzzle.size).fill(placement()?null:false);selected=puzzle.types[0]||null;
    $('timer').textContent='';$('heading').textContent=`第 ${round} 題 · 輪到你了`;
    $('instruction').textContent=placement()?'先揀圖案，再點格子放入；用擦膠清空。記得保留原本的空白格！':questions[puzzle.game]+' 點選原本有目標的格子，再點一下可以取消。';
    $('recall').hidden=true;$('palette').hidden=!placement();$('check').hidden=false;if(placement())palette();renderGrid('grid',answer,true);
  }
  function observe(){
    stop();phase='observe';$('review').hidden=true;$('solution').replaceChildren();$('palette').hidden=true;$('check').hidden=true;$('retry').hidden=true;$('recall').hidden=false;
    $('heading').textContent=`${names[puzzle.game]} · 第 ${round} 題`;$('instruction').textContent=questions[puzzle.game]+(placement()?' 記住圖案與空白格的位置。':' 記住目標的位置；作答時目標會消失。');
    $('difficulty-note').textContent=`${puzzle.size} 格 · 記住 ${puzzle.target.filter(Boolean).length} 個目標 · ${puzzle.seconds} 秒`;
    renderGrid('grid',puzzle.target);deadline=Date.now()+puzzle.seconds*1000;
    const tick=()=>{const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('timer').textContent=`${seconds} 秒`;if(!seconds)recall();};tick();timer=setInterval(tick,200);
  }
  function next(){
    let signature;do{puzzle=MemoryCore.generate($('game').value,$('level').value,Object.keys(drawings));signature=JSON.stringify([puzzle.game,puzzle.target]);}while(signature===lastSignature);
    lastSignature=signature;round++;observe();
  }
  $('new').addEventListener('click',next);$('level').addEventListener('change',next);$('recall').addEventListener('click',recall);$('retry').addEventListener('click',observe);
  $('game').addEventListener('change',()=>{round=0;next();});
  $('check').addEventListener('click',()=>{
    if(phase!=='recall')return;phase='result';const result=MemoryCore.score(puzzle.target,answer);
    $('heading').textContent=result.correct===puzzle.size?'太棒了！全部記住！':`記對 ${result.hits} / ${result.targets} 個目標`;
    $('instruction').textContent=`記對 ${result.hits} 個；漏記或放錯 ${result.missed} 個；多選或錯放 ${result.extra} 個。一起看看原圖，再試一次。`;
    $('palette').hidden=true;$('check').hidden=true;$('retry').hidden=false;$('review').hidden=false;
    renderGrid('grid',answer,false,true);renderGrid('solution',puzzle.target);
  });
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',event=>{if(event.persisted&&phase==='observe')observe();});
})();
