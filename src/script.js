/* eslint-disable no-undef */
function script(duration, isActive) {
  if (!isActive) {
    if (!Array.isArray(window.timers)) window.timers = [];
    setTimeout(() => {
      const buttons = document.querySelectorAll('[aria-label^="Invite"]');
      chrome.storage.local.set({ timer: buttons.length });
      buttons.forEach((btn, idx) => {
        const button = btn;
        window.timers.push(setTimeout(() => {
          button.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          button.setAttribute('aria-label', 'dont choose me again please!');
          button.style.backgroundColor = 'green';
        }, duration * 1000 * (idx + 1)));
      });
    }, 200);
  } else {
    window.timers.forEach(clearTimeout);
    window.timers.length = 0;
  }
}

export default script;
