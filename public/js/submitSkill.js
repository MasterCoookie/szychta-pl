function submitSkill() {
    window.addEventListener('load', () => {
        const skillFormDOMElement = document.getElementById('skillForm');
        const skillSaveResultDOMElement = document.getElementById('skillSaveResult');

        skillFormDOMElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('skillName').value;
            const description = document.getElementById('skillDesc').value;
            const keywordsInputs = document.getElementsByClassName('keywords-array-input');

            const keywords = Array.from(keywordsInputs).map(input => input.value);

            const request = new XMLHttpRequest();
            request.open('POST', '/skills');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({ name: name, description: description, keywords: keywords }));
            request.onload = () => {
                if(request.status === 201) {
                    skillSaveResultDOMElement.innerHTML = 'Dodano';
                    skillSaveResultDOMElement.classList.remove('alert-danger');
                    skillSaveResultDOMElement.classList.add('alert-info');
                    skillFormDOMElement.reset();
                } else if(request.status < 500) {
                    skillSaveResultDOMElement.innerHTML = 'Błędne dane!';
                    skillSaveResultDOMElement.classList.add('alert-danger');
                    skillSaveResultDOMElement.classList.remove('alert-info');
                } else {
                    skillSaveResultDOMElement.innerHTML = 'Błąd serwera!';
                    skillSaveResultDOMElement.classList.add('alert-danger');
                    skillSaveResultDOMElement.classList.remove('alert-info');
                }
            }
        });
    });
}

export { submitSkill };
