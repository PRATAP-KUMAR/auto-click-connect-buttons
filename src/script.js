/* eslint-disable no-undef */
function script(duration) {
  setTimeout(() => {
    const buttons = document.querySelectorAll('[aria-label^="Invite"]');
    chrome.storage.local.set({ timer: buttons.length });
    buttons.forEach((btn, idx) => {
      setTimeout(() => {
        const button = btn;
        button.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        button.style.backgroundColor = 'red';
      }, duration * 1000 * (idx + 1));
    });
  }, 200);
}

export default script;
