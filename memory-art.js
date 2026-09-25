(function(){
  'use strict';
  const colors=['#58a8bf','#e3a047','#d27584','#83ad72','#8b85bf','#db8c58','#58a895','#789cca','#c07ab0','#adb954','#cb7670','#739b9c'];
  const wrap=body=>`<svg viewBox="0 0 120 105" aria-hidden="true" focusable="false" stroke="#263e50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const face=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#f6d1ad"/><circle cx="${x-r*.3}" cy="${y-1}" r="1.3" fill="#263e50" stroke="none"/><circle cx="${x+r*.3}" cy="${y-1}" r="1.3" fill="#263e50" stroke="none"/><path d="M${x-3} ${y+4}q3 3 6 0" fill="none"/>`;
  function shape(key){
    const body={
      star:'<path d="m60 9 13 28 32 4-23 22 6 32-28-15-28 15 6-32-23-22 32-4z" fill="#eab34d"/>',
      diamond:'<path d="m14 39 23-25h46l23 25-46 57z" fill="#457eac"/><path d="M14 39h92M37 14l11 25 12 57 12-57 11-25" stroke="white" fill="none"/>',
      heart:'<path d="M60 94 19 53C-6 18 37-5 60 26 83-5 126 18 101 53Z" fill="#cd5356"/>'
    };return wrap(body[key]||'');
  }
  function picture(game,cell,active){
    const color=colors[cell.color],style=cell.style;
    if(game==='cars')return wrap(`<path d="M9 76V53l18-5 17-25h40l17 27 12 4v22z" fill="${color}"/><path d="m36 48 12-19h32l13 19z" fill="#e8f4f7"/><path d="M60 29v19"/><circle cx="31" cy="77" r="12" fill="#263e50"/><circle cx="90" cy="77" r="12" fill="#263e50"/><circle cx="31" cy="77" r="5" fill="white"/><circle cx="90" cy="77" r="5" fill="white"/>${style%2?'<rect x="51" y="16" width="22" height="7" rx="2" fill="#eab34d"/>':''}${active?`${face(76,38,10)}<path d="m83 47 8 5"/><circle cx="94" cy="53" r="5" fill="none"/>`:''}`);
    if(game==='animals'){
      const ears=style%4===0?'<ellipse cx="41" cy="28" rx="9" ry="23"/><ellipse cx="79" cy="28" rx="9" ry="23"/>':style%4===1?'<path d="M30 45 22 12 51 37M69 37l29-25-8 33"/>':style%4===2?'<circle cx="29" cy="34" r="14"/><circle cx="91" cy="34" r="14"/>':'<ellipse cx="27" cy="51" rx="13" ry="24"/><ellipse cx="93" cy="51" rx="13" ry="24"/>';
      return wrap(`<g fill="${color}">${ears}<ellipse cx="60" cy="63" rx="35" ry="31"/></g><circle cx="47" cy="59" r="3"/><circle cx="73" cy="59" r="3"/><path d="m56 70 4 4 4-4M60 74q-5 10-12 3m12-3q5 10 12 3" fill="none"/>${active?'<path d="m35 32 25-28 25 28z" fill="#cf535b"/><path d="M32 33h56" stroke="#cf535b" stroke-width="7"/><circle cx="60" cy="6" r="5" fill="#eab34d"/>':''}`);
    }
    if(game==='food'){
      const food=style%4;
      const body=[
        `<path d="M22 40h76L82 78H37z" fill="#e7b775"/><path d="M28 39h64l-8-18H36z" fill="#e4aa4c"/><path d="M31 47h57" stroke="#79a95e" stroke-width="8"/><path d="M36 58h48" stroke="#d95850" stroke-width="9"/>`,
        `<path d="M20 41h80v32H20z" fill="#e7b775"/><path d="M24 40q4-31 36-31t36 31" fill="#e3a047"/><path d="M25 59h70" stroke="#cf535b" stroke-width="8"/>`,
        `<path d="M39 28h42l-7 63H46z" fill="${color}"/><path d="M41 27h38" stroke="#e8f4f7" stroke-width="5"/><path d="M50 9h20v18H50z" fill="#f6d1ad"/>`,
        `<path d="m30 47 30-33 30 33-30 45z" fill="#d99b52"/><circle cx="60" cy="38" r="23" fill="#f5d06d"/><circle cx="51" cy="34" r="3" fill="#cf535b" stroke="none"/><circle cx="68" cy="42" r="3" fill="#cf535b" stroke="none"/>`
      ][food];
      return wrap(`${body}${active?'<path d="M58 10v25" stroke="#cf535b" stroke-width="4"/><path d="m60 10 22 8-22 8z" fill="#cf535b"/>':''}`);
    }
    if(game==='transport'){
      const vehicle=style%4;
      const body=[
        `<path d="M10 72V48l19-6 16-20h36l17 25 12 5v20z" fill="${color}"/><path d="m39 45 11-17h25l13 17z" fill="#e8f4f7"/><circle cx="31" cy="74" r="11" fill="#263e50"/><circle cx="90" cy="74" r="11" fill="#263e50"/>`,
        `<path d="M12 61h31l28-41 12 4-13 31 33 7-3 12-39-4-18 19-10-3 8-20-29 6z" fill="${color}"/><path d="m53 48 19-20" stroke="#e8f4f7" stroke-width="8"/>`,
        `<path d="M14 70h91l-17 17H31z" fill="${color}"/><path d="M41 69V26l38 43z" fill="#f4d06a"/><path d="M31 87h58" stroke="#58a8bf" stroke-width="6"/>`,
        `<path d="M10 72h100l-14 17H24z" fill="${color}"/><path d="M25 71 46 35h34l15 36z" fill="#e8f4f7"/><path d="M52 35v36m18-36v36"/>`
      ][vehicle];
      return wrap(`${body}${active?`${face(66,52,9)}<path d="m73 60 10 6"/><circle cx="87" cy="68" r="4" fill="#eab34d"/>`:''}`);
    }
    return wrap(`${style%2?'<circle cx="32" cy="25" r="12" fill="#69514a"/><circle cx="88" cy="25" r="12" fill="#69514a"/>':''}<circle cx="60" cy="31" r="25" fill="#69514a"/>${face(60,36,21)}<path d="m43 60-13 34h60L77 60z" fill="${color}"/><path d="m43 65-20 17m54-17 20 17" stroke="#e7ba94" stroke-width="8"/><path d="M46 96v6m28-6v6" stroke-width="7"/>${active?'<g fill="#bf9469"><circle cx="48" cy="68" r="6"/><circle cx="72" cy="68" r="6"/><ellipse cx="60" cy="88" rx="14" ry="12"/><circle cx="60" cy="77" r="14"/></g><circle cx="55" cy="75" r="1.5"/><circle cx="65" cy="75" r="1.5"/><circle cx="60" cy="81" r="2"/>':''}`);
  }
  function token(game,key){
    const styles={food:{burger:1,cheese:3,soda:2},transport:{car:0,plane:1,boat:2}};
    return picture(game,{style:styles[game]?.[key]??0,color:styles[game]?.[key]??0},false);
  }
  window.MemoryArt={picture,shape,token};
})();
