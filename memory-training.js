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
  const config={easy:{counts:[3,1],seconds:30},medium:{counts:[3,2],seconds:25},hard:{counts:[3,2,2],seconds:25}};
  const $=id=>document.getElementById(id);
  const svg=k=>`<svg viewBox="0 0 100 100" aria-hidden="true" fill="#27364a" stroke="#27364a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${drawings[k][1]}</svg>`;
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  let target=Array(12).fill(null),answer=Array(12).fill(null),types=[],selected=null,phase='idle',timer=null,deadline=0,round=0,lastSignature='';
  function stop(){clearInterval(timer);timer=null;}
  function renderGrid(id,values,editable=false,feedback=false){
    $(id).replaceChildren();
    values.forEach((value,i)=>{
      const b=document.createElement('button');b.type='button';b.className='cell';b.disabled=!editable;
      const position=`第 ${Math.floor(i/4)+1} 行第 ${i%4+1} 格`;
      b.setAttribute('aria-label',`${position}：${value?drawings[value][0]:'空白'}`);
      if(value)b.innerHTML=svg(value);
      if(feedback){const ok=value===target[i];b.classList.add(ok?'correct':'wrong');const mark=document.createElement('span');mark.className='mark';mark.textContent=ok?'✓':'×';b.append(mark);}
      b.addEventListener('click',()=>{if(phase!=='recall')return;answer[i]=selected;b.innerHTML=selected?svg(selected):'';b.setAttribute('aria-label',`${position}：${selected?drawings[selected][0]:'空白'}`);});
      $(id).append(b);
    });
  }
  function palette(){
    $('palette').replaceChildren();
    [...types,null].forEach(k=>{const b=document.createElement('button');b.type='button';b.innerHTML=(k?svg(k):'⌫')+(k?drawings[k][0]:'擦膠');b.setAttribute('aria-pressed',String(k===selected));b.addEventListener('click',()=>{selected=k;palette();});$('palette').append(b);});
  }
  function recall(){
    if(phase!=='observe')return;stop();phase='recall';answer=Array(12).fill(null);selected=types[0];
    $('timer').textContent='';$('heading').textContent=`第 ${round} 題 · 輪到你了`;
    $('instruction').textContent='先揀圖案，再點格子放入；用擦膠清空。記得保留原本的空白格！';
    $('recall').hidden=true;$('palette').hidden=false;$('check').hidden=false;palette();renderGrid('grid',answer,true);
  }
  function observe(){
    stop();phase='observe';$('review').hidden=true;$('solution').replaceChildren();$('palette').hidden=true;$('check').hidden=true;$('retry').hidden=true;$('recall').hidden=false;
    $('heading').textContent=`第 ${round} 題 · 記住位置`;$('instruction').textContent=`記住 ${types.length} 種物品的位置，也留意哪些格是空白。`;
    renderGrid('grid',target);deadline=Date.now()+config[$('level').value].seconds*1000;
    const tick=()=>{const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('timer').textContent=`${seconds} 秒`;if(!seconds)recall();};tick();timer=setInterval(tick,200);
  }
  function next(){
    const level=$('level').value,counts=[...config[level].counts];
    if(level!=='easy'&&Math.random()<.5)counts[1]++;
    do{types=shuffle(Object.keys(drawings)).slice(0,counts.length);target=shuffle([...types.flatMap((k,i)=>Array(counts[i]).fill(k)),...Array(12-counts.reduce((a,b)=>a+b,0)).fill(null)]);}while(JSON.stringify(target)===lastSignature);
    lastSignature=JSON.stringify(target);round++;observe();
  }
  $('new').addEventListener('click',next);$('level').addEventListener('change',next);$('recall').addEventListener('click',recall);$('retry').addEventListener('click',observe);
  $('check').addEventListener('click',()=>{
    if(phase!=='recall')return;phase='result';const correct=answer.filter((v,i)=>v===target[i]).length;
    $('heading').textContent=correct===12?'太棒了！全部記住！':`答對 ${correct} / 12 格`;
    $('instruction').textContent=correct===12?'圖案和空白格全部正確！可以開始新題。':'一起看看原圖，再試一次。空白格也計分。';
    $('palette').hidden=true;$('check').hidden=true;$('retry').hidden=false;$('review').hidden=false;
    renderGrid('grid',answer,false,true);renderGrid('solution',target);
  });
  window.addEventListener('pagehide',stop);renderGrid('grid',answer);
})();
