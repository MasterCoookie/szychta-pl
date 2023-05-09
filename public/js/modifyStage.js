function initializeModifyStageSubmitListener (id, typeOfId){
    const form = document.getElementById('statusForm');
    const submitButton = document.getElementById('submitBtn');

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
    });
}

export { initializeModifyStageSubmitListener };
