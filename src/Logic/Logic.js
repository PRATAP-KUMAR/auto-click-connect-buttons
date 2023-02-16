const Logic = () => {
    // let connectButtons = document.getElementsByTagName('button');
    let buttons = document.querySelector('[aria-label^="Invite"]')
    Array.from(buttons).forEach((e) => {
        console.log(e);
        alert(e);
    })
}

export default Logic;