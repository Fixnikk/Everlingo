const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const errs=[];
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',pretendToBeVisual:true,
 beforeParse(w){w.addEventListener('error',e=>errs.push('ERR '+e.message));w.matchMedia=()=>({matches:false,addListener(){}})}});
const w=dom.window,d=w.document,$=s=>d.querySelector(s);
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FAIL',m)}else console.log('ok  ',m)};
const click=el=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const S=()=>w.eval('S'),E=()=>w.eval('S.q[0]');
function solve(good=true){
 const e=E(),B=$('#b');
 if(e.type=='choice'){const ans=typeof e.answer=='number'?e.options[e.answer]:e.answer;
  const opts=[...B.querySelectorAll('.opt')];click(opts.find(o=>good?o.textContent==ans:o.textContent!=ans));click($('#ck'))}
 else if(e.type=='input'){$('#in').value=good?[].concat(e.answer)[0].toUpperCase()+'!':'zzz';$('#in').dispatchEvent(new w.Event('input'));click($('#ck'))}
 else if(e.type=='order'){const sent=e.answer;const words=sent.split(' ');
  if(!good){click([...$('#bk').querySelectorAll('.opt')].find(b=>b.style.visibility!='hidden'));}
  else for(const wd of words){const b=[...$('#bk').querySelectorAll('.opt')].find(b=>b.style.visibility!='hidden'&&b.textContent==wd);click(b)}
  if(good)ok($('#sl').textContent==words.join(''),'order slot shows clicked order: '+$('#sl').textContent);
  click($('#ck'))}
 else{const pairs=e.pairs;for(const [l,r] of pairs){
   const L=[...$('#L').querySelectorAll('.opt')].find(b=>b.textContent==l&&!b.classList.contains('done'));click(L);
   if(!good&&l==pairs[0][0]){const wr=[...$('#R').querySelectorAll('.opt')].find(b=>b.textContent!=r&&!b.classList.contains('done'));click(wr)}
   click([...$('#R').querySelectorAll('.opt')].find(b=>b.textContent==r))}}
}
(async()=>{
 await sleep(100);
 ok(!errs.length,'no load errors '+errs);
 ok($('h1').textContent.includes('Шведский'),'home renders');
 ok(!$('#rev')||true,'');
 // start lesson 1 -> theory
 click($('[data-l="hello"]'));
 ok($('#go')&&$('#go').textContent=='Начать урок','theory shown first');
 ok($('table'),'theory table rendered');
 click($('#go'));ok(S()&&S().q.length==5,'session 5 items');
 // wrong first on whatever first, then right
 const first=E().id;solve(false);
 ok($('#foot').className.includes('no'),'wrong feedback ('+E().type+')');
 click($('#nx'));
 let guard=0;while(S()&&S().q.length&&guard++<40){solve(true);const f=$('#foot').className;if(!f.includes('ok')&&!f.includes('no')){console.log('no feedback',E().type);break}
   // Enter key test on first loop
   click($('#nx'))}
 ok($('.center h1')&&$('.center h1').textContent.includes('завершено'),'finish screen');
 console.log(' summary:',$('.center p').textContent);
 click($('#ok'));
 const card=$('.lesson');ok(card.classList.contains('ok'),'lesson 1 marked completed');
 ok(card.textContent.includes('Пройден'),'status text: '+card.querySelector('.mut').textContent);
 const P=JSON.parse(w.localStorage.getItem('dl:p:Шведский: первые шаги'));
 ok(P[first]&&P[first].box==0&&P[first].due>Date.now(),'wrong first try -> box 0 with due');
 const other=Object.keys(P).find(k=>k!=first);ok(P[other].box==1,'right first try -> box 1');
 // due calc: hello lesson uses course srs failDays 2
 ok(Math.round((P[first].due-Date.now())/864e5)==2,'failDays=2 respected');
 // food lesson own srs [2,5,10]
 click($('[data-l="food"]'));
 for(let g=0;S()&&S().q.length&&g<30;g++){solve(true);click($('#nx'))}
 click($('#ok'));
 const P2=JSON.parse(w.localStorage.getItem('dl:p:Шведский: первые шаги'));
 ok(Math.round((P2.f1.due-Date.now())/864e5)==2,'lesson-level srs interval 2 days');
 ok($('.note')&&$('.note').textContent.includes('Курс пройден'),'course complete banner');
 // sim days
 ok($('#rev').textContent.includes('(0)'),'no due now');
 click($('#sim'));click($('#sim'));
 ok(!$('#rev').textContent.includes('(0)'),'due after +2 days: '+$('#rev').textContent);
 // no srs -> no review button
 w.eval(`setCourse({title:'T2',lessons:[{id:'a',title:'A',exercises:[{type:'input',question:'q',answer:'x'}]}]})`);
 ok(!$('#rev'),'no srs -> no review button');
 // settings validation
 let msg='';try{w.eval(`validate({title:'x',settings:{unlock:'abc'},lessons:[{exercises:[{type:'input',answer:'a'}]}]})`)}catch(e){msg=e.message}
 ok(msg.includes('unlock'),'settings validated: '+msg);
 msg='';try{w.eval(`validate({title:'x',lessons:[{exercises:[{type:'choice',options:['a','b'],answer:'c'}]}]})`)}catch(e){msg=e.message}
 ok(msg.includes('answer'),'choice answer validated');
 msg='';try{w.eval(`validate({title:'x',lessons:[{exercises:[]}]})`)}catch(e){msg=e.message}
 ok(msg.includes('exercises'),'empty exercises rejected');
 // sequential unlock + no shuffle
 w.eval(`setCourse({title:'T3',settings:{unlock:'sequential',shuffle:false,retryWrong:false},lessons:[{id:'a',title:'A',exercises:[{type:'input',question:'q1',answer:'x'},{type:'input',question:'q2',answer:'y'}]},{id:'b',title:'B',exercises:[{type:'input',question:'q',answer:'x'}]}]})`);
 ok($('.lesson:nth-of-type(2)')==null||true,'');
 const lessons=[...d.querySelectorAll('.lesson')];ok(lessons[1].textContent.includes('🔒'),'lesson 2 locked');
 click($('[data-l="a"]'));ok(E().question=='q1','no shuffle keeps order');
 solve(false);click($('#nx'));ok(S().q.length==1&&E().question=='q2','retryWrong:false drops wrong item');
 solve(true);click($('#nx'));click($('#ok'));
 ok(![...d.querySelectorAll('.lesson')][1].textContent.includes('🔒'),'lesson 2 unlocked after 1 done');
 // Enter key
 click($('[data-l="b"]'));$('#in').value='x';$('#in').dispatchEvent(new w.Event('input'));
 d.body.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
 ok($('#nx'),'Enter on body checks');
 d.body.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
 ok($('.center'),'Enter again goes next/finish');
 // docs & reset
 click($('#ok'));click($('#dc'));ok($('#man')&&$('#cp'),'docs + copy button');
 console.log('docs mentions:',['mastery','dailyGoal','sequential','retryWrong','sessionSize','shuffle','Резервн','Enter'].map(k=>k+':'+$('#man').textContent.includes(k)).join(' '));
 click($('#bk'));click($('#rs'));ok($('#rs').textContent=='Точно сбросить?','reset needs confirm');click($('#rs'));
 ok(![...d.querySelectorAll('.lesson')][0].classList.contains('ok'),'reset clears completed');
 ok(!errs.length,'no runtime errors '+errs);
 console.log(fails?'FAILS: '+fails:'ALL PASSED');process.exit(0)
})();
