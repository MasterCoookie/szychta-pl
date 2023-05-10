function initializeModifyOrganisationSubmitListener (organisation_id){
    const form = document.getElementById('orgForm');
    const submitButton = document.getElementById('submitBtn');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        request.onload = () => {
            console.log(request.response);
        }
        if (organisation_id){
            formData.append('organisation_id', organisation_id);
            request.open('post', '/admin/modify_organisation');
        } else {
            request.open('put', '/admin/add_organisation');
        }
        request.send(formData);
    });
}

export { initializeModifyOrganisationSubmitListener as initializeModifyOrganisationSubmitListener };
