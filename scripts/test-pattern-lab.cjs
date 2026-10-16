const assert=require('node:assert/strict'),M=require('../pattern-lab-model.js');
let questions=0;
for(let level=1;level<=5;level++)for(const family of M.pools[level-1])for(let n=0;n<100;n++){
 const p=M.pattern(level,family);questions++;assert.equal(p.type,family);assert.equal(p.options.length,4);assert.equal(new Set(p.options.map(M.key)).size,4);assert.equal(p.options.filter(v=>M.key(v)===M.key(p.answer)).length,1);assert.deepEqual(p.answer,p.steps[p.hole]);assert.ok(p.steps.length>=5);assert.ok(p.hole>=1);
 const s=p.steps;
 if(family==='count'){const delta=s[1].count-s[0].count;for(let i=1;i<s.length;i++)assert.equal(s[i].count-s[i-1].count,delta);assert.ok(s.every(v=>v.count>=1&&v.count<=10));}
 if(family==='rotate'||family==='dual'){const delta=(s[1].dir-s[0].dir+4)%4;for(let i=1;i<s.length;i++){assert.equal((s[i].dir-s[i-1].dir+4)%4,delta);if(family==='dual')assert.equal(s[i].count,s[i-1].count+1);}}
 if(family==='repeat'){const cycle=level===1?2:3;for(let i=cycle;i<s.length;i++)assert.deepEqual(s[i],s[i-cycle]);}
 if(family==='group'){for(let i=3;i<s.length;i++)assert.deepEqual(s[i],s[i-3]);assert.equal(s[0].kind,s[1].kind);assert.notEqual(s[1].kind,s[2].kind);}
 if(family==='move'){const d=(s[1].position-s[0].position+4)%4;for(let i=1;i<s.length;i++)assert.equal((s[i].position-s[i-1].position+4)%4,d);}
 if(family==='grid'){for(let i=1;i<s.length;i++){const map=level===5&&(i-1)%2?[1,0,3,2]:[3,0,1,2];assert.deepEqual(s[i].cells,map.map(j=>s[i-1].cells[j]));}}
}
let symmetry=0;
for(let level=1;level<=5;level++)for(const axis of ['vertical','horizontal'])for(let n=0;n<100;n++){
 const p=M.symmetry(level,axis);symmetry++;assert.ok(p.source.some(Boolean));assert.equal(new Set(p.options.map(M.key)).size,p.options.length);assert.equal(p.options.filter(v=>M.key(v)===M.key(p.answer)).length,1);assert.equal(p.targets.length,p.rows*p.cols/2);
 for(let r=0;r<p.rows;r++)for(let c=0;c<p.cols;c++){
  const i=r*p.cols+c;if(p.targets.includes(i)){assert.equal(p.source[i],null);continue;}
  const rr=axis==='horizontal'?p.rows-1-r:r,cc=axis==='vertical'?p.cols-1-c:c;
  assert.deepEqual(p.answer[rr*p.cols+cc],M.mirrorToken(p.source[i],axis));
 }
}
for(const axis of ['vertical','horizontal'])for(let dir=0;dir<4;dir++)assert.deepEqual(M.mirrorToken(M.mirrorToken({kind:'arrow',dir},axis),axis),{kind:'arrow',dir});
assert.deepEqual(M.mirrorToken({kind:'arrow',dir:1},'vertical'),{kind:'arrow',dir:3});assert.deepEqual(M.mirrorToken({kind:'arrow',dir:0},'horizontal'),{kind:'arrow',dir:2});
console.log(`PASS ${questions} random pattern questions, all seven families, unique correct choices and independent rule checks; ${symmetry} symmetry grids, both axes, exact mirror mapping including arrow orientation.`);
