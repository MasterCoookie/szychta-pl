window.addEventListener('load', function () {
    const profileFormDOMElement = document.getElementById('profileForm');
    const saveResultDOMElement = document.getElementById('saveResult');
    const saveProfileBtn = document.getElementById('saveProfileBtn');

    saveProfileBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const formData = new FormData(profileFormDOMElement);

        const arrayInputs = Array.from(document.getElementsByClassName('array-input'));
        const arrayValues = JSON.stringify(arrayInputs.map(input => input.value));
        const skills = document.getElementById('pickedSkills').value;

        formData.append('links', arrayValues);
        formData.append('skills', skills);

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
