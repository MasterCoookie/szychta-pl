const passwordForm = document.getElementById('changePasswordform');
const passwordButton = document.getElementById('savePasswordBtn');
const passwordMessage = document.getElementById('passwordSaveResult');

passwordButton.addEventListener('click', (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    const formData = new FormData(passwordForm);
        
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const repeatNewPassword = formData.get('repeatNewPassword');

    request.addEventListener('load', (event) => {
        if(event.target.status === 200) {
            passwordMessage.innerHTML = 'Zmieniono';
            passwordMessage.classList.remove('alert-danger');
            passwordMessage.classList.add('alert-info');
            form.reset();
        } else if(event.target.status < 500) {
            passwordMessage.innerHTML = 'Błędne dane!';
            passwordMessage.classList.add('alert-danger');
            passwordMessage.classList.remove('alert-info');
        } else {
            passwordMessage.innerHTML = 'Błąd serwera!';
            passwordMessage.classList.add('alert-danger');
            passwordMessage.classList.remove('alert-info');
        }
    });
    if(newPassword && newPassword === repeatNewPassword){
        request.open('POST', '/profile/password_update');
        request.send(formData);
    }else if (!newPassword){
        passwordMessage.innerHTML = 'Hasło nie może być puste';
        passwordMessage.classList.add('alert-danger');
        passwordMessage.classList.remove('alert-info');
    } else {
        passwordMessage.innerHTML = 'Hasło i powtórzone hasło nie są takie same';
        passwordMessage.classList.add('alert-danger');
        passwordMessage.classList.remove('alert-info');
    }

});
