
const sortForm = document.getElementById('sortForm');
const sortCriterion = document.getElementById("criterion");

sortCriterion.addEventListener('change', (event) => {
    //event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(sortForm);
    console.log(formData.get('criterion'));
    request.open('GET', '/applicant/sort_applications');
    request.send();
    request.onload = () => {
        console.log(request.response);
    }
});