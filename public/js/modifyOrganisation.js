function initializeModifyOrganisationSubmitListener (organisation_id){
    const form = document.getElementById('orgForm');
    const submitButton = document.getElementById('submitBtn');
    const organisationSaveResultDOMElement = document.getElementById('organisationSaveResult');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const formData = new FormData(form);
        request.onload = () => {
            if(request.status === 201) {
                organisationSaveResultDOMElement.innerHTML = 'Dodano';
                organisationSaveResultDOMElement.classList.remove('alert-danger');
                organisationSaveResultDOMElement.classList.add('alert-info');
                skillFormDOMElement.reset();
            } else if(request.status < 500) {
                organisationSaveResultDOMElement.innerHTML = 'Błędne dane!';
                organisationSaveResultDOMElement.classList.add('alert-danger');
                organisationSaveResultDOMElement.classList.remove('alert-info');
            } else {
                organisationSaveResultDOMElement.innerHTML = 'Błąd serwera!';
                organisationSaveResultDOMElement.classList.add('alert-danger');
                organisationSaveResultDOMElement.classList.remove('alert-info');
            }
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
