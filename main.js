js
(() => {  class="hljs-keyword">const modalButtons = document.querySelectorAll("[data-modal]");  class="hljs-keyword">const modals = document.querySelectorAll(".modal");  class="hljs-keyword">const closeButtons = document.querySelectorAll(".modal__close");
  class="hljs-keyword">const FOCUSABLE =
    class="hljs-string">'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  class="hljs-keyword">let lastFocused = class="hljs-keyword">null;
  class="hljs-keyword">let openCount = 0;
  class="hljs-keyword">function openModal(id) {    class="hljs-keyword">const modal = document.getElementById(id);    class="hljs-keyword">if (!modal) class="hljs-keyword">return;
    lastFocused = document.activeElement;    modal.classList.add("is-open");    modal.setAttribute("aria-hidden", "class="hljs-keyword">false");
    openCount++;    document.body.classList.add("modal-open");
    class="hljs-keyword">const first = modal.querySelector(FOCUSABLE);    (first || modal).focus?.();  }
  class="hljs-keyword">function closeModal(modal) {    class="hljs-keyword">if (!modal || !modal.classList.contains("is-open")) class="hljs-keyword">return;
    modal.classList.remove("is-open");    modal.setAttribute("aria-hidden", "class="hljs-keyword">true");
    openCount = Math.max(0, openCount - 1);    class="hljs-keyword">if (openCount === 0) document.body.classList.remove("modal-open");

    lastFocused?.focus?.();    lastFocused = class="hljs-keyword">null;  }
  modalButtons.forEach((btn) => {    btn.addEventListener("click", () => openModal(btn.dataset.modal));  });
  closeButtons.forEach((btn) => {    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));  });
  modals.forEach((modal) => {
    // клик по подложке    modal.addEventListener("click", (e) => {      class="hljs-keyword">if (e.target === modal) closeModal(modal);    });
  });
  document.addEventListener("keydown", (e) => {    class="hljs-keyword">const openModals = [...modals].filter((m) => m.classList.contains("is-open"));
    class="hljs-keyword">if (!openModals.length) class="hljs-keyword">return;

    class="hljs-keyword">if (e.key === "Escape") {      openModals.forEach(closeModal);      class="hljs-keyword">return;    }

    class="hljs-keyword">if (e.key === "Tab") {      class="hljs-keyword">const modal = openModals[openModals.length - 1];      class="hljs-keyword">const items = [...modal.querySelectorAll(FOCUSABLE)].filter(        (el) => el.offsetParent !== class="hljs-keyword">null      );
      class="hljs-keyword">if (!items.length) class="hljs-keyword">return;
      class="hljs-keyword">const first = items[0];      class="hljs-keyword">const last = items[items.length - 1];
      class="hljs-keyword">if (e.shiftKey && document.activeElement === first) {        e.preventDefault();        last.focus();      } class="hljs-keyword">else class="hljs-keyword">if (!e.shiftKey && document.activeElement === last) {        e.preventDefault();        first.focus();
      }    }  });
})();
