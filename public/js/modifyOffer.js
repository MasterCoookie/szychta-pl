const form = document.getElementById('offerForm');
const submitButton = document.getElementById('submitBtn');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(form);
    console.log(formData);
    request.onload = () => {
        console.log(request.response);
    }
    
    request.open('put', '/employer/add_offer');
    request.send(formData);
});
