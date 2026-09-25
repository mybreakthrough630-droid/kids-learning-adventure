/* Pure game rules, shared by the page and automated tests. */
(function(root){
  'use strict';
  const levels={easy:{size:6,targets:3,columns:3,seconds:30},medium:{size:9,targets:4,columns:3,seconds:30},hard:{size:12,targets:6,columns:4,seconds:45}};
  const shuffle=(items,rng=Math.random)=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  function generate(game,level,classicKeys=[],rng=Math.random){
    const cfg=levels[level];if(!cfg)throw Error('Unknown level');
    const size=game==='classic'?12:cfg.size;
    const cells=shuffle(Array.from({length:size},(_,i)=>({style:i%8,color:i%12})),rng);
    let types=[],target;
    if(game==='classic'){
      const counts=level==='easy'?[3,1]:level==='medium'?[3,2+Math.floor(rng()*2)]:[3,2+Math.floor(rng()*2),2];
      types=shuffle(classicKeys,rng).slice(0,counts.length);
      target=shuffle([...types.flatMap((k,i)=>Array(counts[i]).fill(k)),...Array(12-counts.reduce((a,b)=>a+b,0)).fill(null)],rng);
    }else if(['gems','food','transport'].includes(game)){
      const themeTypes={
        gems:['star','diamond','heart'],
        food:['burger','cheese','soda'],
        transport:['car','plane','boat']
      };
      types=themeTypes[game];
      const shapes=shuffle(types,rng);
      target=shuffle([...Array.from({length:cfg.targets},(_,i)=>shapes[i%3]),...Array(size-cfg.targets).fill(null)],rng);
    }else{
      if(!['cars','animals','dolls'].includes(game))throw Error('Unknown game');
      target=shuffle([...Array(cfg.targets).fill(true),...Array(size-cfg.targets).fill(false)],rng);
    }
    return {game,level,size,columns:game==='classic'?4:cfg.columns,seconds:cfg.seconds,cells,types,target};
  }
  function score(target,answer){
    let hits=0,missed=0,extra=0,correct=0;
    target.forEach((t,i)=>{const a=answer[i];if(t===a)correct++;if(t){if(t===a)hits++;else missed++;}if(a&&a!==t)extra++;});
    return {hits,missed,extra,correct,total:target.length,targets:target.filter(Boolean).length};
  }
  const api={levels,shuffle,generate,score};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MemoryCore=api;
})(typeof window!=='undefined'?window:this);
