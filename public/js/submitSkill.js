function submitSkill() {
    window.addEventListener('load', () => {
        const skillFormDOMElement = document.getElementById('skillForm');
        const skillSaveResultDOMElement = document.getElementById('skillSaveResult');

        skillFormDOMElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('skillName').value;
            const description = document.getElementById('skillDescryption').value;
            const keywordsInputs = document.getElementsByClassName('keywords-array-input');

            const keywords = Array.from(keywordsInputs).map(input => input.value);

            const request = new XMLHttpRequest();
            request.open('POST', '/skills');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({ name: name, description: description, keywords: keywords }));
            request.onload = () => {
                if(request.status === 201) {
                    skillSaveResultDOMElement.innerHTML = 'Skill został dodany';
                } else if(request.status < 500) {
                    skillSaveResultDOMElement.innerHTML = 'Błędne dane!';
                } else {
                    skillSaveResultDOMElement.innerHTML = 'Błąd serwera!';
                }
            }
        });
    });
}

export { submitSkill };
