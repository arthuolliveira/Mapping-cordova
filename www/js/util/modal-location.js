// js/modal-location.js
window.LocationModal = (function () {
  let modalEl = null;
  let onAllow = null;
  let onDeny = null;

  // injeta o HTML do componente (fetch do arquivo)
  async function injectIfNeeded() {
    if (modalEl) return modalEl;
    try {
      const resp = await fetch('components/location-modal.html');
      const html = await resp.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      // move estilos e markup para body
      const fragment = document.createDocumentFragment();
      while (wrapper.firstChild) fragment.appendChild(wrapper.firstChild);
      document.body.appendChild(fragment);
      modalEl = document.getElementById('location-modal');
      attachHandlers();
      return modalEl;
    } catch (err) {
      console.error('Erro ao carregar modal:', err);
      return null;
    }
  }

  function attachHandlers() {
    if (!modalEl) return;
    const allowBtn = modalEl.querySelector('#allow-location');
    const denyBtn = modalEl.querySelector('#deny-location');

    allowBtn.addEventListener('click', () => {
      close();
      if (typeof onAllow === 'function') onAllow();
    });

    denyBtn.addEventListener('click', () => {
      close();
      if (typeof onDeny === 'function') onDeny();
    });
  }

  function open(opts = {}) {
    onAllow = opts.onAllow;
    onDeny = opts.onDeny;
    if (!modalEl) {
      // injetar e depois abrir
      return injectIfNeeded().then(() => {
        if (modalEl) modalEl.setAttribute('aria-hidden', 'false');
      });
    }
    modalEl.setAttribute('aria-hidden', 'false');
    return Promise.resolve();
  }

  function close() {
    if (!modalEl) return;
    modalEl.setAttribute('aria-hidden', 'true');
  }

  // API pública
  return {
    injectIfNeeded,
    open,    // open({ onAllow: fn, onDeny: fn })
    close,
  };
})();
