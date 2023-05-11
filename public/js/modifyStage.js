function initializeModifyStageSubmitListener (id, typeOfId){
    const form = document.getElementById('statusForm');
    const submitButton = document.getElementById('submitBtn');
    const messageField = document.getElementById('messageField');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        const currentDate = Date.now();
        formData.append('currentDate', currentDate);
        if (typeOfId == 's'){
            formData.append('stage_id', id);
            request.open('post', '/employer/modify_stage');
        } else if (typeOfId == 'a'){
            formData.append('application_id', id);
            request.open('post', '/employer/add_stage');
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
        }
    });
}

export { initializeModifyStageSubmitListener };
