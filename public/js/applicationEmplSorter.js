
const sortForm = document.getElementById('sortForm');
const sortCriterion = document.getElementById("criterion");
const applicationlist = document.getElementById("applicationlist");

sortCriterion.addEventListener('change', (event) => {
    const request = new XMLHttpRequest();
    const formData = new FormData(sortForm);
    request.open('POST', '/employer/sort_applications');
    request.send(formData);
    request.onload = () => {
        applicationlist.innerHTML = request.response;
    }
});