
const sortForm = document.getElementById('sortForm');
const sortButton = document.getElementById('sortBtn');

sortButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(sortForm);
    console.log(formData.get('criterion'));
    request.open('get', '/applicant/show_applications');
});