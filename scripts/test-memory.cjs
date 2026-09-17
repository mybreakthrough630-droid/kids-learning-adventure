const assert=require('node:assert/strict');
const core=require('../memory-core.js');
let tested=0;
for(const game of ['cars','animals','dolls','gems','classic']){
 for(const level of ['easy','medium','hard']){
  const signatures=new Set();
  for(let i=0;i<200;i++){
   const p=core.generate(game,level,['cat','fish','apple','sun','moon']);
   assert.equal(p.seconds,level==='hard'?45:30);
   assert.equal(p.size,game==='classic'?12:core.levels[level].size);
   assert.equal(p.target.length,p.size);
   if(game!=='classic')assert.equal(p.target.filter(Boolean).length,core.levels[level].targets);
   if(game==='gems')for(const k of ['star','diamond','heart'])assert(p.target.includes(k));
   assert.equal(core.score(p.target,p.target).correct,p.size);
   const blank=Array(p.size).fill(game==='classic'||game==='gems'?null:false);
   assert.equal(core.score(p.target,blank).hits,0);
   assert.equal(core.score(p.target,blank).missed,p.target.filter(Boolean).length);
   signatures.add(JSON.stringify(p.target));tested++;
  }
  assert(signatures.size>10,game+level+' lacks randomness');
 }
}
assert.deepEqual(core.score([true,false,true],[false,true,true]),{hits:1,missed:1,extra:1,correct:1,total:3,targets:2});
assert.deepEqual(core.score(['star',null,'heart'],['diamond','star','heart']),{hits:1,missed:1,extra:2,correct:1,total:3,targets:2});
console.log(`PASS: ${tested} random rounds; sizes, targets, timing, all shapes and scoring.`);
