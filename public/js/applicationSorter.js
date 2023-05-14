
const sortForm = document.getElementById('sortForm');
const sortCriterion = document.getElementById("criterion");
const tableBody = document.getElementById("tableBody");

sortCriterion.addEventListener('change', (event) => {
    const request = new XMLHttpRequest();
    const formData = new FormData(sortForm);
    request.open('POST', '/applicant/sort_applications');
    request.send(formData);
    request.onload = () => {
        tableBody.innerHTML = request.response;
    }
});