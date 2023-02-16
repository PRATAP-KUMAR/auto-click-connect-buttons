const Logic = () => {
    let buttons = document.querySelectorAll('[aria-label^="Invite"]');
    if (buttons.length) {
        buttons.forEach((btn, idx) => {
            setTimeout(() => {
                btn.remove();
            }, 5000 * (idx + 1));
        })
    } else {
        alert('No buttons found');
    }
}

export default Logic;