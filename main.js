// NEXORY — Glavni efekti i logika
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".nx-hero");
  const title = document.querySelector(".nx-title");
  const sub = document.querySelector(".nx-sub");
  const logoImg = document.querySelector(".nx-header-logo img");

  // 1) Fade-in + lagani puls teksta
  if (title && sub) {
    setTimeout(() => {
      title.style.opacity = "1";
      sub.style.opacity = "1";
      title.classList.add("nx-pulse");
    }, 350);
  }

  // 2) Lagani parallax hero-a
  if (hero) {
    document.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      hero.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // 3) “Disanje” logoa (diskretno)
  if (logoImg) {
    let scale = 1, dir = 1;
    setInterval(() => {
      scale += 0.002 * dir;
      if (scale >= 1.04 || scale <= 0.98) dir *= -1;
      logoImg.style.transform = `scale(${scale})`;
    }, 40);
  }

  // 4) Form "mission"
  const form = document.querySelector(".nx-action");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#nx-mission");
      const value = (input?.value || "").trim();
      if (value) {
        alert(`Misija "${value}" je pokrenuta.`);
        form.reset();
      }
    });
  }

  // 5) Scroll reveal za kartice
  const cards = document.querySelectorAll(".nx-card");
  if (cards.length) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("visible")),
      { threshold: 0.2 }
    );
    cards.forEach((c) => observer.observe(c));
  }

  // 6) Globalni energetski puls
  if (hero) {
    const pulse = document.createElement("div");
    pulse.classList.add("nx-pulse-field");
    hero.appendChild(pulse);

    let lock = false;
    setInterval(() => {
      if (lock) return;
      lock = true;
      pulse.classList.add("active");
      setTimeout(() => { pulse.classList.remove("active"); lock = false; }, 2000);
    }, 5000);
  }

  // 7) Subtle page transition feel
  const sections = document.querySelectorAll("header, section");
  window.addEventListener("scroll", () => {
    const vh = window.innerHeight;
    sections.forEach((s) => {
      const r = s.getBoundingClientRect();
      const distance = Math.abs(r.top);
      const opacity = 1 - distance / (vh * 0.7);
      s.style.opacity = String(Math.max(opacity, 0.2));
      s.style.filter = `blur(${Math.min(distance / 150, 8)}px)`;
      s.style.transition = "filter .4s ease, opacity .4s ease";
    });
  });

  // 8) Header micro state
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) document.body.classList.add("scrolled");
    else document.body.classList.remove("scrolled");
  });
});
