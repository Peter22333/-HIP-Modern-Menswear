// HIP — shared site behavior
document.addEventListener('DOMContentLoaded', () => {

  /* --- Nav scroll state --- */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if(!nav) return;
    if(window.scrollY > 40){ nav.classList.add('is-scrolled'); }
    else{ nav.classList.remove('is-scrolled'); }
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* --- Full screen nav overlay --- */
  const menuBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const overlay = document.querySelector('.nav-overlay');
  const openMenu = () => {
    overlay?.classList.add('is-open');
    document.body.classList.add('nav-lock');
    menuBtn?.setAttribute('aria-expanded','true');
    closeBtn?.focus();
  };
  const closeMenu = () => {
    overlay?.classList.remove('is-open');
    document.body.classList.remove('nav-lock');
    menuBtn?.setAttribute('aria-expanded','false');
    menuBtn?.focus();
  };
  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && overlay?.classList.contains('is-open')) closeMenu();
  });
  overlay?.querySelectorAll('a')?.forEach(a => a.addEventListener('click', closeMenu));

  /* --- Hero load-in --- */
  const hero = document.querySelector('.hero');
  if(hero){
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('is-loaded'), 60);
    });
  }

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.18 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* --- Subtle parallax on hero + editorial banner images --- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if(parallaxEls.length){
    const onParallax = () => {
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const offset = (rect.top) * speed;
        el.style.transform = `translateY(${offset}px) scale(1.06)`;
      });
    };
    window.addEventListener('scroll', onParallax, { passive:true });
    onParallax();
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(i => {
        if(i !== item){ i.classList.remove('is-open'); i.querySelector('.faq-q').setAttribute('aria-expanded','false'); }
      });
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* --- Product filters (suits page) --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });


  /* --- Contact form (submits to Formspree) --- */
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('.submit-btn');
    if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    try{
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(response.ok){
        if(status){ status.style.color = ''; status.textContent = 'Thank you — your message has been received. HIP will be in touch shortly.'; }
        form.reset();
      } else {
        if(status){ status.style.color = '#b23b3b'; status.textContent = 'Something went wrong — please email us directly at Hipmenswears@proton.me.'; }
      }
    } catch(err){
      if(status){ status.style.color = '#b23b3b'; status.textContent = 'Something went wrong — please email us directly at Hipmenswears@proton.me.'; }
    } finally {
      if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Send Message →'; }
    }
  });

});
