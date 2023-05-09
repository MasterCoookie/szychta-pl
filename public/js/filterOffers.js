const searchButton = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const filteredOffers = document.getElementById('filteredOffers');

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(searchForm);

    console.log(formData);
    request.open('post', '/offers/filtered');
    request.send(formData);
    request.onload = () => {
        //todo: add error handling
        filteredOffers.innerHTML = request.responseText;
    }
});