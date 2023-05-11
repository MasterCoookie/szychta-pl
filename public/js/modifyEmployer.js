function initializeModifyEmployerSubmitListener (employer_id){
    const form = document.getElementById('employerForm');
    const submitButton = document.getElementById('submitBtn');
    const employerSaveResultDOMElement = document.getElementById('employerSaveResult');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        if (employer_id){
            formData.append('employer_id', employer_id);
            request.open('post', '/admin/modify_employer');
        } else {
            request.open('put', '/admin/add_employer');
        }
        request.send(formData);
        request.addEventListener('load', (event) => {
            console.log(event);
            if(event.target.status === 201) {
                employerSaveResultDOMElement.innerHTML = 'Dodano';
                employerSaveResultDOMElement.classList.remove('alert-danger');
                employerSaveResultDOMElement.classList.add('alert-info');
                form.reset();
            } else if(event.target.status < 500) {
                employerSaveResultDOMElement.innerHTML = 'Błędne dane!';
                employerSaveResultDOMElement.classList.add('alert-danger');
                employerSaveResultDOMElement.classList.remove('alert-info');
            } else {
                employerSaveResultDOMElement.innerHTML = 'Błąd serwera!';
                employerSaveResultDOMElement.classList.add('alert-danger');
                employerSaveResultDOMElement.classList.remove('alert-info');
            }
        }
    );
})};
export { initializeModifyEmployerSubmitListener as initializeModifyEmployerSubmitListener };
