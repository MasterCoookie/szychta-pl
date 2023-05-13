const searchButton = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const filteredOffers = document.getElementById('filteredOffers');

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(searchForm);

    request.open('post', '/offers/filtered');
    request.send(formData);
    request.onload = () => {
        filteredOffers.innerHTML = request.responseText;
    }
});