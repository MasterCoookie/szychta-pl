window.addEventListener('load', function () {
    const FileToAddDOMElement = document.getElementById('addfile');
    FileToAddDOMElement.addEventListener('change', function (e) {
        const file = e.target.files[0];
        //const reader = new FileReader();
        console.log("dupa");
        //reader.readAsDataURL(file);image.png
        let formData = new FormData();
        formData.append('doc', file);
        request = new XMLHttpRequest();
        request.open('POST', '/profile/docs_upload');
        request.send(formData);
        request.onload = () => alert(request.response);

    });
});
