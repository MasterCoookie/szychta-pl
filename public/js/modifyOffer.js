const form = document.getElementById('offerForm');
const submitButton = document.getElementById('submitBtn');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(form);

    request.addEventListener('load', (event) => {
        const response = JSON.parse(event.target.responseText);

        if(response.redirect === 'profile'){
            window.location.href = '/profile';
        } else if(response.msg !== null){
            document.getElementById('message').innerHTML = response.msg;
        }
    });
    
    request.open('put', '/employer/add_offer');
    request.send(formData);
});