import '../loader/loader.css';
// ===========================
const body = document.querySelector('body');
const main = document.querySelector('main');
const template = `<div class="loader-wrapper">
    <span class="loader"><span class="loader-inner"></span></span>
</div>`;
const cover = `<div class="loader-cover">
      <span class="test"></span>
    </div>`;
// ===========================
export function load() {
  body.style.overflow = 'hidden';
  main.insertAdjacentHTML('beforebegin', template);
  main.insertAdjacentHTML('beforebegin', cover);
  window.scrollTo({
    top: 10,
    behavior: 'smooth',
  });
}
// ===========================
export function ready() {
  const loader = document.querySelector('.loader-wrapper');
  const coverOff = document.querySelector('.loader-cover');
  loader.remove();
  coverOff.remove();
  body.style.overflow = 'unset';
}
