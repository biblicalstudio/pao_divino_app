/**
 * PÃO DIVINO - PWA Application Core
 * Gerenciamento de receitas, filtros, modo cozinha, timer de forno e suporte PWA offline.
 */

// Estado Global da Aplicação
const appState = {
  activeModule: null, // null = tela inicial com os 4 módulos em 2 colunas
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

// Configuração dos 4 Módulos Oficiais
const MODULE_CONFIG = {
  'sagrados': {
    title: 'Pães Sagrados',
    desc: 'Pães Bíblicos dos Profetas & Grãos Ancestrais',
    filterFn: (r) => ['sagrados', 'sem-gluten', 'rapidos', 'doces-especiais'].includes(r.category)
  },
  'sem-gluten': {
    title: 'Sem Glúten',
    desc: 'Pães Saudáveis, Rústicos & Funcionais',
    filterFn: (r) => r.category === 'bonus-gluten-free'
  },
  'sucos-detox': {
    title: 'Sucos Detox',
    desc: 'Sucos Verdes, Vivos & Acompanhamentos',
    filterFn: (r) => ['detox-sucos', 'detox-acompanhamentos'].includes(r.category)
  },
  'lanches': {
    title: 'Lanches',
    desc: 'Lanches e Cafés da Manhã Práticos & Nutritivos',
    filterFn: (r) => r.category === 'lanches-cafes'
  },
  'favoritos': {
    title: 'Meus Favoritos',
    desc: 'Suas receitas salvas para rápido acesso',
    filterFn: (r) => appState.favorites.includes(r.id)
  }
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

  // Escuta mensagem do Service Worker para parar o alarme via notificação
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'STOP_ALARM') {
        stopAlarm();
      }
    });
  }

  // Escuta tecla ESC para fechar modais ou silenciar alarme
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isAlarmRinging) {
        stopAlarm();
      }
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
// CATÁLOGO UNIFICADO DE RECEITAS (BÍBLICAS + BÔNUS 45 SEM GLÚTEN + 30 SUCOS DETOX)
// ==========================================================================
function getAllRecipes() {
  const base = (typeof RECIPES_DATA !== 'undefined' && Array.isArray(RECIPES_DATA)) ? RECIPES_DATA : [];
  const bonus = (typeof BONUS_GLUTEN_FREE_RECIPES !== 'undefined' && Array.isArray(BONUS_GLUTEN_FREE_RECIPES)) ? BONUS_GLUTEN_FREE_RECIPES : [];
  const sucos = (typeof SUCOS_DETOX_RECIPES !== 'undefined' && Array.isArray(SUCOS_DETOX_RECIPES)) ? SUCOS_DETOX_RECIPES : [];
  const lanches = (typeof LANCHES_CAFES_RECIPES !== 'undefined' && Array.isArray(LANCHES_CAFES_RECIPES)) ? LANCHES_CAFES_RECIPES : [];
  return [...base, ...bonus, ...sucos, ...lanches];
}

// ==========================================================================
// RENDERIZAÇÃO DO FEED DE RECEITAS (POR MÓDULO OU BUSCA GLOBAL)
// ==========================================================================
function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  const counter = document.getElementById('recipesCounter');
  if (!grid) return;

  const all = getAllRecipes();
  const filtered = all.filter((recipe) => {
    // 1. Busca por Texto: pesquisa em todas as 112 receitas
    if (appState.searchQuery.trim() !== '') {
      const q = appState.searchQuery.toLowerCase();
      const inTitle = recipe.title.toLowerCase().includes(q);
      const inSub = (recipe.subtitle || '').toLowerCase().includes(q);
      const inVerse = (recipe.verse || '').toLowerCase().includes(q) || (recipe.verseText || '').toLowerCase().includes(q);
      const inIngredients = (recipe.ingredients || []).some(ing => ing.name.toLowerCase().includes(q));
      const inTags = (recipe.tags || []).some(t => t.toLowerCase().includes(q));
      return inTitle || inSub || inVerse || inIngredients || inTags;
    }

    // 2. Filtro por Módulo Ativo
    if (appState.activeModule) {
      const config = MODULE_CONFIG[appState.activeModule];
      if (config && config.filterFn && !config.filterFn(recipe)) {
        return false;
      }
    }

    // 3. Subfiltro por Categoria dentro do módulo
    if (appState.activeCategory !== 'todos' && appState.activeCategory !== 'favoritos' && appState.activeCategory) {
      if (recipe.category !== appState.activeCategory) return false;
    }

    return true;
  });

  const countText = `${filtered.length} ${filtered.length === 1 ? 'receita' : 'receitas'}`;
  if (counter) {
    counter.textContent = countText;
  }

  // Na parte section-subtitle, exibe a mesma quantidade de receitas que tá em recipes-counter
  const subEl = document.getElementById('recipesSectionSubtitle');
  if (subEl) {
    if (appState.searchQuery.trim() !== '') {
      subEl.textContent = `${countText} • Resultados para "${appState.searchQuery}"`;
    } else if (appState.activeModule && MODULE_CONFIG[appState.activeModule]) {
      const cfg = MODULE_CONFIG[appState.activeModule];
      const desc = cfg.desc || 'Receitas selecionadas com carinho e saúde';
      subEl.textContent = `${countText} • ${desc}`;
    } else {
      subEl.textContent = `${countText} disponíveis`;
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem;">
        <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">🌾</span>
        <h3 style="font-size: 1.3rem; color: var(--gold-300); margin-bottom: 0.5rem;">Nenhuma receita encontrada</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Tente buscar por outro ingrediente ou selecione outro módulo.</p>
        <button class="btn-install" style="margin-top: 1rem;" onclick="backToModules()">Voltar aos Módulos</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(recipe => createRecipeCardHTML(recipe)).join('');
}

function createRecipeCardHTML(recipe) {
  const isFav = appState.favorites.includes(recipe.id);
  const verseSnippet = recipe.verseText || recipe.story || recipe.tips || '';

  return `
    <article class="recipe-card" 
             onclick="openRecipeModal('${recipe.id}')" 
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipeModal('${recipe.id}');}" 
             data-id="${recipe.id}"
             role="button"
             tabindex="0"
             aria-label="Abrir receita de ${recipe.title}">
      <div class="card-header-art" style="background: ${recipe.coverStyle || 'var(--wheat-100)'};">
        ${recipe.image ? `
          <img src="${recipe.image}" alt="${recipe.title}" class="card-recipe-img" loading="lazy">
          <div class="card-art-overlay"></div>
        ` : ''}
        
        <div class="card-top-tags">
          <span class="card-badge-pill">
            <span class="badge-tag-text">${recipe.badge || (recipe.tags && recipe.tags[0]) || 'Sem Glúten'}</span>
            <span class="badge-title-text">${recipe.title}</span>
          </span>
          <button class="btn-fav-card ${isFav ? 'favorited' : ''}" 
                  onclick="event.stopPropagation(); toggleFavorite('${recipe.id}')" 
                  title="Favoritar receita" aria-label="Favoritar">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        ${verseSnippet ? `
          <p class="card-verse-preview">${recipe.verse ? `"${verseSnippet}"` : verseSnippet}</p>
        ` : ''}
      </div>

      <div class="card-body">
        <h3 class="card-title">${recipe.title}</h3>
        <span class="card-subtitle">${recipe.subtitle || ''}</span>
        <p class="card-story-snippet">${recipe.story || recipe.tips || ''}</p>

        <div class="card-meta-chips">
          <span class="meta-chip">⏱️ ${recipe.totalTime || recipe.bakeTime || recipe.prepTime}</span>
          <span class="meta-chip">🔥 ${recipe.difficulty}</span>
          <span class="meta-chip">🌾 ${recipe.glycemicIndex ? 'IG ' + recipe.glycemicIndex : (recipe.category === 'bonus-gluten-free' ? 'Sem Glúten' : (recipe.category === 'detox-sucos' ? '100% Detox' : (recipe.category === 'lanches-cafes' ? 'Café & Lanche' : 'Natural')))}</span>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// FILTROS & BUSCA
// ==========================================================================
// NAVEGAÇÃO ENTRE MÓDULOS E CATEGORIAS
// ==========================================================================
function selectModule(moduleId) {
  appState.activeModule = moduleId;
  appState.activeCategory = 'todos';

  const modulesSec = document.getElementById('modulesSection');
  const recipesSec = document.getElementById('recipesSection');
  const devSec = document.getElementById('devotionalSection');
  const titleEl = document.getElementById('recipesSectionTitle');

  if (modulesSec) modulesSec.classList.add('hidden');
  if (devSec) devSec.classList.add('hidden');
  if (recipesSec) recipesSec.classList.remove('hidden');

  const config = MODULE_CONFIG[moduleId];
  if (config && titleEl) {
    titleEl.textContent = config.title;
  }

  renderRecipes();
  window.scrollTo({ top: recipesSec ? recipesSec.offsetTop - 75 : 0, behavior: 'smooth' });
}

function backToModules() {
  appState.activeModule = null;
  appState.searchQuery = '';
  appState.activeCategory = 'todos';

  const searchInput = document.getElementById('recipeSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.classList.remove('active');

  const modulesSec = document.getElementById('modulesSection');
  const recipesSec = document.getElementById('recipesSection');
  const devSec = document.getElementById('devotionalSection');

  if (modulesSec) modulesSec.classList.remove('hidden');
  if (recipesSec) recipesSec.classList.add('hidden');
  if (devSec) devSec.classList.add('hidden');

  const navBtns = document.querySelectorAll('.bottom-nav-bar .nav-item');
  navBtns.forEach(b => b.classList.remove('active'));
  const modBtn = document.querySelector('.bottom-nav-bar .nav-item[data-target="modulos"]');
  if (modBtn) modBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showFavoritesModule() {
  selectModule('favoritos');
  const navBtns = document.querySelectorAll('.bottom-nav-bar .nav-item');
  navBtns.forEach(b => b.classList.remove('active'));
  const favBtn = document.querySelector('.bottom-nav-bar .nav-item[data-target="favoritos"]');
  if (favBtn) favBtn.classList.add('active');
}

function showDevotional() {
  appState.activeModule = 'devocional';
  const modulesSec = document.getElementById('modulesSection');
  const recipesSec = document.getElementById('recipesSection');
  const devSec = document.getElementById('devotionalSection');
  if (modulesSec) modulesSec.classList.add('hidden');
  if (recipesSec) recipesSec.classList.add('hidden');
  if (devSec) devSec.classList.remove('hidden');

  const navBtns = document.querySelectorAll('.bottom-nav-bar .nav-item');
  navBtns.forEach(b => b.classList.remove('active'));
  const devBtn = document.querySelector('.bottom-nav-bar .nav-item[data-target="devocional"]');
  if (devBtn) devBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
    const modulesSec = document.getElementById('modulesSection');
    const recipesSec = document.getElementById('recipesSection');
    const titleEl = document.getElementById('recipesSectionTitle');

    if (appState.searchQuery.trim().length > 0) {
      if (clearBtn) clearBtn.classList.add('active');
      if (modulesSec) modulesSec.classList.add('hidden');
      if (recipesSec) recipesSec.classList.remove('hidden');
      if (titleEl) titleEl.textContent = 'Resultados da Busca';
    } else {
      if (clearBtn) clearBtn.classList.remove('active');
      if (appState.activeModule) {
        selectModule(appState.activeModule);
      } else {
        backToModules();
      }
    }
    renderRecipes();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      appState.searchQuery = '';
      clearBtn.classList.remove('active');
      if (appState.activeModule) {
        selectModule(appState.activeModule);
      } else {
        backToModules();
      }
      input.focus();
    });
  }
}

function resetFilters() {
  backToModules();
}

// ==========================================================================
// FAVORITOS (LOCALSTORAGE)
// ==========================================================================
// FAVORITOS (LOCALSTORAGE)
// ==========================================================================
function toggleFavorite(recipeId) {
  const index = appState.favorites.indexOf(recipeId);
  const isNowFav = index < 0;
  if (index >= 0) {
    appState.favorites.splice(index, 1);
    showToast('Receita removida dos favoritos');
  } else {
    appState.favorites.push(recipeId);
    showToast('Receita salva com bênção nos favoritos! ❤️');
  }
  localStorage.setItem('pao_divino_favs', JSON.stringify(appState.favorites));
  renderRecipes();

  // Atualiza botões no modal de tela cheia se estiver aberto
  const topFavBtn = document.getElementById('modalTopFavBtn');
  if (topFavBtn) topFavBtn.textContent = isNowFav ? '❤️' : '🤍';
  const footerFavBtn = document.getElementById('modalFooterFavBtn');
  if (footerFavBtn) footerFavBtn.innerHTML = `<span>${isNowFav ? '❤️ Favoritado' : '🤍 Favoritar'}</span>`;
}

// ==========================================================================
// TELA CHEIA DE DETALHES DA RECEITA & MODO COZINHA
// ==========================================================================
function openRecipeModal(recipeId) {
  const recipe = getAllRecipes().find(r => r.id === recipeId);
  if (!recipe) return;

  appState.currentRecipe = recipe;
  appState.recipeServingsMultiplier = 1.0;
  appState.baseServings = recipe.servings || 1;
  appState.checkedIngredients.clear();

  const backdrop = document.getElementById('recipeModalBackdrop');
  const modalContainer = document.getElementById('recipeModalContainer');

  modalContainer.innerHTML = buildRecipeModalHTML(recipe);
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Rola suavemente para o início da receita
  modalContainer.scrollTop = 0;

  // Empurra estado no histórico para que voltar no navegador/celular feche a receita
  try {
    history.pushState({ modalOpen: true, recipeId }, '');
  } catch (e) {}

  // Tenta ativar o Wake Lock para manter a tela acesa na cozinha
  requestWakeLock();
}

function closeRecipeModal(popHistory = false) {
  const backdrop = document.getElementById('recipeModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
  releaseWakeLock();

  if (popHistory && window.history.state && window.history.state.modalOpen) {
    try {
      history.back();
    } catch (e) {}
  }
}

// Escuta evento popstate para fechar tela cheia ao usar botão voltar do Android/iOS
window.addEventListener('popstate', () => {
  const backdrop = document.getElementById('recipeModalBackdrop');
  if (backdrop && backdrop.classList.contains('open')) {
    closeRecipeModal(false);
  }
});

function buildRecipeModalHTML(recipe) {
  const isFav = appState.favorites.includes(recipe.id);

  return `
    <!-- Barra Superior Fixa de Navegação da Tela Cheia -->
    <div class="modal-top-bar">
      <div class="modal-top-bar-inner">
        <button class="modal-back-btn" onclick="closeRecipeModal(true)" aria-label="Voltar para receitas">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Voltar</span>
        </button>

        <div class="modal-top-actions">
          <button class="modal-top-action-btn" id="modalTopFavBtn" onclick="toggleFavorite('${recipe.id}')" title="Favoritar">
            ${isFav ? '❤️' : '🤍'}
          </button>
          <button class="modal-top-action-btn" onclick="closeRecipeModal(true)" title="Fechar receita">
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Cabeçalho Hero da Receita -->
    <div class="modal-header-hero" style="background: ${recipe.coverStyle || 'linear-gradient(135deg, #2b180d, #613414)'};">
      <div class="modal-header-inner">
        <span class="card-badge-pill">${recipe.badge || 'Receita Sagrada'}</span>
        <h2 style="font-family: var(--font-serif); font-size: 1.7rem; color: #fff; margin-top: 0.6rem; line-height: 1.25;">${recipe.title}</h2>
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
            <span class="meta-box-label">${recipe.bakeTime === '0 min' ? 'Preparo' : 'Forno'}</span>
            <span class="meta-box-value">${recipe.bakeTime === '0 min' ? 'Sem Forno' : recipe.bakeTime}</span>
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
    </div>

    <div class="modal-content-body">
      <!-- Foto Oficial do E-book da Receita -->
      ${recipe.image ? `
        <div class="modal-recipe-cover-wrap">
          <img src="${recipe.image}" alt="${recipe.title}" class="modal-recipe-cover-img" loading="eager">
          <span class="modal-recipe-badge-overlay">📖 Página Original do E-book</span>
        </div>
      ` : ''}

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
      <div class="modal-footer-inner">
        <button class="btn-primary-action" onclick="shareRecipeOnWhatsApp()">
          <span>📲 Enviar Ingredientes no WhatsApp</span>
        </button>
        <button class="btn-secondary-action" id="modalFooterFavBtn" onclick="toggleFavorite('${recipe.id}')">
          <span>${isFav ? '❤️ Favoritado' : '🤍 Favoritar'}</span>
        </button>
        <button class="btn-secondary-action" onclick="openTimerModal()">
          <span>⏱️ Timer de Cozinha</span>
        </button>
      </div>
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
  const clamped = Math.min(14400, Math.max(0, parseInt(seconds, 10) || 0));
  appState.timer.totalSeconds = clamped;
  appState.timer.remainingSeconds = clamped;
  appState.timer.label = label;
  updateTimerDisplay();
}

function setTimerFromSlider(seconds) {
  const sec = Math.min(14400, Math.max(0, parseInt(seconds, 10) || 0));
  appState.timer.totalSeconds = sec;
  appState.timer.remainingSeconds = sec;
  appState.timer.label = sec > 0 ? `Timer de ${formatSecondsToMin(sec)}` : 'Preparo de Pão';
  updateTimerDisplay(true);
}

function adjustTimer(deltaSeconds) {
  const current = appState.timer.remainingSeconds || 0;
  const next = Math.max(0, Math.min(14400, current + deltaSeconds));
  setTimerDuration(next, appState.timer.label || 'Preparo de Pão');
}

// ==========================================================================
// ÁUDIO DO ALARME & NOTIFICAÇÕES (BARRA DE STATUS E TELA BLOQUEADA)
// ==========================================================================
const timerAlarmAudio = new Audio('./sound/alarm.mp3');
timerAlarmAudio.preload = 'auto';
timerAlarmAudio.loop = true;

let isAlarmRinging = false;
let activeSystemNotification = null;

// Tenta carregar fallback se o caminho primário falhar
timerAlarmAudio.addEventListener('error', () => {
  if (!timerAlarmAudio.src.includes('js/sound/alarm.mp3')) {
    timerAlarmAudio.src = './js/sound/alarm.mp3';
  }
});

function requestTimerNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    try {
      Notification.requestPermission();
    } catch (e) {}
  }
}

function startTimer() {
  if (appState.timer.isRunning) return;
  if (appState.timer.remainingSeconds <= 0) return;

  // Solicita permissão para notificação na barra de status
  requestTimerNotificationPermission();

  // Destrava o áudio no iOS / Android mediante gesto do usuário
  try {
    timerAlarmAudio.play().then(() => {
      timerAlarmAudio.pause();
      timerAlarmAudio.currentTime = 0;
    }).catch(() => {});
  } catch (e) {}

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
  appState.timer.intervalId = null;
  appState.timer.isRunning = false;
  updateTimerControls();
}

function resetTimer() {
  pauseTimer();
  stopAlarm();
  appState.timer.remainingSeconds = appState.timer.totalSeconds;
  updateTimerDisplay();
  hideFloatingWidget();
}

function finishTimer() {
  pauseTimer();
  playAlarm();
  showToast(`🔔 Glória a Deus! O tempo terminou: ${appState.timer.label || 'Seu pão está no ponto!'}`);
}

function playAlarm() {
  isAlarmRinging = true;

  // 1. Toca o arquivo de som alarm.mp3 em loop contínuo
  try {
    timerAlarmAudio.currentTime = 0;
    const playPromise = timerAlarmAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Reprodução do alarme mp3 impedida, acionando sintetizador:', err);
        playChurchBellChime();
      });
    }
  } catch (err) {
    playChurchBellChime();
  }

  // 2. Vibração no dispositivo móvel
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([500, 250, 500, 250, 1000]);
    } catch (e) {}
  }

  // 3. MediaSession API (Controle com botão Parar / Pausar na Barra de Notificação e Tela Bloqueada)
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: '🔔 O Tempo Acabou!',
        artist: 'Pão Divino',
        album: appState.timer.label || 'Seu pão está no ponto!',
        artwork: [
          { src: './icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: './icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      });
      navigator.mediaSession.setActionHandler('pause', stopAlarm);
      navigator.mediaSession.setActionHandler('stop', stopAlarm);
      navigator.mediaSession.playbackState = 'playing';
    } catch (e) {}
  }

  // 4. Notificação do Sistema na Barra de Notificações
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const notifOptions = {
        body: `Glória a Deus! O tempo de preparo terminou: ${appState.timer.label || 'Seu pão está pronto!'}. Toque para parar o alarme.`,
        icon: './icons/icon-192.png',
        badge: './icons/icon.svg',
        vibrate: [500, 250, 500, 250, 1000],
        tag: 'pao-divino-alarm',
        renotify: true,
        requireInteraction: true,
        actions: [
          { action: 'stop-alarm', title: '⏹️ Parar Alarme' }
        ]
      };

      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification('🍞 Pão Divino - Alarme Concluído!', notifOptions);
        });
      } else {
        activeSystemNotification = new Notification('🍞 Pão Divino - Alarme Concluído!', notifOptions);
        activeSystemNotification.onclick = () => stopAlarm();
      }
    } catch (e) {}
  }

  // 5. Exibe Banner Visual Superior
  const banner = document.getElementById('alarmRingingBanner');
  if (banner) {
    banner.style.display = 'block';
  }

  // 6. Ao clicar em QUALQUER lugar da tela, para imediatamente de tocar!
  setTimeout(() => {
    window.addEventListener('click', onGlobalClickStopAlarm, { capture: true, once: true });
    window.addEventListener('touchstart', onGlobalClickStopAlarm, { capture: true, once: true });
  }, 120);
}

function onGlobalClickStopAlarm(e) {
  stopAlarm();
}

function stopAlarm() {
  if (!isAlarmRinging) return;
  isAlarmRinging = false;

  // Pausa e reseta o áudio
  try {
    timerAlarmAudio.pause();
    timerAlarmAudio.currentTime = 0;
  } catch (e) {}

  // Reseta MediaSession
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.playbackState = 'none';
    } catch (e) {}
  }

  // Fecha notificação do sistema
  if (activeSystemNotification) {
    try { activeSystemNotification.close(); } catch (e) {}
    activeSystemNotification = null;
  }

  // Esconde o banner
  const banner = document.getElementById('alarmRingingBanner');
  if (banner) {
    banner.style.display = 'none';
  }

  // Remove listeners de clique global
  window.removeEventListener('click', onGlobalClickStopAlarm, { capture: true });
  window.removeEventListener('touchstart', onGlobalClickStopAlarm, { capture: true });

  showToast('🔇 Alarme silenciado.');
}

function formatSecondsToHMS(sec) {
  const s = Math.max(0, parseInt(sec, 10) || 0);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay(fromSlider = false) {
  const sec = Math.max(0, appState.timer.remainingSeconds || 0);
  const formatted = formatSecondsToHMS(sec);

  const bigDisplay = document.getElementById('timerBigDisplay');
  if (bigDisplay) bigDisplay.textContent = formatted;

  const floatDigits = document.getElementById('floatTimerDigits');
  if (floatDigits) floatDigits.textContent = formatted;

  const activeLabel = document.getElementById('timerActiveLabel');
  if (activeLabel && appState.timer.label) {
    activeLabel.textContent = appState.timer.label;
  }

  // Controle de Tempo Deslizante com Círculo Branco (Estilo do Print)
  const slider = document.getElementById('timerHorizontalSlider');
  const total = appState.timer.totalSeconds || 0;
  let percent = 0;

  if (appState.timer.isRunning && total > 0) {
    // Durante a contagem regressiva, reflete o percentual do ciclo atual
    percent = (sec / total) * 100;
  } else {
    // Em repouso/ajuste, reflete a posição em relação ao máximo de 4 horas (14400s)
    percent = (sec / 14400) * 100;
  }

  const clampedPercent = Math.min(100, Math.max(0, percent));

  if (slider) {
    // Pinta a barra à esquerda do círculo em azul (#3b82f6) e à direita em cinza (#4b5563) igual ao print
    slider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${clampedPercent}%, #4b5563 ${clampedPercent}%, #4b5563 100%)`;
    if (!fromSlider) {
      slider.value = sec;
    }
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
  const s = Math.max(0, parseInt(sec, 10) || 0);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
  }
  return `${minutes} min`;
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
      if (target === 'modulos') {
        backToModules();
      } else if (target === 'favoritos') {
        showFavoritesModule();
      } else if (target === 'devocional') {
        showDevotional();
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
