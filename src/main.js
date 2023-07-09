const toggleModeButton = document.getElementById('toggleModeButton');
const body = document.body;
let isNightMode = false;

toggleModeButton.addEventListener('click', () => {
    if (isNightMode) {
        body.classList.remove('night-mode');
        toggleModeButton.src = "/multimedia/img/day-mode.svg";
        isNightMode = false;
    } else {
        body.classList.add('night-mode');
        toggleModeButton.src = "/multimedia/img/night-mode.svg";
        isNightMode = true;
    }
});