const showButton = document.getElementById('showHelp');
const favDialog = document.getElementById('helpDialog');

showButton.addEventListener('click', () => {
    favDialog.showModal();
});