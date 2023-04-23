const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('registerBtn');

registerButton.addEventListener('click', (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    const formData = new FormData(registerForm);
        
    let errorMessages = "";
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    request.addEventListener('load', (event) => {
        const response = JSON.parse(event.target.responseText);

        if(response.redirect === 'login'){
            window.location.href = '/auth/login';
        } else {
            if(response.errors !== null){
                response.errors.forEach(element => {
                    errorMessages+=element+". ";
                });
                document.getElementById('message').innerHTML = errorMessages;
            }
        }
    });
    if(password === repeatPassword){
        request.open('PUT', '/auth/register');
        request.send(formData);
    }else{
        document.getElementById('message').innerHTML = 'Hasło i powtórzone hasło nie są takie same';
    }

});
