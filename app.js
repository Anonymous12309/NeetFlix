import { videos } from './videos.js';
const rowMap = {
  trending: document.getElementById('row-trending'),
  satire: document.getElementById('row-satire'),
  docs: document.getElementById('row-docs'),
};
const heroPlayer = document.getElementById('hero-player');
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');
function createCard(video) {
  const card = document.createElement('article');
  card.className =
    'video-card group cursor-pointer bg-neet-panel rounded-xl overflow-hidden ring-1 ring-slate-800 hover:ring-neet-violet';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Play ${video.title}`);
  card.innerHTML = `
    <div class="thumb relative aspect-video bg-slate-800 overflow-hidden">
      <img src="${video.thumbnail}" alt="${escapeHtml(
    video.title
  )}" loading="lazy"
           class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <div class="w-12 h-12 rounded-full bg-neet-violet flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
    </div>
    <div class="p-3">
      <h4 class="font-semibold text-sm sm:text-base text-white line-clamp-2">${escapeHtml(
        video.title
      )}</h4>
      <p class="text-xs text-slate-400 mt-1 line-clamp-2">${escapeHtml(
        video.description
      )}</p>
    </div>
  `;
  const activate = () => playInHero(video);
  card.addEventListener('click', activate);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  });
  return card;
}
function playInHero(video) {
  heroPlayer.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
  heroTitle.textContent = video.title;
  heroDesc.textContent = video.description;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderRow(category) {
  const row = rowMap[category];
  if (!row) return;
  const items = videos.filter((v) => v.category === category);
  row.replaceChildren(...items.map(createCard));
}
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
function init() {
  Object.keys(rowMap).forEach(renderRow);
}
document.addEventListener('DOMContentLoaded', init);
