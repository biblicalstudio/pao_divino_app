/**
 * PÃO DIVINO - PWA Application Core
 * Gerenciamento de receitas, filtros, modo cozinha, timer de forno e suporte PWA offline.
 */

// Estado Global da Aplicação
const appState = {
  activeCategory: 'todos',
  searchQuery: '',
  favorites: JSON.parse(localStorage.getItem('pao_divino_favs') || '[]'),
  currentRecipe: null,
  recipeServingsMultiplier: 1.0,
  baseServings: 1,
  checkedIngredients: new Set(),
  wakeLock: null,
  timer: {
    intervalId: null,
    totalSeconds: 0,
    remainingSeconds: 0,
    label: '',
    isRunning: false
  },
  deferredPrompt: null
};

// ==========================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initPwaInstall();
  initCategories();
  initSearch();
  initDevotionals();
  initIngredientsGuide();
  initBottomNav();
  renderRecipes();

  // Escuta tecla ESC para fechar modais
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRecipeModal();
      closeTimerModal();
    }
  });
});

// ==========================================================================
// SERVICE WORKER & PWA INSTALL ENGINE
// ==========================================================================
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registrado com sucesso:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Falha ao registrar Service Worker:', err);
        });
    });
  }
}

function initPwaInstall() {
  const installBanner = document.getElementById('pwaInstallBanner');
  const installBtn = document.getElementById('btnInstallPwa');
  const closeBannerBtn = document.getElementById('btnCloseBanner');

  // Detecta se já está rodando em modo standalone (PWA instalado)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone && installBanner) {
    installBanner.classList.add('hidden');
    return;
  }

  // Captura o evento nativo no Android / Chrome / Edge
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    appState.deferredPrompt = e;
    if (installBanner) {
      installBanner.classList.remove('hidden');
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (appState.deferredPrompt) {
        appState.deferredPrompt.prompt();
        const { outcome } = await appState.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('Aplicativo Pão Divino instalado com sucesso!');
        }
        appState.deferredPrompt = null;
        if (installBanner) installBanner.classList.add('hidden');
      } else {
        // Instrução para iOS Safari
        showToast('No iPhone: Toque no botão Compartilhar e selecione "Adicionar à Tela de Início"');
      }
    });
  }

  if (closeBannerBtn && installBanner) {
    closeBannerBtn.addEventListener('click', () => {
      installBanner.classList.add('hidden');
    });
  }
}

// ==========================================================================
// RENDERIZAÇÃO DO FEED DE RECEITAS
// ==========================================================================
function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  const counter = document.getElementById('recipesCounter');
  if (!grid) return;

  const filtered = RECIPES_DATA.filter((recipe) => {
    // Filtro por Categoria
    if (appState.activeCategory === 'favoritos') {
      if (!appState.favorites.includes(recipe.id)) return false;
    } else if (appState.activeCategory !== 'todos') {
      if (recipe.category !== appState.activeCategory) return false;
    }

    // Filtro por Busca de Texto
    if (appState.searchQuery.trim() !== '') {
      const q = appState.searchQuery.toLowerCase();
      const inTitle = recipe.title.toLowerCase().includes(q);
      const inSub = (recipe.subtitle || '').toLowerCase().includes(q);
      const inVerse = (recipe.verse || '').toLowerCase().includes(q) || (recipe.verseText || '').toLowerCase().includes(q);
      const inIngredients = recipe.ingredients.some(ing => ing.name.toLowerCase().includes(q));
      const inTags = recipe.tags.some(t => t.toLowerCase().includes(q));
      return inTitle || inSub || inVerse || inIngredients || inTags;
    }

    return true;
  });

  if (counter) {
    counter.textContent = `${filtered.length} ${filtered.length === 1 ? 'receita' : 'receitas'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem;">
        <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">🌾</span>
        <h3 style="font-size: 1.3rem; color: var(--gold-300); margin-bottom: 0.5rem;">Nenhuma receita encontrada</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Tente buscar por outro ingrediente, profeta ou categoria.</p>
        <button class="btn-install" style="margin-top: 1rem;" onclick="resetFilters()">Ver Todas as Receitas</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(recipe => createRecipeCardHTML(recipe)).join('');
}

function createRecipeCardHTML(recipe) {
  const isFav = appState.favorites.includes(recipe.id);
  const verseSnippet = recipe.verseText || recipe.story || '';

  return `
    <article class="recipe-card" onclick="openRecipeModal('${recipe.id}')" data-id="${recipe.id}">
      <div class="card-header-art" style="background: ${recipe.coverStyle || 'linear-gradient(135deg, #2e1e12, #633816)'};">
        <div class="card-art-pattern"></div>
        <div class="card-art-glow"></div>
        
        <div class="card-top-tags">
          <span class="card-badge-pill">${recipe.badge || recipe.tags[0]}</span>
          <button class="btn-fav-card ${isFav ? 'favorited' : ''}" 
                  onclick="event.stopPropagation(); toggleFavorite('${recipe.id}')" 
                  title="Favoritar receita" aria-label="Favoritar">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <p class="card-verse-preview">${recipe.verse ? `"${verseSnippet}"` : verseSnippet}</p>
      </div>

      <div class="card-body">
        <h3 class="card-title">${recipe.title}</h3>
        <span class="card-subtitle">${recipe.subtitle || ''}</span>
        <p class="card-story-snippet">${recipe.story || ''}</p>

        <div class="card-meta-chips">
          <span class="meta-chip">⏱️ ${recipe.totalTime || recipe.bakeTime}</span>
          <span class="meta-chip">🔥 ${recipe.difficulty}</span>
          <span class="meta-chip">🌾 ${recipe.glycemicIndex ? 'IG ' + recipe.glycemicIndex : 'Natural'}</span>
        </div>
      </div>

      <div class="card-action-bar">
        <button class="btn-open-recipe" type="button">
          <span>Abrir Receita & Modo Cozinha</span>
          <span>→</span>
        </button>
      </div>
    </article>
  `;
}

// ==========================================================================
// FILTROS & BUSCA
// ==========================================================================
function initCategories() {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.activeCategory = pill.dataset.category;
      renderRecipes();
    });
  });
}

function initSearch() {
  const input = document.getElementById('recipeSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if (!input) return;

  input.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value;
    if (clearBtn) {
      if (appState.searchQuery.length > 0) {
        clearBtn.classList.add('active');
      } else {
        clearBtn.classList.remove('active');
      }
    }
    renderRecipes();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      appState.searchQuery = '';
      clearBtn.classList.remove('active');
      renderRecipes();
      input.focus();
    });
  }
}

function resetFilters() {
  appState.activeCategory = 'todos';
  appState.searchQuery = '';
  const input = document.getElementById('recipeSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.classList.remove('active');
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(p => {
    if (p.dataset.category === 'todos') p.classList.add('active');
    else p.classList.remove('active');
  });
  renderRecipes();
}

// ==========================================================================
// FAVORITOS (LOCALSTORAGE)
// ==========================================================================
function toggleFavorite(recipeId) {
  const index = appState.favorites.indexOf(recipeId);
  if (index >= 0) {
    appState.favorites.splice(index, 1);
    showToast('Receita removida dos favoritos');
  } else {
    appState.favorites.push(recipeId);
    showToast('Receita salva com bênção nos favoritos! ❤️');
  }
  localStorage.setItem('pao_divino_favs', JSON.stringify(appState.favorites));
  renderRecipes();
}

// ==========================================================================
// MODAL DE DETALHES & MODO COZINHA
// ==========================================================================
function openRecipeModal(recipeId) {
  const recipe = RECIPES_DATA.find(r => r.id === recipeId);
  if (!recipe) return;

  appState.currentRecipe = recipe;
  appState.recipeServingsMultiplier = 1.0;
  appState.baseServings = recipe.servings || 1;
  appState.checkedIngredients.clear();

  const backdrop = document.getElementById('recipeModalBackdrop');
  const modalContainer = document.getElementById('recipeModalContainer');

  modalContainer.innerHTML = buildRecipeModalHTML(recipe);
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Tenta ativar o Wake Lock para manter a tela acesa na cozinha
  requestWakeLock();
}

function closeRecipeModal() {
  const backdrop = document.getElementById('recipeModalBackdrop');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
  releaseWakeLock();
}

function buildRecipeModalHTML(recipe) {
  const isFav = appState.favorites.includes(recipe.id);

  return `
    <div class="modal-header-hero" style="background: ${recipe.coverStyle || 'linear-gradient(135deg, #2b180d, #613414)'};">
      <button class="modal-close-btn" onclick="closeRecipeModal()" title="Fechar">✕</button>
      
      <span class="card-badge-pill">${recipe.badge || 'Receita Sagrada'}</span>
      <h2 style="font-family: var(--font-serif); font-size: 1.65rem; color: #fff; margin-top: 0.6rem;">${recipe.title}</h2>
      <p style="color: var(--gold-200); font-size: 0.95rem; margin-top: 0.2rem;">${recipe.subtitle || ''}</p>

      ${recipe.verse ? `
        <div class="modal-verse-card">
          <p class="modal-verse-text">"${recipe.verseText}"</p>
          <span class="modal-verse-ref">📖 ${recipe.verse}</span>
        </div>
      ` : ''}

      <div class="modal-meta-grid">
        <div class="modal-meta-box">
          <span class="meta-box-label">Preparo</span>
          <span class="meta-box-value">${recipe.prepTime}</span>
        </div>
        <div class="modal-meta-box">
          <span class="meta-box-label">Forno</span>
          <span class="meta-box-value">${recipe.bakeTime}</span>
        </div>
        <div class="modal-meta-box">
          <span class="meta-box-label">Dificuldade</span>
          <span class="meta-box-value">${recipe.difficulty}</span>
        </div>
        <div class="modal-meta-box">
          <span class="meta-box-label">Índice Glic.</span>
          <span class="meta-box-value">${recipe.glycemicIndex || 'Baixo'}</span>
        </div>
      </div>
    </div>

    <div class="modal-content-body">
      <!-- História e Contexto Bíblico -->
      ${recipe.story ? `
        <div class="story-box">
          <h4><span>🕊️</span> História & Contexto Bíblico</h4>
          <p>${recipe.story}</p>
        </div>
      ` : ''}

      <!-- Lista de Ingredientes com Calculadora de Porções -->
      <div>
        <div class="ingredients-section-header">
          <h3 class="font-serif" style="font-size: 1.25rem; color: var(--gold-300);">
            🍞 Ingredientes Sagrados
          </h3>
          
          <div class="portion-calculator">
            <button class="portion-btn" onclick="updateServings(-0.5)" title="Diminuir porções">−</button>
            <span class="portion-display" id="portionDisplay">
              ${(recipe.servings * appState.recipeServingsMultiplier).toFixed(1).replace('.0', '')} ${recipe.servingUnit || 'porções'}
            </span>
            <button class="portion-btn" onclick="updateServings(0.5)" title="Aumentar porções">+</button>
          </div>
        </div>

        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          💡 Toque nos ingredientes para marcá-los conforme separa na sua bancada:
        </p>

        <ul class="ingredients-list" id="modalIngredientsList">
          ${renderIngredientsListHTML(recipe)}
        </ul>
      </div>

      <!-- Passo a Passo com Timers Embutidos -->
      <div>
        <h3 class="font-serif" style="font-size: 1.25rem; color: var(--gold-300); margin-bottom: 1rem;">
          🥣 Modo de Preparo Passo a Passo
        </h3>

        <div class="steps-list">
          ${recipe.instructions.map(inst => `
            <div class="step-card">
              <div class="step-header">
                <div class="step-number-badge">
                  <span class="step-num-circle">${inst.step}</span>
                  <span>${inst.title}</span>
                </div>
                ${inst.timerSeconds ? `
                  <button class="btn-step-timer" onclick="startTimerDirectly(${inst.timerSeconds}, '${inst.title}')">
                    ⏱️ Iniciar ${formatSecondsToMin(inst.timerSeconds)}
                  </button>
                ` : ''}
              </div>
              <p class="step-description">${inst.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Dica da Dona do E-book -->
      ${recipe.tips ? `
        <div class="tips-banner">
          <span class="tips-icon">✨</span>
          <div class="tips-text">
            <h5>Segredo & Dica de Ouro dos Profetas</h5>
            <p>${recipe.tips}</p>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Barra de Ações Fixa no Rodapé -->
    <div class="modal-footer-actions">
      <button class="btn-primary-action" onclick="shareRecipeOnWhatsApp()">
        <span>📲 Enviar Ingredientes no WhatsApp</span>
      </button>
      <button class="btn-secondary-action" onclick="toggleFavorite('${recipe.id}')">
        <span>${isFav ? '❤️ Favoritado' : '🤍 Favoritar'}</span>
      </button>
      <button class="btn-secondary-action" onclick="openTimerModal()">
        <span>⏱️ Timer de Cozinha</span>
      </button>
    </div>
  `;
}

function renderIngredientsListHTML(recipe) {
  return recipe.ingredients.map((ing, idx) => {
    const isChecked = appState.checkedIngredients.has(idx);
    const calculatedAmount = ing.amount ? (ing.amount * appState.recipeServingsMultiplier) : null;
    let amountStr = '';
    if (calculatedAmount !== null) {
      amountStr = Number.isInteger(calculatedAmount) 
        ? calculatedAmount.toString() 
        : calculatedAmount.toFixed(1).replace('.0', '').replace('.', ',');
    }

    return `
      <li class="ingredient-item ${isChecked ? 'checked' : ''}" onclick="toggleIngredientCheck(${idx})">
        <span class="ing-checkbox">${isChecked ? '✓' : ''}</span>
        <span class="ing-amount">${amountStr ? `${amountStr} ${ing.unit || ''}` : ''}</span>
        <span class="ing-name">
          <span class="ing-text">${ing.name}</span>
          ${ing.notes ? `<span class="ing-notes"> (${ing.notes})</span>` : ''}
        </span>
      </li>
    `;
  }).join('');
}

function toggleIngredientCheck(idx) {
  if (appState.checkedIngredients.has(idx)) {
    appState.checkedIngredients.delete(idx);
  } else {
    appState.checkedIngredients.add(idx);
    playSoftClickSound();
  }
  const list = document.getElementById('modalIngredientsList');
  if (list && appState.currentRecipe) {
    list.innerHTML = renderIngredientsListHTML(appState.currentRecipe);
  }
}

function updateServings(delta) {
  const newMultiplier = appState.recipeServingsMultiplier + delta;
  if (newMultiplier < 0.5 || newMultiplier > 10) return;
  appState.recipeServingsMultiplier = newMultiplier;

  const display = document.getElementById('portionDisplay');
  if (display && appState.currentRecipe) {
    const totalServ = (appState.currentRecipe.servings * newMultiplier).toFixed(1).replace('.0', '');
    display.textContent = `${totalServ} ${appState.currentRecipe.servingUnit || 'porções'}`;
  }

  const list = document.getElementById('modalIngredientsList');
  if (list && appState.currentRecipe) {
    list.innerHTML = renderIngredientsListHTML(appState.currentRecipe);
  }
}

// ==========================================================================
// COMPARTILHAR NO WHATSAPP COM AMOR
// ==========================================================================
function shareRecipeOnWhatsApp() {
  if (!appState.currentRecipe) return;
  const r = appState.currentRecipe;

  let msg = `🍞 *${r.title}* - Receita do App Pão Divino\n`;
  if (r.subtitle) msg += `_${r.subtitle}_\n`;
  if (r.verse) msg += `\n📖 *${r.verse}*: "${r.verseText}"\n`;
  
  msg += `\n🛒 *Ingredientes (${(r.servings * appState.recipeServingsMultiplier).toFixed(1).replace('.0', '')} ${r.servingUnit || 'porções'}):*\n`;
  r.ingredients.forEach(ing => {
    const calculated = ing.amount ? (ing.amount * appState.recipeServingsMultiplier) : null;
    let amt = '';
    if (calculated !== null) {
      amt = Number.isInteger(calculated) ? calculated.toString() : calculated.toFixed(1).replace('.0', '').replace('.', ',');
    }
    msg += `• ${amt ? `${amt} ${ing.unit || ''} ` : ''}${ing.name}${ing.notes ? ` (${ing.notes})` : ''}\n`;
  });

  msg += `\n🥣 *Preparo:* ${r.prepTime} | Forno: ${r.bakeTime}\n`;
  if (r.tips) msg += `✨ *Segredo:* ${r.tips}\n`;
  msg += `\n_Que este pão abençoe sua mesa e nutra sua família!_ 🙏`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ==========================================================================
// TIMER DE COZINHA, FORNO & FERMENTAÇÃO
// ==========================================================================
function startTimerDirectly(seconds, label) {
  setTimerDuration(seconds, label);
  startTimer();
  showToast(`⏱️ Timer de ${formatSecondsToMin(seconds)} iniciado para: ${label}`);
}

function openTimerModal() {
  const modal = document.getElementById('timerModalBackdrop');
  if (modal) modal.classList.add('open');
}

function closeTimerModal() {
  const modal = document.getElementById('timerModalBackdrop');
  if (modal) modal.classList.remove('open');
}

function setTimerDuration(seconds, label = 'Preparo de Pão') {
  appState.timer.totalSeconds = seconds;
  appState.timer.remainingSeconds = seconds;
  appState.timer.label = label;
  updateTimerDisplay();
}

function startTimer() {
  if (appState.timer.isRunning) return;
  if (appState.timer.remainingSeconds <= 0) return;

  appState.timer.isRunning = true;
  updateTimerControls();
  showFloatingWidget();

  appState.timer.intervalId = setInterval(() => {
    if (appState.timer.remainingSeconds > 0) {
      appState.timer.remainingSeconds--;
      updateTimerDisplay();
    } else {
      finishTimer();
    }
  }, 1000);
}

function pauseTimer() {
  if (!appState.timer.isRunning) return;
  clearInterval(appState.timer.intervalId);
  appState.timer.isRunning = false;
  updateTimerControls();
}

function resetTimer() {
  pauseTimer();
  appState.timer.remainingSeconds = appState.timer.totalSeconds;
  updateTimerDisplay();
  hideFloatingWidget();
}

function finishTimer() {
  pauseTimer();
  playChurchBellChime();
  if ('vibrate' in navigator) {
    navigator.vibrate([300, 150, 300, 150, 600]);
  }
  showToast(`🔔 Glória a Deus! O tempo terminou: ${appState.timer.label || 'Seu pão está no ponto!'}`);
}

function updateTimerDisplay() {
  const sec = appState.timer.remainingSeconds;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const bigDisplay = document.getElementById('timerBigDisplay');
  if (bigDisplay) bigDisplay.textContent = formatted;

  const floatDigits = document.getElementById('floatTimerDigits');
  if (floatDigits) floatDigits.textContent = formatted;

  // Atualiza círculo SVG
  const circle = document.getElementById('timerProgressRing');
  if (circle && appState.timer.totalSeconds > 0) {
    const circumference = 2 * Math.PI * 88; // r=88
    const progress = appState.timer.remainingSeconds / appState.timer.totalSeconds;
    const offset = circumference * (1 - progress);
    circle.style.strokeDashoffset = offset;
  }
}

function updateTimerControls() {
  const toggleBtn = document.getElementById('btnTimerToggle');
  if (toggleBtn) {
    toggleBtn.textContent = appState.timer.isRunning ? '⏸️ Pausar' : '▶️ Iniciar';
  }
}

function showFloatingWidget() {
  const widget = document.getElementById('kitchenTimerWidget');
  if (widget) widget.classList.add('active');
}

function hideFloatingWidget() {
  const widget = document.getElementById('kitchenTimerWidget');
  if (widget) widget.classList.remove('active');
}

function formatSecondsToMin(sec) {
  const m = Math.floor(sec / 60);
  return `${m} min`;
}

// ==========================================================================
// ÁUDIO SINTETIZADO (WEB AUDIO API - 100% OFFLINE)
// ==========================================================================
function playChurchBellChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Harmônicos de sino sagrado / badalo suave
    const frequencies = [587.33, 880, 1174.66, 1760]; // Notas D5, A5, D6, A6
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3 / (idx + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.6);
    });
  } catch (e) {
    console.warn('Audio API não disponível:', e);
  }
}

function playSoftClickSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {}
}

// ==========================================================================
// WAKE LOCK API (TELA ACESA NA COZINHA)
// ==========================================================================
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      appState.wakeLock = await navigator.wakeLock.request('screen');
      console.log('[WakeLock] Tela travada para não apagar enquanto cozinha.');
    } catch (err) {
      console.log('[WakeLock] Erro ao travar tela:', err);
    }
  }
}

function releaseWakeLock() {
  if (appState.wakeLock !== null) {
    appState.wakeLock.release().then(() => {
      appState.wakeLock = null;
    });
  }
}

// ==========================================================================
// SEÇÃO DE DEVOCIONAIS & INGREDIENTES SAGRADOS
// ==========================================================================
function initDevotionals() {
  const container = document.getElementById('devotionalsGrid');
  if (!container) return;

  container.innerHTML = DEVOTIONALS.map(dev => `
    <div class="devotional-card">
      <h3 class="devotional-title">${dev.title}</h3>
      <p class="devotional-verse">${dev.verse}</p>
      <p class="devotional-text">${dev.text}</p>
    </div>
  `).join('');
}

function initIngredientsGuide() {
  const container = document.getElementById('ingredientsGuideGrid');
  if (!container) return;

  container.innerHTML = BIBLICAL_INGREDIENTS_INFO.map(ing => `
    <div class="ingredient-guide-card">
      <div class="guide-card-top">
        <span class="guide-ing-name">🌾 ${ing.name}</span>
        <span class="guide-ing-verse">${ing.verse}</span>
      </div>
      <p class="guide-meaning"><strong>Significado:</strong> ${ing.meaning}</p>
      <p class="guide-benefit"><strong>Saúde:</strong> ${ing.healthBenefit}</p>
    </div>
  `).join('');
}

// ==========================================================================
// BARRA DE NAVEGAÇÃO INFERIOR
// ==========================================================================
function initBottomNav() {
  const navBtns = document.querySelectorAll('.bottom-nav-bar .nav-item');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.target;
      if (target === 'receitas') {
        appState.activeCategory = 'todos';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderRecipes();
      } else if (target === 'biblicos') {
        appState.activeCategory = 'sagrados';
        scrollToSection('recipesSection');
        syncCategoryPills('sagrados');
        renderRecipes();
      } else if (target === 'sem-gluten') {
        appState.activeCategory = 'sem-gluten';
        scrollToSection('recipesSection');
        syncCategoryPills('sem-gluten');
        renderRecipes();
      } else if (target === 'devocional') {
        scrollToSection('devotionalSection');
      } else if (target === 'timer') {
        openTimerModal();
      }
    });
  });
}

function syncCategoryPills(cat) {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(p => {
    if (p.dataset.category === cat) p.classList.add('active');
    else p.classList.remove('active');
  });
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// TOAST NOTIFICATION
// ==========================================================================
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
