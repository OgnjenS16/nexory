// === NEXORY — app.js ===
// Subtle 3D tilt: hero + title
(function(){
  const hero = document.querySelector('.nx-hero');
  const title = document.querySelector('.nx-title');
  if(!hero || !title) return;

  let rafId = null;
  const strength = 8; // degrees, malo suptilnije

  function handle(e){
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;  // 0..1
    const y = (e.clientY - r.top) / r.height;  // 0..1
    const rx = (y - 0.5) * -strength;
    const ry = (x - 0.5) * strength;

    hero.style.transform += ` rotateX(${rx}deg) rotateY(${ry}deg)`;
    title.style.transform = `translateZ(40px)`;
  }
  function reset(){
    hero.style.transform = 'translate(0, 0)';
    title.style.transform = 'none';
  }

  hero.addEventListener('mousemove', (e)=>{
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(()=> handle(e));
  });
  hero.addEventListener('mouseleave', ()=>{
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(reset);
  });
})();

// Gentle entry for any CTA + socials (fallback)
(function(){
  const cta = document.querySelector('.nx-btn');
  const socials = document.querySelectorAll('.nx-social-icons a');
  if(cta){
    cta.style.opacity = 0;
    cta.style.transform = 'translateY(10px)';
    requestAnimationFrame(()=>{
      setTimeout(()=>{
        cta.style.transition = 'all .6s ease';
        cta.style.opacity = 1;
        cta.style.transform = 'translateY(0)';
      }, 250);
    });
  }
  socials.forEach((el, i)=>{
    el.style.opacity = 0; el.style.transform += ' translateY(10px)';
    setTimeout(()=>{
      el.style.transition = 'all .5s ease';
      el.style.opacity = 1;
      el.style.transform = el.style.transform.replace(' translateY(10px)','');
    }, 350 + i*90);
  });
})();
