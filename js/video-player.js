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
    lastTapSide: null,
    segments: []
  };

  /**
   * Converte marcação de tempo ("MM:SS", "HH:MM:SS" ou segundos numéricos) para segundos
   */
  function parseTimeToSeconds(val) {
    if (val === undefined || val === null || val === '') return null;
    if (typeof val === 'number') return isNaN(val) ? null : Math.max(0, val);
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (!trimmed) return null;
      if (!trimmed.includes(':') && !isNaN(Number(trimmed))) {
        return Math.max(0, Number(trimmed));
      }
      const parts = trimmed.split(':').map(Number);
      if (parts.some(isNaN)) return null;
      if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
      } else if (parts.length === 1) {
        return parts[0];
      }
    }
    return null;
  }

  /**
   * Extrai os trechos (cortes) definidos para uma aula.
   * Suporta:
   * 1. Array "segments": [ { start: "00:00", end: "00:30" }, { start: "02:10", end: "04:35" } ]
   * 2. Propriedades numeradas: start1, end1, start2, end2, start3, end3...
   * 3. Propriedades simples: start, end
   */
  function getLessonSegments(lesson) {
    if (!lesson) return [];

    // 1. Array segments explícito
    if (Array.isArray(lesson.segments) && lesson.segments.length > 0) {
      const segs = [];
      lesson.segments.forEach(s => {
        const start = parseTimeToSeconds(s.start);
        const end = parseTimeToSeconds(s.end);
        if (start !== null && end !== null && end > start) {
          segs.push({ start, end, duration: end - start });
        }
      });
      if (segs.length > 0) return segs;
    }

    // 2. Propriedades numeradas: start1/end1, start2/end2, start3/end3...
    const numberedSegs = [];
    let idx = 1;
    while (lesson[`start${idx}`] !== undefined || lesson[`end${idx}`] !== undefined) {
      const start = parseTimeToSeconds(lesson[`start${idx}`]);
      const end = parseTimeToSeconds(lesson[`end${idx}`]);
      if (start !== null && end !== null && end > start) {
        numberedSegs.push({ start, end, duration: end - start });
      }
      idx++;
    }
    if (numberedSegs.length > 0) return numberedSegs;

    // 3. start e end simples
    const start = parseTimeToSeconds(lesson.start);
    const end = parseTimeToSeconds(lesson.end);
    if (start !== null || end !== null) {
      const s = start !== null ? start : 0;
      const e = end !== null ? end : null;
      return [{ start: s, end: e, duration: e !== null ? Math.max(0.1, e - s) : null }];
    }

    return [];
  }

  /**
   * Resolve os trechos ativos do vídeo atual com cálculos de tempo virtual
   */
  function getResolvedSegments() {
    const video = document.getElementById('proVideoPlayer');
    const videoDuration = (video && !isNaN(video.duration) && video.duration > 0) ? video.duration : 0;

    let rawSegments = (videoState.segments && videoState.segments.length > 0)
      ? videoState.segments.map(s => ({ ...s }))
      : (videoState.currentLesson ? getLessonSegments(videoState.currentLesson) : []);

    let segments = [];
    if (rawSegments.length === 0) {
      segments = [{ start: 0, end: videoDuration, duration: videoDuration }];
    } else {
      rawSegments.forEach(seg => {
        const s = Math.max(0, seg.start || 0);
        let e = seg.end;
        if (e === null || e === undefined || isNaN(e) || (videoDuration > 0 && e > videoDuration)) {
          e = videoDuration > s ? videoDuration : s + 1;
        }
        if (e > s) {
          segments.push({ start: s, end: e, duration: Math.max(0.1, e - s) });
        }
      });
      if (segments.length === 0) {
        segments = [{ start: 0, end: videoDuration, duration: videoDuration }];
      }
    }

    // Calcula tempos cumulativos
    let cum = 0;
    segments.forEach(seg => {
      seg.cumStart = cum;
      cum += seg.duration;
      seg.cumEnd = cum;
    });

    const totalVirtualDuration = Math.max(0.1, cum);
    return { segments, totalVirtualDuration, videoDuration };
  }

  /**
   * Converte o tempo real do vídeo (video.currentTime) para o tempo virtual (00:00 até total)
   */
  function realToVirtual(realTime, resolved) {
    const res = resolved || getResolvedSegments();
    const { segments, totalVirtualDuration } = res;
    if (!segments.length) return 0;

    if (realTime <= segments[0].start) return 0;

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (realTime >= seg.start && realTime <= seg.end) {
        return seg.cumStart + (realTime - seg.start);
      }
      // Se estiver no intervalo cortado entre dois trechos
      if (i < segments.length - 1 && realTime > seg.end && realTime < segments[i + 1].start) {
        return seg.cumEnd;
      }
    }

    return totalVirtualDuration;
  }

  /**
   * Converte tempo virtual da barra para o ponto real do vídeo
   */
  function virtualToReal(virtualTime, resolved) {
    const res = resolved || getResolvedSegments();
    const { segments, totalVirtualDuration } = res;
    if (!segments.length) return 0;

    const clampedV = Math.max(0, Math.min(totalVirtualDuration, virtualTime));

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (clampedV >= seg.cumStart && clampedV <= seg.cumEnd) {
        const offset = clampedV - seg.cumStart;
        return seg.start + offset;
      }
    }

    return segments[segments.length - 1].end;
  }

  /**
   * Retorna a duração líquida da aula (soma de todos os trechos) formatada como MM:SS
   */
  function getLessonDurationFormatted(lesson) {
    if (!lesson) return '30 min';
    const segs = getLessonSegments(lesson);
    if (segs.length > 0) {
      let total = 0;
      segs.forEach(s => {
        if (s.duration) total += s.duration;
      });
      if (total > 0) return formatTime(total);
    }
    return lesson.prepTime || '30 min';
  }

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
                <span>${getLessonDurationFormatted(lesson)}</span>
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
    videoState.segments = getLessonSegments(lesson);

    const catalogView = document.getElementById('videoAulasCatalog');
    const playerView = document.getElementById('videoAulaPlayerView');
    const videoEl = document.getElementById('proVideoPlayer');

    if (catalogView) catalogView.classList.add('hidden');
    if (playerView) playerView.classList.remove('hidden');

    // Configura o vídeo para início imediato com streaming progressivo
    if (videoEl) {
      // Usa encodeURI para suportar acentos ou espaços no nome do arquivo
      const videoSrc = encodeURI(lesson.videoPath);
      const isDifferentSrc = videoEl.getAttribute('data-current-src') !== videoSrc;

      const applyStartTime = () => {
        const segs = videoState.segments;
        const initialStart = segs && segs.length > 0 ? segs[0].start : 0;
        try {
          if (Math.abs(videoEl.currentTime - initialStart) > 0.3) {
            videoEl.currentTime = initialStart;
          }
        } catch (e) {
          console.warn('[Video] Erro ao aplicar tempo de início:', e);
        }
        updateTimelineProgress();
      };

      if (isDifferentSrc) {
        videoEl.setAttribute('data-current-src', videoSrc);
        videoEl.src = videoSrc;

        const onLoaded = () => {
          applyStartTime();
          videoEl.removeEventListener('loadedmetadata', onLoaded);
        };
        videoEl.addEventListener('loadedmetadata', onLoaded);
      } else {
        applyStartTime();
      }

      if (autoPlay) {
        // Inicia a reprodução imediata assim que os primeiros bytes chegarem
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            const onCanPlay = () => {
              applyStartTime();
              videoEl.play().catch(() => updatePlayPauseButton(false));
              videoEl.removeEventListener('canplay', onCanPlay);
            };
            videoEl.addEventListener('canplay', onCanPlay);
            updatePlayPauseButton(false);
          });
        }
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
            <span class="lesson-chip-badge" style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); color: #fbbf24;">⏱️ ${getLessonDurationFormatted(lesson)}</span>
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

    const bigPlayBtn = document.getElementById('proBigPlayBtn');
    const errorOverlay = document.getElementById('proPlayerError');

    // 1. Play / Pause
    const togglePlay = () => {
      if (errorOverlay) errorOverlay.style.display = 'none';
      if (video.paused || video.ended) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('[Video] Play bloqueado pelo navegador:', err);
            updatePlayPauseButton(false);
          });
        }
      } else {
        video.pause();
      }
    };

    video.addEventListener('click', togglePlay);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
    if (bigPlayBtn) bigPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    // Tratamento de Erro do Vídeo
    video.addEventListener('error', () => {
      console.error('[Video Error]:', video.error);
      if (spinner) spinner.style.display = 'none';
      if (errorOverlay) {
        errorOverlay.style.display = 'flex';
        const msg = document.getElementById('proPlayerErrorMsg');
        if (msg && video.error) {
          msg.textContent = 'Não foi possível carregar a aula. Toque para tentar novamente.';
        }
      }
    });

    video.addEventListener('play', () => {
      videoState.isPlaying = true;
      container.classList.add('is-playing');
      if (errorOverlay) errorOverlay.style.display = 'none';
      updatePlayPauseButton(true);
      showFeedback('play');
      requestWakeLock();
      startControlsHideTimer();
    });

    video.addEventListener('pause', () => {
      videoState.isPlaying = false;
      container.classList.remove('is-playing');
      updatePlayPauseButton(false);
      showFeedback('pause');
      releaseWakeLock();
      showControls();
    });

    video.addEventListener('ended', () => {
      videoState.isPlaying = false;
      container.classList.remove('is-playing');
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

    // 3. Skip 10s navegando no tempo virtual dos trechos
    if (skipBackBtn) {
      skipBackBtn.addEventListener('click', () => {
        const res = getResolvedSegments();
        const curV = realToVirtual(video.currentTime || 0, res);
        const targetV = Math.max(0, curV - 10);
        video.currentTime = virtualToReal(targetV, res);
        showFeedback('skipBack');
        updateTimelineProgress();
      });
    }

    if (skipFwdBtn) {
      skipFwdBtn.addEventListener('click', () => {
        const res = getResolvedSegments();
        const curV = realToVirtual(video.currentTime || 0, res);
        const targetV = Math.min(res.totalVirtualDuration, curV + 10);
        video.currentTime = virtualToReal(targetV, res);
        showFeedback('skipFwd');
        updateTimelineProgress();
      });
    }

    // 4. Atualização de Tempo e Timeline com salto automático entre cortes
    video.addEventListener('timeupdate', () => {
      const res = getResolvedSegments();
      const { segments } = res;
      const realTime = video.currentTime || 0;

      // Se estiver antes do primeiro corte, avança para o início dele
      if (segments.length > 0 && realTime < segments[0].start - 0.3) {
        video.currentTime = segments[0].start;
        updateTimelineProgress();
        return;
      }

      // Verifica se atingiu o fim de algum trecho
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        if (realTime >= seg.end) {
          if (i < segments.length - 1) {
            // PULA IMEDIATAMENTE PARA O INÍCIO DO PRÓXIMO TRECHO!
            video.currentTime = segments[i + 1].start;
            updateTimelineProgress();
            return;
          } else {
            // Fim do último corte da aula: pausa e conclui
            video.pause();
            video.currentTime = seg.end;
            videoState.isPlaying = false;
            container.classList.remove('is-playing');
            updatePlayPauseButton(false);
            showControls();

            if (videoState.currentLesson) {
              videoState.completedLessons.add(videoState.currentLesson.id);
              localStorage.setItem('pao_divino_video_completed', JSON.stringify([...videoState.completedLessons]));
              const btn = document.getElementById('btnToggleCompleted');
              if (btn) {
                btn.classList.add('completed');
                btn.innerHTML = '<span>✓ Aula Concluída</span>';
              }
            }
            updateTimelineProgress();
            return;
          }
        }
      }

      updateTimelineProgress();
    });

    video.addEventListener('progress', () => {
      updateBufferProgress();
    });

    // 5. Interação com a Timeline (clique e arraste virtual)
    let isDraggingTimeline = false;

    const seekToPosition = (e) => {
      if (!timelineWrap) return;
      const res = getResolvedSegments();
      const rect = timelineWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const targetVirtual = ratio * res.totalVirtualDuration;
      video.currentTime = virtualToReal(targetVirtual, res);
      updateTimelineProgress();
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

      // Hover para mostrar o tempo na bolha flutuante (iniciando em 00:00)
      const tooltip = document.getElementById('proTimeTooltip');
      timelineWrap.addEventListener('mousemove', (e) => {
        if (!tooltip) return;
        const res = getResolvedSegments();
        const rect = timelineWrap.getBoundingClientRect();
        const hoverX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, hoverX / rect.width));
        const hoverRelativeSecs = ratio * res.totalVirtualDuration;
        tooltip.textContent = formatTime(hoverRelativeSecs);
        tooltip.style.left = `${hoverX}px`;
      });
    }

    // 6. Controle de Volume Suspenso (Abre para Cima)
    const volumeWrap = document.getElementById('proVolumeWrap');
    const volumePopover = document.getElementById('proVolumePopover');
    const volumeValue = document.getElementById('proVolumeValue');

    if (volumeBtn && volumePopover) {
      volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willShow = !volumePopover.classList.contains('show');
        volumePopover.classList.toggle('show');
        if (speedMenu) speedMenu.classList.remove('show');
      });

      // Fechamento ao clicar fora
      document.addEventListener('click', (e) => {
        if (volumeWrap && !volumeWrap.contains(e.target)) {
          volumePopover.classList.remove('show');
        }
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        video.volume = val;
        video.muted = (val === 0);
        if (volumeValue) {
          volumeValue.textContent = `${Math.round(val * 100)}%`;
        }
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

    // 10. Função para tentar recarregar o vídeo em caso de instabilidade
    window.retryCurrentVideo = function () {
      const errorOverlay = document.getElementById('proPlayerError');
      const spinner = document.getElementById('proPlayerSpinner');
      const video = document.getElementById('proVideoPlayer');
      if (errorOverlay) errorOverlay.style.display = 'none';
      if (spinner) spinner.style.display = 'block';

      if (video && videoState.currentLesson) {
        const videoSrc = encodeURI(videoState.currentLesson.videoPath);
        video.setAttribute('data-current-src', videoSrc);
        video.src = videoSrc;
        const onLoaded = () => {
          const segs = videoState.segments;
          const initialStart = segs && segs.length > 0 ? segs[0].start : 0;
          if (initialStart > 0) {
            try { video.currentTime = initialStart; } catch (e) {}
          }
          video.play().catch(() => updatePlayPauseButton(false));
          video.removeEventListener('loadedmetadata', onLoaded);
        };
        video.addEventListener('loadedmetadata', onLoaded);
      }
    };

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
        const res = getResolvedSegments();
        const curV = realToVirtual(video.currentTime || 0, res);
        const targetV = Math.max(0, curV - 10);
        video.currentTime = virtualToReal(targetV, res);
        showFeedback('skipBack');
        updateTimelineProgress();
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        const res = getResolvedSegments();
        const curV = realToVirtual(video.currentTime || 0, res);
        const targetV = Math.min(res.totalVirtualDuration, curV + 10);
        video.currentTime = virtualToReal(targetV, res);
        showFeedback('skipFwd');
        updateTimelineProgress();
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

    const res = getResolvedSegments();
    const currentV = realToVirtual(video.currentTime || 0, res);
    const totalV = res.totalVirtualDuration;
    const pct = Math.max(0, Math.min(100, (currentV / totalV) * 100));

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (thumb) thumb.style.left = `${pct}%`;
    if (timeCurrent) timeCurrent.textContent = formatTime(currentV);
    if (timeDuration) timeDuration.textContent = formatTime(totalV);
  }

  function updateBufferProgress() {
    const video = document.getElementById('proVideoPlayer');
    const bufferBar = document.getElementById('proBufferBar');
    if (!video || !bufferBar) return;

    const res = getResolvedSegments();
    if (video.buffered && video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const bufferedV = realToVirtual(bufferedEnd, res);
      const pct = Math.max(0, Math.min(100, (bufferedV / res.totalVirtualDuration) * 100));
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
