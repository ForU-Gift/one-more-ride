const audio = document.querySelector('#soundtrack');
const musicButton = document.querySelector('#music');
const musicLabel = document.querySelector('#music-label');
const status = document.querySelector('#audio-status');
audio.volume = 0.45;
let toastTimer;
function syncMusic() {
  const playing = !audio.paused;
  musicButton.classList.toggle('playing', playing);
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', playing ? 'Выключить музыку' : 'Включить музыку');
  musicLabel.textContent = playing ? 'TONI · играет' : 'со звуком';
}
async function playMusic() {
  try { await audio.play(); }
  catch { status.textContent = 'Музыка пока не включилась. Нажми «со звуком», чтобы попробовать ещё раз.'; status.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => status.classList.remove('visible'), 6500); }
  syncMusic();
}
musicButton.addEventListener('click', () => audio.paused ? playMusic() : audio.pause());
audio.addEventListener('play', syncMusic);
audio.addEventListener('pause', syncMusic);
document.querySelector('#open-story').addEventListener('click', () => {
  if (audio.paused) playMusic();
  document.querySelector('#story').focus({ preventScroll: true });
  document.querySelector('#story').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});
const weather = document.querySelector('#weather');
const sunButton = document.querySelector('#sun-button');
sunButton.addEventListener('click', () => {
  const sunny = weather.classList.toggle('sunny');
  document.querySelector('#weather-line').textContent = sunny ? 'А дальше — солнце.' : 'Дождь начинается.';
  document.querySelector('.weather-icon').textContent = sunny ? '☀' : '☂';
  document.querySelector('#weather-copy').textContent = sunny ? 'Вот так гораздо лучше. Осталось повторить вживую: ты, я и открытая крыша.' : 'Пару раз проверили. Работает безотказно. Но поездку с открытой крышей мы явно недополучили.';
  document.querySelector('#weather-foot').textContent = sunny ? 'с погодой договорились. теперь бы с тобой :)' : 'кажется, это повод для ещё одной встречи';
  sunButton.innerHTML = sunny ? 'Ещё раз вспомнить дождь <span aria-hidden="true">↺</span>' : 'Попробуем ещё раз? <span aria-hidden="true">↗</span>';
});
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
