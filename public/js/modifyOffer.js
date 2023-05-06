function initializeModifyOfferSubmitListener (offer_id){
    const form = document.getElementById('offerForm');
    const submitButton = document.getElementById('submitBtn');

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
        request.onload = () => {
            console.log(request.response);
        }
        if (offer_id){
            formData.append('offer_id', offer_id);
            console.log(formData); //debug
            request.open('post', '/employer/modify_offer');
        } else {
            console.log(formData); //debug
            request.open('put', '/employer/add_offer');
        }
        request.send(formData);
    });
}

export { initializeModifyOfferSubmitListener };
