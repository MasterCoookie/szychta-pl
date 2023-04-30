const form = document.getElementById('offerForm');
const submitButton = document.getElementById('submitBtn');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData(form);
    const keywordsArrayInputs = Array.from(document.getElementsByClassName('keywords-array-input'));
    const keywordsArrayValues = JSON.stringify(keywordsArrayInputs.map(input => input.value));
    formData.append('keywords', keywordsArrayValues);
    const addQuestionsArrayInputs = Array.from(document.getElementsByClassName('additionalQuestions-array-input'));
    const addQuestionsArrayValues = JSON.stringify(addQuestionsArrayInputs.map(input => input.value));
    formData.append('additionalQuestions', addQuestionsArrayValues);
    console.log(formData);
    request.onload = () => {
        console.log(request.response);
    }
    request.open('put', '/employer/add_offer');
    request.send(formData);
    //todo check if is modified - then post
});
