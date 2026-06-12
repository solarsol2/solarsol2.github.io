/* main.js — portfolio interactions */

// ── Nav: scroll state ──
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Nav: mobile toggle ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('menu-open');
  });
});

// ── Chart animations (IntersectionObserver) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // Vertical bar chart
      if (el.classList.contains('vbar-chart')) {
        el.classList.add('animated');
        observer.unobserve(el);
        return;
      }

      // Horizontal bar chart
      if (el.classList.contains('hbar-chart')) {
        el.classList.add('animated');
        observer.unobserve(el);
        return;
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.vbar-chart, .hbar-chart').forEach(el => {
  observer.observe(el);
});

// ── Smooth anchor scroll with nav offset ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 60; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Lightbox ──
const overlay = document.createElement('div');
overlay.className = 'lightbox-overlay';
overlay.innerHTML = '<button class="lightbox-close" aria-label="닫기">✕</button><img alt="" />';
document.body.appendChild(overlay);

const lbImg   = overlay.querySelector('img');
const lbClose = overlay.querySelector('.lightbox-close');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

// 클릭 대상: 프로토타입 스크린 + 패널 이미지 + 씨네픽 이미지
document.querySelectorAll('.screen-frame img, .panel-img, .cinepick-img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

// 닫기: 버튼 or 오버레이 배경 클릭
lbClose.addEventListener('click', closeLightbox);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeLightbox();
});

// 닫기: ESC 키
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
