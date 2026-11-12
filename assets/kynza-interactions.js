(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.kynza-cursor')) return;

  const cursor = document.createElement('div');
  cursor.className = 'kynza-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);
  document.body.classList.add('kynza-cursor-ready');

  let pointerX = -100;
  let pointerY = -100;
  let visible = false;

  function move(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.style.transform = 'translate3d(' + pointerX + 'px,' + pointerY + 'px,0) translate(-50%,-50%) scale(1)';
    if (!visible) {
      visible = true;
      cursor.classList.add('is-visible');
    }
  }

  function updateTarget(event) {
    const target = event.target instanceof Element ? event.target : null;
    const product = target && target.closest(
      '.product-card, .kynza-ritual-card, .kynza-routine__card, a[href*="/products/"]'
    );
    const interactive = target && target.closest(
      'a, button, [role="button"], input, select, textarea, summary, label'
    );
    cursor.classList.toggle('is-product', Boolean(product));
    cursor.classList.toggle('is-interactive', Boolean(interactive) && !product);
  }

  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerover', updateTarget, { passive: true });
  document.addEventListener('pointerout', function (event) {
    if (!event.relatedTarget) cursor.classList.remove('is-visible', 'is-product', 'is-interactive');
  }, { passive: true });
  window.addEventListener('blur', function () {
    cursor.classList.remove('is-visible', 'is-product', 'is-interactive');
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) cursor.classList.remove('is-visible');
  });
})();