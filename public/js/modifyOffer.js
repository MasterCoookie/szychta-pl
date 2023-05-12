function initializeModifyOfferSubmitListener (offer_id){
    const form = document.getElementById('offerForm');
    const submitButton = document.getElementById('submitBtn');
    const messageField = document.getElementById('messageField');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        const keywordsArrayInputs = Array.from(document.getElementsByClassName('keywords-array-input'));
        const keywordsArrayValues = JSON.stringify(keywordsArrayInputs.map(input => input.value));
        formData.append('keywords', keywordsArrayValues);

        const skillsArrayInput = document.getElementById('pickedSkills');
        formData.append('requirements', skillsArrayInput.value);

        const addQuestionsArrayInputs = Array.from(document.getElementsByClassName('additionalQuestions-array-input'));
        const addQuestionsArrayValues = JSON.stringify(addQuestionsArrayInputs.map(input => input.value));
        formData.append('additionalQuestions', addQuestionsArrayValues);
        if (offer_id){
            formData.append('offer_id', offer_id);
            request.open('post', '/employer/modify_offer');
        } else {
            request.open('put', '/employer/add_offer');
        }
        request.send(formData);
        request.addEventListener('load', (event) => {
            console.log(event);
            if(event.target.status === 201) {
                messageField.innerHTML = 'Zapisano';
                messageField.classList.remove('alert-danger');
                messageField.classList.add('alert-info');
                form.reset();
            } else if(event.target.status < 500) {
                messageField.innerHTML = 'Błędne dane!';
                messageField.classList.add('alert-danger');
                messageField.classList.remove('alert-info');
            } else {
                messageField.innerHTML = 'Błąd serwera!';
                messageField.classList.add('alert-danger');
                messageField.classList.remove('alert-info');
            }
        });
    });
}

export { initializeModifyOfferSubmitListener };
