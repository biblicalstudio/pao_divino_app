/**
 * PÃO DIVINO - Paywall & Controle de Acesso Pix
 * Bloqueio de degustação após 15 minutos e liberação via Pix ou código de ativação.
 */

(function () {
  'use strict';

  // Configurações do Bloqueio & Pix
  const CONFIG = {
    trialMinutes: 1440, // Duração da degustação gratuita (15 minutos)
    pixKey: '61991168629',
    supportPhone: '(61) 99116–8629',
    whatsappNumber: '5561991168629',
    // whatsappMessage: 'Olá! Fiz o pagamento via Pix e gostaria de enviar o comprovante para liberar meu acesso vitalício ao Pão Divino.',
    validCodes: ['PAGO445', 'PAGO', 'PAODIVINO', 'LIBERADO'],
    storageKeys: {
      unlocked: 'pao_divino_unlocked',
      firstVisit: 'pao_divino_first_visit'
    }
  };

  let trialTimeoutId = null;
  let isModalOpen = false;

  // ==========================================================================
  // ESTADO DE ACESSO
  // ==========================================================================

  function isUnlocked() {
    return localStorage.getItem(CONFIG.storageKeys.unlocked) === 'true';
  }

  function getFirstVisitTime() {
    let visit = localStorage.getItem(CONFIG.storageKeys.firstVisit);
    if (!visit) {
      visit = Date.now().toString();
      localStorage.setItem(CONFIG.storageKeys.firstVisit, visit);
    }
    return parseInt(visit, 10);
  }

  function getRemainingSeconds() {
    if (isUnlocked()) return Infinity;
    const elapsedMs = Date.now() - getFirstVisitTime();
    const totalMs = CONFIG.trialMinutes * 60 * 1000;
    const remainingMs = totalMs - elapsedMs;
    return Math.max(0, Math.floor(remainingMs / 1000));
  }

  function isTrialExpired() {
    if (isUnlocked()) return false;
    return getRemainingSeconds() <= 0;
  }

  // ==========================================================================
  // ATIVAÇÃO / DESBLOQUEIO
  // ==========================================================================

  function unlockAccess(source = 'manual') {
    localStorage.setItem(CONFIG.storageKeys.unlocked, 'true');
    if (trialTimeoutId) {
      clearTimeout(trialTimeoutId);
      trialTimeoutId = null;
    }
    closePaywallModal();

    // Notificação Toast
    showToastNotification('🎉 Acesso Vitalício Liberado com Sucesso! Bem-vindo(a) ao Pão Divino!');

    console.log(`[Paywall] Acesso vitalício liberado (${source}).`);
  }

  function checkUrlActivation() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = (
        urlParams.get('code') ||
        urlParams.get('codigo') ||
        urlParams.get('senha') ||
        urlParams.get('pago') ||
        ''
      ).trim().toUpperCase();

      if (codeParam) {
        const isValid = CONFIG.validCodes.some(validCode =>
          codeParam === validCode || codeParam.startsWith('PAGO')
        );

        if (isValid) {
          unlockAccess('link_url');
          // Limpa o parâmetro da URL mantendo a navegação limpa
          const cleanUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, cleanUrl);
          return true;
        }
      }
    } catch (e) {
      console.warn('[Paywall] Erro ao verificar código da URL:', e);
    }
    return false;
  }

  // ==========================================================================
  // MODAL UI CONTROL
  // ==========================================================================

  function openPaywallModal() {
    const backdrop = document.getElementById('paywallModalBackdrop');
    const card = document.getElementById('paywallModalCard');
    if (!backdrop) return;

    // Se já estiver aberto, aplica animação de destaque (shake)
    if (isModalOpen) {
      if (card) {
        card.classList.remove('shake-card');
        void card.offsetWidth; // Força reflow para reiniciar animação
        card.classList.add('shake-card');
      }
      return;
    }

    backdrop.style.display = 'flex';
    document.body.classList.add('paywall-modal-locked');
    isModalOpen = true;

    // Se houver algum modal de receita ou timer aberto, fecha para evitar sobreposição
    if (typeof closeRecipeModal === 'function') {
      try { closeRecipeModal(); } catch (e) { }
    }
    if (typeof closeTimerModal === 'function') {
      try { closeTimerModal(); } catch (e) { }
    }
  }

  function closePaywallModal() {
    const backdrop = document.getElementById('paywallModalBackdrop');
    if (backdrop) {
      backdrop.style.display = 'none';
    }
    document.body.classList.remove('paywall-modal-locked');
    isModalOpen = false;

    // Limpa feedback do input
    const feedback = document.getElementById('paywallFeedback');
    if (feedback) {
      feedback.style.display = 'none';
      feedback.textContent = '';
    }
  }

  // ==========================================================================
  // VALIDAÇÃO MANUAL DO CÓDIGO NO POPUP
  // ==========================================================================

  window.paywallValidateManualCode = function () {
    const input = document.getElementById('paywallCodeInput');
    const feedback = document.getElementById('paywallFeedback');
    const btn = document.getElementById('paywallBtnUnlock');
    if (!input || !feedback) return;

    const entered = input.value.trim().toUpperCase();

    if (!entered) {
      feedback.textContent = 'Por favor, digite o código de ativação.';
      feedback.className = 'paywall-feedback error';
      feedback.style.display = 'block';
      input.focus();
      return;
    }

    const isValid = CONFIG.validCodes.some(code => entered === code || entered.startsWith('PAGO'));

    if (isValid) {
      feedback.textContent = '✓ Código confirmado! Liberando acesso...';
      feedback.className = 'paywall-feedback success';
      feedback.style.display = 'block';
      if (btn) btn.disabled = true;

      setTimeout(() => {
        unlockAccess('modal_input');
        if (btn) btn.disabled = false;
        input.value = '';
      }, 700);
    } else {
      feedback.textContent = 'Código incorreto. Envie o comprovante no suporte para receber sua liberação.';
      feedback.className = 'paywall-feedback error';
      feedback.style.display = 'block';
      input.classList.remove('input-shake');
      void input.offsetWidth;
      input.classList.add('input-shake');
      input.focus();
    }
  };

  // ==========================================================================
  // COPIAR CHAVE PIX
  // ==========================================================================

  window.paywallCopyPix = function () {
    const pixText = CONFIG.pixKey;
    const btn = document.getElementById('paywallCopyPixBtn');
    const btnText = document.getElementById('paywallCopyPixText');

    function notifyCopied() {
      if (btn && btnText) {
        btn.classList.add('copied');
        btnText.textContent = 'Copiado!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btnText.textContent = 'Copiar Chave';
        }, 2200);
      }
      showToastNotification('📋 Chave Pix copiada para a área de transferência!');
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pixText)
        .then(notifyCopied)
        .catch(() => fallbackCopy(pixText, notifyCopied));
    } else {
      fallbackCopy(pixText, notifyCopied);
    }
  };

  function fallbackCopy(text, callback) {
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      callback();
    } catch (err) {
      alert('Chave Pix: ' + text);
    }
    document.body.removeChild(input);
  }

  window.paywallCloseModal = function () {
    closePaywallModal();
  };

  // ==========================================================================
  // INTERCEPTAÇÃO GLOBAL DE CLIQUES APÓS OS 15 MINUTOS
  // ==========================================================================

  function setupClickInterceptor() {
    // Escuta na fase de captura (capture = true) para interceptar antes de qualquer outro handler
    document.addEventListener('click', function (e) {
      // Se já está desbloqueado, permite tudo normalmente
      if (isUnlocked()) return;

      // Se ainda estiver dentro dos 15 minutos, permite navegação livre
      if (!isTrialExpired()) return;

      // Se o clique ocorreu dentro do próprio modal do Paywall, deixa interagir normalmente
      if (e.target.closest('#paywallModalBackdrop')) {
        return;
      }

      // Se expirou e clicou em qualquer botão, link, card ou elemento interativo da página:
      // Bloqueia a ação e abre o popup de pagamento!
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      openPaywallModal();
    }, true);
  }

  // ==========================================================================
  // CONTROLE DO TIMER DOS 15 MINUTOS
  // ==========================================================================

  function initTrialTimer() {
    if (isUnlocked()) {
      return;
    }

    const remainingSec = getRemainingSeconds();

    if (remainingSec <= 0) {
      // Já expirou! Abre o popup de bloqueio
      console.log('[Paywall] Tempo de 15 minutos expirado. Bloqueando acesso.');
      openPaywallModal();
    } else {
      console.log(`[Paywall] Degustação ativa: ${Math.floor(remainingSec / 60)}m ${remainingSec % 60}s restantes.`);
      // Agenda o bloqueio para exatamente o momento em que os 15 minutos baterem
      trialTimeoutId = setTimeout(() => {
        console.log('[Paywall] 15 minutos concluídos. Ativando bloqueio.');
        openPaywallModal();
      }, remainingSec * 1000);
    }
  }

  // Toast Helper
  function showToastNotification(msg) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3500);
  }

  // ==========================================================================
  // INICIALIZAÇÃO
  // ==========================================================================

  function init() {
    // 1. Verifica se veio com código no link (?code=PAGO445 ou ?code=PAGO)
    const justUnlocked = checkUrlActivation();

    // 2. Configura a interceptação de cliques
    setupClickInterceptor();

    // 3. Inicia contagem regressiva se não foi desbloqueado
    if (!justUnlocked && !isUnlocked()) {
      getFirstVisitTime(); // Garante registro do primeiro acesso
      initTrialTimer();
    }
  }

  // Aguarda DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ==========================================================================
  // FERRAMENTAS DE TESTE NO CONSOLE (DEVELOPER SHORTCUTS)
  // ==========================================================================
  window.paywall = {
    unlock: () => unlockAccess('console'),
    lock: () => {
      localStorage.removeItem(CONFIG.storageKeys.unlocked);
      localStorage.setItem(CONFIG.storageKeys.firstVisit, (Date.now() - (CONFIG.trialMinutes * 60 * 1000 + 5000)).toString());
      openPaywallModal();
      console.log('[Paywall] Bloqueio ativado para teste.');
    },
    reset: () => {
      localStorage.removeItem(CONFIG.storageKeys.unlocked);
      localStorage.setItem(CONFIG.storageKeys.firstVisit, Date.now().toString());
      closePaywallModal();
      if (trialTimeoutId) clearTimeout(trialTimeoutId);
      initTrialTimer();
      console.log('[Paywall] Degustação reiniciada para 15 minutos.');
    },
    status: () => {
      const unlocked = isUnlocked();
      const remaining = getRemainingSeconds();
      console.table({
        'Acesso Desbloqueado': unlocked ? 'SIM (Vitalício)' : 'NÃO',
        'Tempo Restante': unlocked ? 'Ilimitado' : `${Math.floor(remaining / 60)}m ${remaining % 60}s`,
        'Status do Bloqueio': isTrialExpired() ? 'BLOQUEADO' : 'LIBERADO (Degustação)'
      });
    }
  };

})();
