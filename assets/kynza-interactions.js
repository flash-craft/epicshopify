(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.kynza-cursor')) return;
  const cursor = document.createElement('div');
  cursor.className = 'kynza-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);
  document.body.classList.add('kynza-cursor-ready');

  document.addEventListener('pointermove', function (event) {
    cursor.style.transform = 'translate3d(' + event.clientX + 'px,' + event.clientY + 'px,0) translate(-50%,-50%)';
    cursor.classList.add('is-visible');
  }, { passive: true });

  document.addEventListener('pointerover', function (event) {
    const target = event.target instanceof Element ? event.target : null;
    const product = target && target.closest('.product-card, a[href*="/products/"]');
    const interactive = target && target.closest('a, button, [role="button"], input, select, textarea, summary, label');
    cursor.classList.toggle('is-product', Boolean(product));
    cursor.classList.toggle('is-interactive', Boolean(interactive) && !product);
  }, { passive: true });

  document.addEventListener('pointerout', function (event) {
    if (!event.relatedTarget) cursor.classList.remove('is-visible', 'is-product', 'is-interactive');
  }, { passive: true });
  window.addEventListener('blur', function () {
    cursor.classList.remove('is-visible', 'is-product', 'is-interactive');
  });
})();