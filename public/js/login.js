const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginBtn');

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(loginForm);

    request.addEventListener('load', (event) => {
        const response = JSON.parse(event.target.responseText);

        if(response.redirect === 'profile'){
            window.location.href = '/profile';
        } else if(response.redirect === 'panel') {
            window.location.href = '/employer/employerPanel';
        } else if(response.msg !== null){
            document.getElementById('message').innerHTML = response.msg;
        }
    });

    request.open('post', '/auth/login');
    request.send(formData);
});
