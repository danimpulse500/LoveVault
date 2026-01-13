document.addEventListener("DOMContentLoaded", () => {

  const correctPassword = "rose";
  const music = document.getElementById("music");

  // LOCK SCREEN
  window.unlock = () => {
    const pwd = document.getElementById("password").value;
    if(pwd===correctPassword){
      document.getElementById("lockScreen").style.display="none";
      document.getElementById("content").classList.remove("hidden");
      startHearts();
    }else alert("Wrong password");
  };

  // MUSIC
  window.toggleMusic = ()=> music.paused?music.play():music.pause();

  // DARK MODE
  window.toggleDark = ()=>document.body.classList.toggle("dark");

  // PETALS / HEARTS
  function startHearts(){
    setInterval(()=>{
      const p=document.createElement("div");
      p.className="petal";
      p.innerHTML=Math.random()>0.5?"❤️":"🌹";
      p.style.left=Math.random()*90+"vw";
      p.style.fontSize=12+Math.random()*16+"px";
      p.style.animationDuration=6+Math.random()*4+"s";
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),10000);
    },1200);
  }

  // CARD STACK
  const stack=document.getElementById('cardStack');
  const cards=Array.from(stack.querySelectorAll('img'));
  let spread=false, active=0;

  function updateStack(){
    const middle=Math.floor(cards.length/2);
    cards.forEach((card,i)=>{
      let offset=0;
      if(spread){
        offset=(i-middle)*120; // distance from center
      }
      card.style.transform=`translateX(${offset}px) scale(${i===active?1.05:0.9})`;
      card.style.zIndex=i===active?10:cards.length-i;
    });
  }

  cards[0].addEventListener('click',()=>{
    spread=!spread;
    updateStack();
  });

  // SWIPE
  let startX=0;
  stack.addEventListener('touchstart',e=>startX=e.touches[0].clientX);
  stack.addEventListener('touchend',e=>{
    if(!spread) return;
    let diff=e.changedTouches[0].clientX-startX;
    if(diff<-40) active=Math.min(active+1,cards.length-1);
    if(diff>40) active=Math.max(active-1,0);
    updateStack();
  });

  // ARROWS
  document.addEventListener('keydown',e=>{
    if(!spread) return;
    if(e.key==="ArrowRight") active=Math.min(active+1,cards.length-1);
    if(e.key==="ArrowLeft") active=Math.max(active-1,0);
    updateStack();
  });

});

const stack = document.getElementById('cardStack');
const cards = Array.from(stack.querySelectorAll('img'));
let spread = false;
let active = Math.floor(cards.length / 2); // center card

function updateStack() {
  const middle = active;
  const spacing = 120; // pixels between cards
  cards.forEach((card, i) => {
    const offset = (i - middle) * spacing; // left/right evenly
    card.style.setProperty('--offset', `${offset}px`);
    card.style.setProperty('--scale', i === active ? 1.05 : 0.9);
    card.classList.toggle('active', i === active);
    card.style.zIndex = i === active ? 10 : cards.length - Math.abs(i - middle);
  });
}

// first click spreads stack
cards[0].addEventListener('click', () => {
  spread = !spread;
  stack.classList.toggle('spread', spread);
  updateStack();
});

// swipe detection
let startX = 0;
stack.addEventListener('touchstart', e => startX = e.touches[0].clientX);
stack.addEventListener('touchend', e => {
  if(!spread) return;
  const diff = e.changedTouches[0].clientX - startX;
  if(diff < -40) active = Math.min(active + 1, cards.length -1);
  if(diff > 40) active = Math.max(active - 1, 0);
  updateStack();
});

// arrow keys
document.addEventListener('keydown', e => {
  if(!spread) return;
  if(e.key === "ArrowRight") active = Math.min(active + 1, cards.length -1);
  if(e.key === "ArrowLeft") active = Math.max(active - 1, 0);
  updateStack();
});
