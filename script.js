/* Sacred Flow Chiropractic & Wellness — Site Script */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Sticky header shadow on scroll ----- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----- Smooth anchor scroll with offset for fixed header ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ----- Intersection Observer: fade-in on scroll ----- */
  const fadeEls = document.querySelectorAll(
    '.service-card, .testimonial-card, .faq-item, .about-image-wrap, .about-text, .contact-info-card'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${(i % 3) * 0.1}s, transform 0.55s ease ${(i % 3) * 0.1}s`;
    observer.observe(el);
  });

  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .visible { opacity: 1 !important; transform: translateY(0) !important; }
      .site-header.scrolled { box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
    </style>
  `);

  /* ----- Simple contact form handler (placeholder) ----- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.style.background = '#2d7a7a';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send My Info';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

});
