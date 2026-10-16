(function(root){
'use strict';
const rnd=n=>Math.floor(Math.random()*n),pick=a=>a[rnd(a.length)];
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
const kinds=['circle','star','triangle','square','heart'];
const names={circle:'圓形',star:'星星',triangle:'三角形',square:'正方形',heart:'心形',arrow:'箭嘴'};
const directions=['向上','向右','向下','向左'];
const families={repeat:'重複排列',group:'分組規律',count:'數量增減',rotate:'方向旋轉',move:'位置移動',grid:'四格變化',dual:'雙重規律'};
const pools=[['repeat'],['repeat','group','count'],['count','rotate','move'],['rotate','move','grid'],['dual','grid']];
const key=v=>JSON.stringify(v);
function pattern(level,family='mixed'){
 level=Math.max(1,Math.min(5,Number(level)||1));
 const type=pools[level-1].includes(family)?family:pick(pools[level-1]);
 const a=shuffle(kinds),length=level===1?6:5,steps=[];let explain;
 if(type==='repeat'||type==='group'){
  const cycle=type==='group'?[a[0],a[0],a[1]]:a.slice(0,level===1?2:3);
  for(let i=0;i<length;i++)steps.push({kind:cycle[i%cycle.length],count:1,dir:0});
  explain=`每 ${cycle.length} 個係一組：${cycle.map(k=>names[k]).join('、')}，然後由頭重複。`;
 }else if(type==='count'){
  const delta=pick([1,2])*(level>=3&&rnd(2)?-1:1),start=delta<0?1+4*Math.abs(delta):1;
  for(let i=0;i<length;i++)steps.push({kind:a[0],count:start+i*delta,dir:0});
  explain=`數量依次係 ${steps.map(v=>v.count).join('、')}；每次${delta>0?'增加':'減少'} ${Math.abs(delta)} 個。`;
 }else if(type==='rotate'||type==='dual'){
  const start=rnd(4),turn=type==='dual'?1:pick([1,3]);
  for(let i=0;i<length;i++)steps.push({kind:'arrow',dir:(start+i*turn)%4,count:type==='dual'?i+1:1});
  explain=`箭嘴每次${turn===1?'順':'逆'}時針轉九十度${type==='dual'?'，同時數量每次增加一個':''}。`;
 }else if(type==='move'){
  const start=rnd(4),jump=pick([1,3]);
  for(let i=0;i<length;i++)steps.push({kind:a[0],count:1,dir:0,position:(start+i*jump)%4});
  explain=`圖案喺四格內，每次${jump===1?'順':'逆'}時針移一格。順序係左上、右上、右下、左下。`;
 }else{
  const maps=[[3,0,1,2],[1,0,3,2]],initial=shuffle(a.slice(0,4));let cells=initial;
  for(let i=0;i<length;i++){steps.push({cells:[...cells]});cells=(level===5?maps[i%2]:maps[0]).map(j=>cells[j]);}
  explain=level===5?'兩種變化輪流做：順時針移一格、左右交換，再重複。':'四個圖案每次都順時針移一格。';
 }
 const hole=level>=4&&rnd(2)?1+rnd(length-2):length-1,answer=steps[hole],options=[answer];
 for(let attempts=0;options.length<4&&attempts<100;attempts++){
  let v={...answer};
  if(v.cells)v.cells=shuffle(v.cells);
  else if(type==='count')v.count=1+rnd(10);
  else if(type==='move')v.position=rnd(4);
  else if(type==='dual'){v.count=1+rnd(6);v.dir=rnd(4);}
  else if(type==='rotate')v.dir=rnd(4);
  else v.kind=pick(kinds);
  if(!options.some(o=>key(o)===key(v)))options.push(v);
 }
 return {level,type,steps,hole,answer,options:shuffle(options),explain};
}
function mirrorToken(t,axis){if(!t)return null;return t.kind==='arrow'?{kind:t.kind,dir:axis==='vertical'?(4-t.dir)%4:(2-t.dir+4)%4}:{...t};}
function symmetry(level,axis='vertical'){
 level=Math.max(1,Math.min(5,Number(level)||1));if(axis==='mixed')axis=pick(['vertical','horizontal']);
 const size=[2,3,3,4,5][level-1],rows=axis==='vertical'?size:size*2,cols=axis==='vertical'?size*2:size;
 const source=Array(rows*cols).fill(null),answer=Array(rows*cols).fill(null),targets=[];
 const palette=level>=5?[{kind:'arrow',dir:0},{kind:'arrow',dir:1},{kind:'arrow',dir:2},{kind:'arrow',dir:3},{kind:'circle',dir:0}]:level>=4?['circle','triangle','star'].map(kind=>({kind,dir:0})):[{kind:'star',dir:0}];
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const fixed=axis==='vertical'?c<size:r<size;if(!fixed){targets.push(r*cols+c);continue;}
  if(Math.random()<.55){const t={...pick(palette)};source[r*cols+c]=t;const rr=axis==='horizontal'?rows-1-r:r,cc=axis==='vertical'?cols-1-c:c;answer[rr*cols+cc]=mirrorToken(t,axis);}
 }
 if(!source.some(Boolean)){source[0]={...palette[0]};answer[(axis==='vertical'?cols-1:(rows-1)*cols)]=mirrorToken(source[0],axis);}
 const options=[answer];
 while(options.length<(level===1?2:4)){
  const v=answer.map(t=>t&&({...t}));const index=pick(targets);v[index]=v[index]?null:{...pick(palette)};
  if(!options.some(o=>key(o)===key(v)))options.push(v);
 }
 return {level,axis,rows,cols,source,answer,targets,palette,options:shuffle(options)};
}
const api={pattern,symmetry,mirrorToken,shuffle,key,names,directions,families,pools};
if(typeof module==='object'&&module.exports)module.exports=api;else root.PatternLab=api;
})(typeof window==='object'?window:this);
