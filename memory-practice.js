"use strict";
(() => {
  const $=id=>document.getElementById(id);
  const symbols=[
    {key:'star',glyph:'★',name:'星星'}, {key:'diamond',glyph:'◆',name:'鑽石'},
    {key:'heart',glyph:'♥',name:'心心'}, {key:'circle',glyph:'●',name:'圓形'},
    {key:'triangle',glyph:'▲',name:'三角形'}, {key:'square',glyph:'■',name:'正方形'}
  ];
  const config={warmup:{pairs:2,seconds:9},middle:{pairs:4,seconds:13},full:{pairs:6,seconds:18}};
  const shuffle=items=>{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
  let puzzle=null,phase='idle',timer=null,deadline=0,chosen=[],sequenceStep=0;
  const stop=()=>{clearInterval(timer);timer=null;};
  const cellName=i=>`第 ${Math.floor(i/4)+1} 行第 ${i%4+1} 格`;
  function makePuzzle(){
    const cfg=config[$('level').value];
    const selected=shuffle(symbols).slice(0,cfg.pairs);
    const values=shuffle([...selected,...selected,...Array(12-cfg.pairs*2).fill(null)]);
    const target=selected[Math.floor(Math.random()*selected.length)];
    const targetIndices=values.map((v,i)=>v?.key===target.key?i:null).filter(Number.isInteger);
    const active=values.map((v,i)=>v?i:null).filter(Number.isInteger);
    const length=$('level').value==='warmup'?2:$('level').value==='middle'?3:4;
    const sequence=shuffle(active).slice(0,length);
    return {cfg,values,target,targetIndices,sequence};
  }
  function icon(value){return value?`<span class="symbol ${value.key}" aria-hidden="true">${value.glyph}</span>`:'<span class="symbol">·</span>';}
  function render(id,showValues,interactive=false,feedback=false){
    const holder=$(id);holder.replaceChildren();
    puzzle.values.forEach((value,i)=>{
      const button=document.createElement('button');button.type='button';button.className=`cell ${showValues&&!value?'blank':''}`;button.disabled=!interactive;
      button.dataset.index=i;button.setAttribute('aria-label',cellName(i)+(showValues&&value?`：${value.name}`:'：未顯示'));
      button.innerHTML=showValues?icon(value):'<span class="symbol">?</span>';
      button.insertAdjacentHTML('beforeend',`<span class="position">${Math.floor(i/4)+1}-${i%4+1}</span>`);
      if(phase==='observe'&&$('mode').value==='sequence'&&puzzle.sequence.includes(i)){
        button.classList.add('observe-order');button.dataset.order=puzzle.sequence.indexOf(i)+1;
      }
      if(phase==='recall'&&$('mode').value==='location'&&chosen.includes(i))button.classList.add('selected');
      if(phase==='recall'&&$('mode').value==='sequence'&&chosen.includes(i)){button.classList.add('sequence-picked');button.dataset.step=chosen.indexOf(i)+1;}
      if(feedback){
        const expected=$('mode').value==='location'?puzzle.targetIndices.includes(i):puzzle.sequence.includes(i);
        const actual=chosen.includes(i);button.classList.add(expected===actual?'correct':'wrong');
        if(showValues&&expected)button.classList.add('selected');
      }
      button.addEventListener('click',()=>choose(i));holder.append(button);
    });
  }
  function observe(){
    stop();phase='observe';chosen=[];sequenceStep=0;$('review').hidden=true;$('route').hidden=false;$('recall').hidden=false;$('check').hidden=true;$('retry').hidden=true;
    $('heading').textContent='先用固定路線看一遍';
    $('instruction').textContent=$('mode').value==='location'?`找一找：兩個「${puzzle.target.name}」在哪裏？先講行數，再講格數。`:`跟住紫色數字 1 → ${puzzle.sequence.length}，記住要點哪幾格。`;
    render('grid',true);deadline=Date.now()+puzzle.cfg.seconds*1000;
    const tick=()=>{const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('timer').textContent=`${left} 秒`;if(!left)recall();};tick();timer=setInterval(tick,200);
  }
  function recall(){
    if(phase!=='observe')return;stop();phase='recall';$('timer').textContent='';$('route').hidden=true;$('recall').hidden=true;$('check').hidden=$('mode').value==='sequence';
    $('heading').textContent='輪到你作答';
    $('instruction').textContent=$('mode').value==='location'?`請點選兩個「${puzzle.target.name}」的位置。`:`請依次序點選第 1 格、第 2 格……現在輪到第 ${sequenceStep+1} 個。`;
    render('grid',false,true);
  }
  function choose(index){
    if(phase!=='recall')return;
    if($('mode').value==='location'){
      const found=chosen.indexOf(index);if(found>=0)chosen.splice(found,1);else if(chosen.length<2)chosen.push(index);
      $('check').hidden=chosen.length!==2;render('grid',false,true);
    }else{
      if(sequenceStep===puzzle.sequence.length)return;
      if(chosen.includes(index))return;
      const expected=puzzle.sequence[sequenceStep];
      if(index!==expected){$('instruction').textContent=`再想一想：由左至右、由上至下。現在找第 ${sequenceStep+1} 個。`;return;}
      chosen.push(index);sequenceStep++;
      if(sequenceStep===puzzle.sequence.length){$('instruction').textContent='完成次序！現在核對答案。';$('check').hidden=false;}else $('instruction').textContent=`做得好！現在找第 ${sequenceStep+1} 個。`;
      render('grid',false,true);
    }
  }
  function check(){
    if(phase!=='recall')return;phase='result';$('check').hidden=true;$('retry').hidden=false;$('review').hidden=false;
    const expected=$('mode').value==='location'?puzzle.targetIndices:puzzle.sequence;
    const exact=chosen.length===expected.length&&chosen.every((v,i)=>$('mode').value==='sequence'?v===expected[i]:expected.includes(v));
    $('heading').textContent=exact?'太好了，你記住了！':'一起看原圖，再試一次。';
    $('feedback').textContent=exact?'你有用固定路線來記位置。下次可以挑戰更多圖形。':`答案是：${expected.map(cellName).join('、')}。先說行數和格數，再按「再試同一題」。`;
    render('grid',false,false,true);render('solution',true,false,true);
  }
  function next(){puzzle=makePuzzle();observe();}
  $('new').addEventListener('click',next);$('mode').addEventListener('change',next);$('level').addEventListener('change',next);$('recall').addEventListener('click',recall);$('check').addEventListener('click',check);$('retry').addEventListener('click',observe);window.addEventListener('pagehide',stop);
})();
