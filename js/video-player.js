/**
 * PÃO DIVINO - Player Profissional & Módulo de Vídeo Aulas
 * Suporte a reprodução em alta performance, timeline interativa, -10s/+10s, PiP,
 * controle de velocidade, persistência de ingredientes com check e conclusão de aulas.
 */

(function () {
  'use strict';

  // Estado do Módulo de Vídeo Aulas
  const videoState = {
    lessons: [],
    currentLesson: null,
    currentIndex: 0,
    isPlaying: false,
    controlsTimeout: null,
    wakeLock: null,
    completedLessons: new Set(JSON.parse(localStorage.getItem('pao_divino_video_completed') || '[]')),
    lastTapTime: 0,
    lastTapSide: null
  };

  // Inicialização quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    loadVideoLessons();
  });

  /**
   * Carrega os dados das vídeo aulas a partir de videoaulas.json (com fallback para VIDEO_AULAS_DATA)
   */
  async function loadVideoLessons() {
    try {
      const response = await fetch('./assets/VideoAulas/pao_rustico/videoaulas.json');
      if (response.ok) {
        videoState.lessons = await response.json();
      } else {
        throw new Error('Falha no fetch do JSON');
      }
    } catch (err) {
      if (typeof VIDEO_AULAS_DATA !== 'undefined' && Array.isArray(VIDEO_AULAS_DATA)) {
        videoState.lessons = VIDEO_AULAS_DATA;
      } else {
        console.warn('[Vídeo Aulas] Usando array vazio como fallback:', err);
        videoState.lessons = [];
      }
    }

    renderVideoCatalog();
    initPlayerEvents();
  }

  /**
   * Renderiza a grade de catálogo das 9 vídeo aulas
   */
  function renderVideoCatalog() {
    const grid = document.getElementById('videoCatalogGrid');
    if (!grid) return;

    if (!videoState.lessons || videoState.lessons.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
          <p style="color: var(--text-muted);">Nenhuma vídeo aula encontrada no momento.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = videoState.lessons.map((lesson, idx) => {
      const isCompleted = videoState.completedLessons.has(lesson.id);
      return `
        <article class="video-lesson-card" onclick="openVideoLesson('${lesson.id}', true)" 
                 role="button" tabindex="0" 
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openVideoLesson('${lesson.id}', true);}"
                 aria-label="Assistir aula ${lesson.shortTitle || lesson.title}">
          <div class="video-thumb-wrap">
            <img src="./images/recipes/pao-multigraos-abencoado-levain.jpg" 
                 alt="${lesson.title}" 
                 class="video-thumb-preview" 
                 loading="lazy">
            <div class="video-thumb-overlay">
              <div class="video-play-badge">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <span class="video-card-badge">${lesson.badge || 'Vídeo Aula'}</span>
            <span class="video-card-number">#${lesson.numStr || String(idx + 1).padStart(2, '0')}</span>
          </div>

          <div class="video-card-body">
            <h3 class="video-card-title">${lesson.shortTitle || lesson.title}</h3>
            <p class="video-card-desc">${lesson.description || ''}</p>
            
            <div class="video-card-meta">
              <div class="video-meta-tag">
                <span>⏱️</span>
                <span>${lesson.prepTime || '30 min'}</span>
              </div>
              <div class="video-meta-tag">
                <span>🍞</span>
                <span>${lesson.yield ? lesson.yield.split('(')[0].trim() : '1 pão'}</span>
              </div>
              ${isCompleted ? `
                <span class="video-status-completed">
                  <span>✓</span> Concluída
                </span>
              ` : `
                <button type="button" class="video-btn-watch">
                  ▶ Assistir
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Abre uma vídeo aula específica e configura o player profissional
   */
  window.openVideoLesson = function (lessonId, autoPlay = false) {
    const lesson = videoState.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    videoState.currentLesson = lesson;
    videoState.currentIndex = videoState.lessons.findIndex(l => l.id === lessonId);

    const catalogView = document.getElementById('videoAulasCatalog');
    const playerView = document.getElementById('videoAulaPlayerView');
    const videoEl = document.getElementById('proVideoPlayer');

    if (catalogView) catalogView.classList.add('hidden');
    if (playerView) playerView.classList.remove('hidden');

    // Configura o vídeo
    if (videoEl) {
      // Usa encodeURI para suportar acentos ou espaços no nome do arquivo
      const videoSrc = encodeURI(lesson.videoPath);
      if (videoEl.getAttribute('data-current-src') !== videoSrc) {
        videoEl.src = videoSrc;
        videoEl.setAttribute('data-current-src', videoSrc);
        videoEl.load();
      }

      if (autoPlay) {
        videoEl.play().catch(() => {
          // Navegadores podem bloquear autoplay sem interação prévia
          updatePlayPauseButton(false);
        });
      }
    }

    renderLessonDetails(lesson);
    window.scrollTo({ top: playerView ? playerView.offsetTop - 70 : 0, behavior: 'smooth' });
  };

  /**
   * Volta para a tela de catálogo das vídeo aulas
   */
  window.closeVideoLessonView = function () {
    const videoEl = document.getElementById('proVideoPlayer');
    if (videoEl && !videoEl.paused) {
      videoEl.pause();
    }

    const catalogView = document.getElementById('videoAulasCatalog');
    const playerView = document.getElementById('videoAulaPlayerView');

    if (playerView) playerView.classList.add('hidden');
    if (catalogView) catalogView.classList.remove('hidden');

    renderVideoCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Navega para a aula anterior ou próxima
   */
  window.navigateLesson = function (delta) {
    const nextIndex = videoState.currentIndex + delta;
    if (nextIndex >= 0 && nextIndex < videoState.lessons.length) {
      const nextLesson = videoState.lessons[nextIndex];
      window.openVideoLesson(nextLesson.id, true);
    }
  };

  /**
   * Renderiza os detalhes da aula: título, rendimento, tempos, ingredientes e playlist
   */
  function renderLessonDetails(lesson) {
    const container = document.getElementById('lessonDetailsContainer');
    if (!container) return;

    const isCompleted = videoState.completedLessons.has(lesson.id);
    const checkedIngs = getCheckedIngredients(lesson.id);

    // Contagem total de ingredientes
    let totalIngs = 0;
    (lesson.ingredientGroups || []).forEach(g => {
      totalIngs += (g.ingredients || []).length;
    });

    container.innerHTML = `
      <div class="lesson-main-card">
        <!-- Cabeçalho da Aula -->
        <div class="lesson-title-area">
          <div class="lesson-meta-chips">
            <span class="lesson-chip-num">AULA #${lesson.numStr || String(videoState.currentIndex + 1).padStart(2, '0')}</span>
            <span class="lesson-chip-badge">${lesson.badge || 'Técnica de Panificação'}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${videoState.currentIndex + 1} de ${videoState.lessons.length} aulas</span>
          </div>
          <h2 class="lesson-title-text">${lesson.title}</h2>
        </div>

        <!-- Botões de Ação Rápida -->
        <div class="lesson-action-pills">
          <button type="button" class="btn-lesson-action ${isCompleted ? 'completed' : ''}" 
                  id="btnToggleCompleted" onclick="toggleLessonCompleted('${lesson.id}')">
            <span>${isCompleted ? '✓ Aula Concluída' : '○ Marcar como Concluída'}</span>
          </button>
          <button type="button" class="btn-lesson-action" onclick="shareVideoIngredientsWhatsApp()">
            <span>📲 Enviar Ingredientes no WhatsApp</span>
          </button>
          <button type="button" class="btn-lesson-action" onclick="openTimerModal()">
            <span>⏱️ Timer de Cozinha</span>
          </button>
        </div>

        <!-- Grade de Especificações Técnicas -->
        <div class="lesson-spec-grid">
          <div class="lesson-spec-card">
            <span class="lesson-spec-icon">🍞</span>
            <div>
              <span class="lesson-spec-label">Rendimento</span>
              <span class="lesson-spec-value">${lesson.yield || 'Não informado'}</span>
            </div>
          </div>
          <div class="lesson-spec-card">
            <span class="lesson-spec-icon">⏰</span>
            <div>
              <span class="lesson-spec-label">Manuseio</span>
              <span class="lesson-spec-value">${lesson.prepTime || '30 min'}</span>
            </div>
          </div>
          <div class="lesson-spec-card">
            <span class="lesson-spec-icon">⏳</span>
            <div>
              <span class="lesson-spec-label">Tempo Total</span>
              <span class="lesson-spec-value">${lesson.totalTime || '3 a 4 horas'}</span>
            </div>
          </div>
        </div>

        <!-- Descrição / Orientação -->
        <div class="lesson-desc-box">
          <strong>💡 Dica do Padeiro:</strong> ${lesson.description || 'Assista à aula com atenção aos movimentos de sova e aos pontos de fermentação mostrados no vídeo.'}
        </div>

        <!-- ================================================================
             LISTA DE INGREDIENTES COM SISTEMA DE CHECK (IDENTICO ÀS RECEITAS)
             ================================================================ -->
        <div class="video-ingredients-wrapper">
          <div class="video-ingredients-header">
            <h3 class="video-ingredients-title">
              <span>🌾</span> Ingredientes da Aula
            </h3>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span class="video-ing-counter-badge" id="videoIngCounter">
                ${checkedIngs.size} de ${totalIngs} separados
              </span>
              <button type="button" class="video-ing-reset-btn" onclick="clearLessonIngredients('${lesson.id}')">
                Desmarcar todos
              </button>
            </div>
          </div>

          <p class="video-ing-instructions-hint">
            💡 Toque nos ingredientes conforme separa cada item na sua bancada:
          </p>

          <div id="videoIngredientsListWrap">
            ${renderIngredientGroupsHTML(lesson, checkedIngs)}
          </div>
        </div>

        <!-- Playlist Rápida de Aulas -->
        <div class="video-playlist-section">
          <h4 class="video-playlist-title">
            <span>📚</span> Todas as Aulas Deste Módulo
          </h4>
          <div class="video-playlist-grid">
            ${videoState.lessons.map((item, i) => `
              <div class="playlist-item-card ${item.id === lesson.id ? 'active' : ''}" 
                   onclick="openVideoLesson('${item.id}', true)">
                <div class="playlist-item-num">${item.numStr || String(i + 1).padStart(2, '0')}</div>
                <div class="playlist-item-info">
                  <div class="playlist-item-title">${item.shortTitle || item.title}</div>
                  <div class="playlist-item-sub">${item.yield ? item.yield.split('(')[0].trim() : 'Pão Rústico'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Atualiza botões de navegação anterior/próxima
    const btnPrev = document.getElementById('btnPrevLesson');
    const btnNext = document.getElementById('btnNextLesson');
    if (btnPrev) btnPrev.disabled = (videoState.currentIndex === 0);
    if (btnNext) btnNext.disabled = (videoState.currentIndex === videoState.lessons.length - 1);
  }

  /**
   * Renderiza os grupos de ingredientes com o mesmo layout de `ingredient-item` das outras receitas
   */
  function renderIngredientGroupsHTML(lesson, checkedSet) {
    if (!lesson.ingredientGroups || lesson.ingredientGroups.length === 0) {
      return '<p style="color: var(--text-muted);">Nenhum ingrediente listado para esta aula.</p>';
    }

    let globalIngIndex = 0;

    return lesson.ingredientGroups.map((group) => {
      const groupHtml = `
        <div class="video-ing-group-block">
          <span class="video-ing-group-title">${group.group}</span>
          <ul class="ingredients-list">
            ${(group.ingredients || []).map((ing) => {
              const currentIdx = globalIngIndex++;
              const isChecked = checkedSet.has(currentIdx);
              return `
                <li class="ingredient-item ${isChecked ? 'checked' : ''}" 
                    onclick="toggleVideoIngredientCheck('${lesson.id}', ${currentIdx})">
                  <span class="ing-checkbox">${isChecked ? '✓' : ''}</span>
                  <span class="ing-amount">${ing.amount || ''}</span>
                  <span class="ing-name">
                    <span class="ing-text">${ing.name}</span>
                    ${ing.notes ? `<span class="ing-notes"> (${ing.notes})</span>` : ''}
                  </span>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `;
      return groupHtml;
    }).join('');
  }

  /**
   * Alterna o check de um ingrediente da aula e salva no localStorage
   */
  window.toggleVideoIngredientCheck = function (lessonId, ingIndex) {
    const checkedSet = getCheckedIngredients(lessonId);
    if (checkedSet.has(ingIndex)) {
      checkedSet.delete(ingIndex);
    } else {
      checkedSet.add(ingIndex);
      if (typeof playSoftClickSound === 'function') {
        playSoftClickSound();
      }
    }

    saveCheckedIngredients(lessonId, checkedSet);

    // Re-renderiza a lista de ingredientes sem recarregar o vídeo
    const wrap = document.getElementById('videoIngredientsListWrap');
    const counter = document.getElementById('videoIngCounter');
    const lesson = videoState.currentLesson;

    if (wrap && lesson) {
      wrap.innerHTML = renderIngredientGroupsHTML(lesson, checkedSet);
    }

    if (counter && lesson) {
      let totalIngs = 0;
      (lesson.ingredientGroups || []).forEach(g => totalIngs += (g.ingredients || []).length);
      counter.textContent = `${checkedSet.size} de ${totalIngs} separados`;
    }
  };

  /**
   * Limpa todos os checks de ingredientes da aula
   */
  window.clearLessonIngredients = function (lessonId) {
    const emptySet = new Set();
    saveCheckedIngredients(lessonId, emptySet);

    const wrap = document.getElementById('videoIngredientsListWrap');
    const counter = document.getElementById('videoIngCounter');
    const lesson = videoState.currentLesson;

    if (wrap && lesson) {
      wrap.innerHTML = renderIngredientGroupsHTML(lesson, emptySet);
    }
    if (counter && lesson) {
      let totalIngs = 0;
      (lesson.ingredientGroups || []).forEach(g => totalIngs += (g.ingredients || []).length);
      counter.textContent = `0 de ${totalIngs} separados`;
    }

    if (typeof showToast === 'function') {
      showToast('Seleção de ingredientes zerada');
    }
  };

  /**
   * Alterna o status de aula concluída
   */
  window.toggleLessonCompleted = function (lessonId) {
    const btn = document.getElementById('btnToggleCompleted');
    if (videoState.completedLessons.has(lessonId)) {
      videoState.completedLessons.delete(lessonId);
      if (btn) {
        btn.classList.remove('completed');
        btn.innerHTML = '<span>○ Marcar como Concluída</span>';
      }
      if (typeof showToast === 'function') showToast('Aula desmarcada');
    } else {
      videoState.completedLessons.add(lessonId);
      if (btn) {
        btn.classList.add('completed');
        btn.innerHTML = '<span>✓ Aula Concluída</span>';
      }
      if (typeof showToast === 'function') showToast('Parabéns! Aula concluída com sucesso! 🍞');
      if (typeof playSoftClickSound === 'function') playSoftClickSound();
    }

    localStorage.setItem('pao_divino_video_completed', JSON.stringify([...videoState.completedLessons]));
  };

  /**
   * Compartilha os ingredientes da aula ativa no WhatsApp
   */
  window.shareVideoIngredientsWhatsApp = function () {
    const lesson = videoState.currentLesson;
    if (!lesson) return;

    let text = `🍞 *PÃO DIVINO - VÍDEO AULA: ${lesson.title.toUpperCase()}*\n`;
    text += `⏱️ *Tempo de Manuseio:* ${lesson.prepTime || '30 min'}\n`;
    text += `🔢 *Rendimento:* ${lesson.yield || '1 pão'}\n\n`;
    text += `📝 *LISTA DE INGREDIENTES:*\n`;

    (lesson.ingredientGroups || []).forEach(group => {
      text += `\n🔹 *${group.group}:*\n`;
      (group.ingredients || []).forEach(ing => {
        text += `• ${ing.amount ? ing.amount + ' - ' : ''}${ing.name}${ing.notes ? ' (' + ing.notes + ')' : ''}\n`;
      });
    });

    text += `\n✨ _Compartilhado do App Pão Divino_`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Helper para persistência de ingredientes checados por aula
  function getCheckedIngredients(lessonId) {
    const saved = localStorage.getItem(`pao_divino_video_checks_${lessonId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  }

  function saveCheckedIngredients(lessonId, set) {
    localStorage.setItem(`pao_divino_video_checks_${lessonId}`, JSON.stringify([...set]));
  }

  // ==========================================================================
  // LÓGICA DO PLAYER PROFISSIONAL DE VÍDEO
  // ==========================================================================
  function initPlayerEvents() {
    const video = document.getElementById('proVideoPlayer');
    const container = document.getElementById('proVideoContainer');
    const playPauseBtn = document.getElementById('proBtnPlayPause');
    const skipBackBtn = document.getElementById('proBtnSkipBack');
    const skipFwdBtn = document.getElementById('proBtnSkipFwd');
    const timelineWrap = document.getElementById('proTimelineWrap');
    const volumeBtn = document.getElementById('proBtnVolume');
    const volumeSlider = document.getElementById('proVolumeSlider');
    const speedBtn = document.getElementById('proBtnSpeed');
    const speedMenu = document.getElementById('proSpeedMenu');
    const pipBtn = document.getElementById('proBtnPip');
    const fullscreenBtn = document.getElementById('proBtnFullscreen');
    const centerFeedback = document.getElementById('proCenterFeedback');
    const spinner = document.getElementById('proPlayerSpinner');

    if (!video || !container) return;

    // 1. Play / Pause
    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    };

    video.addEventListener('click', togglePlay);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
      videoState.isPlaying = true;
      updatePlayPauseButton(true);
      showFeedback('play');
      requestWakeLock();
      startControlsHideTimer();
    });

    video.addEventListener('pause', () => {
      videoState.isPlaying = false;
      updatePlayPauseButton(false);
      showFeedback('pause');
      releaseWakeLock();
      showControls();
    });

    video.addEventListener('ended', () => {
      videoState.isPlaying = false;
      updatePlayPauseButton(false);
      showControls();
      // Sugere conclusão automática da aula
      if (videoState.currentLesson) {
        videoState.completedLessons.add(videoState.currentLesson.id);
        localStorage.setItem('pao_divino_video_completed', JSON.stringify([...videoState.completedLessons]));
        const btn = document.getElementById('btnToggleCompleted');
        if (btn) {
          btn.classList.add('completed');
          btn.innerHTML = '<span>✓ Aula Concluída</span>';
        }
      }
    });

    // 2. Buffering / Loading
    video.addEventListener('waiting', () => {
      if (spinner) spinner.style.display = 'block';
    });
    video.addEventListener('playing', () => {
      if (spinner) spinner.style.display = 'none';
    });
    video.addEventListener('canplay', () => {
      if (spinner) spinner.style.display = 'none';
    });

    // 3. Skip 10s
    if (skipBackBtn) {
      skipBackBtn.addEventListener('click', () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
        showFeedback('skipBack');
      });
    }

    if (skipFwdBtn) {
      skipFwdBtn.addEventListener('click', () => {
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        showFeedback('skipFwd');
      });
    }

    // 4. Atualização de Tempo e Timeline
    video.addEventListener('timeupdate', () => {
      updateTimelineProgress();
    });

    video.addEventListener('progress', () => {
      updateBufferProgress();
    });

    // 5. Interação com a Timeline (clique e arraste)
    let isDraggingTimeline = false;

    const seekToPosition = (e) => {
      if (!timelineWrap || !video.duration) return;
      const rect = timelineWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      video.currentTime = ratio * video.duration;
    };

    if (timelineWrap) {
      timelineWrap.addEventListener('mousedown', (e) => {
        isDraggingTimeline = true;
        seekToPosition(e);
      });

      document.addEventListener('mousemove', (e) => {
        if (isDraggingTimeline) {
          seekToPosition(e);
        }
      });

      document.addEventListener('mouseup', () => {
        isDraggingTimeline = false;
      });

      // Hover para mostrar o tempo na bolha flutuante
      const tooltip = document.getElementById('proTimeTooltip');
      timelineWrap.addEventListener('mousemove', (e) => {
        if (!tooltip || !video.duration) return;
        const rect = timelineWrap.getBoundingClientRect();
        const hoverX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, hoverX / rect.width));
        const hoverSecs = ratio * video.duration;
        tooltip.textContent = formatTime(hoverSecs);
        tooltip.style.left = `${hoverX}px`;
      });
    }

    // 6. Volume e Mudo
    if (volumeBtn) {
      volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateVolumeIcon();
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        video.volume = val;
        video.muted = (val === 0);
        updateVolumeIcon();
      });
    }

    function updateVolumeIcon() {
      if (!volumeBtn) return;
      if (video.muted || video.volume === 0) {
        volumeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
      } else if (video.volume < 0.5) {
        volumeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>';
      } else {
        volumeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
      }
    }

    // 7. Velocidade de Reprodução
    if (speedBtn && speedMenu) {
      speedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speedMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        speedMenu.classList.remove('show');
      });

      const speedOptions = speedMenu.querySelectorAll('.pro-speed-option');
      speedOptions.forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const speed = parseFloat(opt.dataset.speed);
          video.playbackRate = speed;
          speedBtn.textContent = `${speed}x`;
          speedOptions.forEach(o => o.classList.remove('active'));
          opt.classList.add('active');
          speedMenu.classList.remove('show');
          if (typeof showToast === 'function') {
            showToast(`Velocidade ajustada para ${speed}x`);
          }
        });
      });
    }

    // 8. Picture-in-Picture (PiP)
    if (pipBtn) {
      if ('pictureInPictureEnabled' in document) {
        pipBtn.addEventListener('click', async () => {
          try {
            if (document.pictureInPictureElement) {
              await document.exitPictureInPicture();
            } else {
              await video.requestPictureInPicture();
            }
          } catch (e) {
            console.warn('PiP indisponível:', e);
          }
        });
      } else {
        pipBtn.style.display = 'none';
      }
    }

    // 9. Fullscreen
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        toggleFullscreen(container, video);
      });
    }

    // 10. Duplo Toque Mobile (Esquerda -10s, Direita +10s)
    const touchLeft = document.getElementById('proTouchLeft');
    const touchRight = document.getElementById('proTouchRight');

    const handleDoubleTap = (side) => {
      const now = Date.now();
      if (videoState.lastTapSide === side && (now - videoState.lastTapTime) < 320) {
        // Duplo toque detectado
        if (side === 'left') {
          video.currentTime = Math.max(0, video.currentTime - 10);
          showTouchHint(touchLeft, '« 10s');
          showFeedback('skipBack');
        } else {
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
          showTouchHint(touchRight, '10s »');
          showFeedback('skipFwd');
        }
        videoState.lastTapTime = 0;
        videoState.lastTapSide = null;
      } else {
        videoState.lastTapTime = now;
        videoState.lastTapSide = side;
        // Alterna controles
        container.classList.toggle('controls-hidden');
      }
    };

    if (touchLeft) touchLeft.addEventListener('click', () => handleDoubleTap('left'));
    if (touchRight) touchRight.addEventListener('click', () => handleDoubleTap('right'));

    // 11. Auto-hide dos controles ao mover mouse
    container.addEventListener('mousemove', () => {
      showControls();
      if (videoState.isPlaying) {
        startControlsHideTimer();
      }
    });

    container.addEventListener('mouseleave', () => {
      if (videoState.isPlaying) {
        hideControls();
      }
    });

    // 12. Atalhos de Teclado
    document.addEventListener('keydown', (e) => {
      // Ignora se o foco estiver num input ou textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      const playerView = document.getElementById('videoAulaPlayerView');
      if (!playerView || playerView.classList.contains('hidden')) return;

      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10);
        showFeedback('skipBack');
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        showFeedback('skipFwd');
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen(container, video);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        video.muted = !video.muted;
        updateVolumeIcon();
      }
    });
  }

  function updatePlayPauseButton(isPlaying) {
    const btn = document.getElementById('proBtnPlayPause');
    if (!btn) return;
    if (isPlaying) {
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      btn.title = 'Pausar (Espaço)';
    } else {
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      btn.title = 'Reproduzir (Espaço)';
    }
  }

  function updateTimelineProgress() {
    const video = document.getElementById('proVideoPlayer');
    const progressBar = document.getElementById('proProgressBar');
    const thumb = document.getElementById('proThumb');
    const timeCurrent = document.getElementById('proTimeCurrent');
    const timeDuration = document.getElementById('proTimeDuration');

    if (!video) return;

    const current = video.currentTime || 0;
    const duration = video.duration || 0;
    const pct = duration > 0 ? (current / duration) * 100 : 0;

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (thumb) thumb.style.left = `${pct}%`;
    if (timeCurrent) timeCurrent.textContent = formatTime(current);
    if (timeDuration) timeDuration.textContent = formatTime(duration);
  }

  function updateBufferProgress() {
    const video = document.getElementById('proVideoPlayer');
    const bufferBar = document.getElementById('proBufferBar');
    if (!video || !bufferBar || !video.duration) return;

    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const pct = (bufferedEnd / video.duration) * 100;
      bufferBar.style.width = `${pct}%`;
    }
  }

  function showFeedback(type) {
    const feedback = document.getElementById('proCenterFeedback');
    if (!feedback) return;

    let iconSvg = '';
    if (type === 'play') {
      iconSvg = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    } else if (type === 'pause') {
      iconSvg = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    } else if (type === 'skipBack') {
      iconSvg = '<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
    } else if (type === 'skipFwd') {
      iconSvg = '<svg viewBox="0 0 24 24"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/></svg>';
    }

    feedback.innerHTML = iconSvg;
    feedback.classList.add('active');

    setTimeout(() => {
      feedback.classList.remove('active');
    }, 450);
  }

  function showTouchHint(element, text) {
    if (!element) return;
    const hint = element.querySelector('.pro-player-touch-hint');
    if (hint) {
      hint.textContent = text;
      hint.style.opacity = '1';
      setTimeout(() => { hint.style.opacity = '0'; }, 550);
    }
  }

  function showControls() {
    const container = document.getElementById('proVideoContainer');
    if (container) container.classList.remove('controls-hidden');
  }

  function hideControls() {
    const container = document.getElementById('proVideoContainer');
    if (container) container.classList.add('controls-hidden');
  }

  function startControlsHideTimer() {
    clearTimeout(videoState.controlsTimeout);
    videoState.controlsTimeout = setTimeout(() => {
      if (videoState.isPlaying) {
        hideControls();
      }
    }, 2600);
  }

  function toggleFullscreen(container, video) {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const m = String(mins).padStart(2, '0');
    const s = String(secs).padStart(2, '0');

    if (hrs > 0) {
      return `${hrs}:${m}:${s}`;
    }
    return `${m}:${s}`;
  }

  // WakeLock: impede que a tela desligue enquanto o vídeo estiver rodando
  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator && !videoState.wakeLock) {
        videoState.wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (e) {
      // Ignora silenciosamente se o dispositivo não permitir
    }
  }

  function releaseWakeLock() {
    if (videoState.wakeLock) {
      videoState.wakeLock.release().catch(() => {});
      videoState.wakeLock = null;
    }
  }

})();
