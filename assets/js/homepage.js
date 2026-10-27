const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

const figureViewer = document.querySelector('.figure-viewer');
const figureClose = figureViewer.querySelector('.figure-viewer-close');
let figureTrigger;

document.querySelectorAll('.paper-box-image').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    figureTrigger = link;
    const image = new Image();
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    figureViewer.append(image);
    figureViewer.showModal();
    document.documentElement.classList.add('figure-viewer-open');
  });
});
figureClose.addEventListener('click', () => figureViewer.close());
figureViewer.addEventListener('click', (event) => {
  if (event.target === figureViewer) figureViewer.close();
});
figureViewer.addEventListener('close', () => {
  figureViewer.querySelector('img')?.remove();
  document.documentElement.classList.remove('figure-viewer-open');
  figureTrigger?.focus({ preventScroll: true });
});

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  menuToggle.title = 'Open navigation';
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.title = open ? 'Close navigation' : 'Open navigation';
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.masthead')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigation.querySelectorAll('a').forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
}
