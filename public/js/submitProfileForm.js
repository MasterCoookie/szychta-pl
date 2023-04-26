window.addEventListener('load', function () {
    const profileFormDOMElement = document.getElementById('profileForm');
    const saveResultDOMElement = document.getElementById('saveResult');

    profileFormDOMElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(profileFormDOMElement);

        const arrayInputs = Array.from(document.getElementsByClassName('array-input'));
        const arrayValues = JSON.stringify(arrayInputs.map(input => input.value));

        formData.append('links', arrayValues);

        request = new XMLHttpRequest();
        request.open('POST', '/profile');
        request.send(formData);
        
        request.onload = () => {
            if(request.status === 200) {
                saveResultDOMElement.innerHTML = 'Dane zostały zapisane';
            } else if(request.status < 500) {
                //TODO: handle errors
                saveResultDOMElement.innerHTML = 'Błędne dane!';
            } else {
                saveResultDOMElement.innerHTML = 'Błąd serwera!';
            }
        };
    });
});
