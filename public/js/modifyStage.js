function initializeModifyStageSubmitListener (id, typeOfId){
    const form = document.getElementById('statusForm');
    const submitButton = document.getElementById('submitBtn');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        request.onload = () => {
            console.log(request.response); // debug
        }
        const currentDate = new Date().toJSON().slice(0, 10);
        formData.append('currentDate', currentDate);
        if (typeOfId == 's'){
            formData.append('stage_id', id);
            console.log(formData); //debug
            request.open('post', '/employer/modify_stage');
        } else if (typeOfId == 'a'){
            formData.append('application_id', id);
            console.log(formData); //debug
            request.open('post', '/employer/add_stage');
        }
        request.send(formData);
    });
}

export { initializeModifyStageSubmitListener };