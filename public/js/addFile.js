window.addEventListener('load', function () {
    const FileToAddDOMElement = document.getElementById('addfile');
    FileToAddDOMElement.addEventListener('change', function (e) {
        const file = e.target.files[0];
        console.log("dupa");
        let formData = new FormData();
        formData.append('doc', file);
        request = new XMLHttpRequest();
        request.open('POST', '/profile/docs_upload');
        request.send(formData);
        request.onload = () => alert(request.response);
        new_request = new XMLHttpRequest();
        new_request.open('GET', '/profile/docs');
        new_request.send();
        new_request.onload = () => alert(new_request.response);
    });
});
