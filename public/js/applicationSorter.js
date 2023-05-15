const sortForm = document.getElementById('sortForm');
const sortCriterion = document.getElementById("criterion");
const tableBody = document.getElementById("tableBody");
const applicationList = document.getElementById("applicationList");

sortCriterion.addEventListener('change', (event) => {
    const request = new XMLHttpRequest();
    const formData = new FormData(sortForm);
    if(formData.get("jobOfferObject")) {
        request.open('POST', '/employer/sort_applications');
        request.send(formData);
        request.onload = () => {
            applicationList.innerHTML = request.response;
        }
    } else {
        request.open('POST', '/applicant/sort_applications');
        request.send(formData);
        request.onload = () => {
            tableBody.innerHTML = request.response;
        }
    }
});