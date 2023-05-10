function initializeModifyEmployerSubmitListener (employer_id){
    const form = document.getElementById('employerForm');
    const submitButton = document.getElementById('submitBtn');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        request.onload = () => {
            console.log(request.response);
        }
        if (employer_id){
            formData.append('employer_id', employer_id);
            request.open('post', '/admin/modify_employer');
        } else {
            request.open('put', '/admin/add_employer');
        }
        request.send(formData);
    });
}
export { initializeModifyEmployerSubmitListener as initializeModifyEmployerSubmitListener };
