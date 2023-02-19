/* eslint-disable no-undef */
function script(duration) {
  const buttons = document.querySelectorAll('[aria-label^="Invite"]');
  chrome.storage.sync.set({ timer: buttons.length })

  buttons.forEach((btn, idx) => {
    setTimeout(() => {
      const button = btn;
      button.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      button.style.backgroundColor = 'red';
    }, duration * 1000 * (idx + 1));
  });
}

export default script;
