window.addEventListener('load', function () {
    let currentIndex = 1;
    const FileToAddDOMElement = document.getElementById('addfile');
    const getInputTemplate = (index,name) => name + '<button type="button" data-buttonindex="" class="files-remove" id="' + index + '">x</button>';
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
        new_request.onload = () => {
            const array = JSON.parse(new_request.response);
            array.forEach(element => {
            FileToAddDOMElement.insertAdjacentHTML('beforeend', getInputTemplate(currentIndex - 1,element));
        });
        };
    });
});
