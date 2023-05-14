window.addEventListener('load', function () {
    let currentIndex = 1;
    const FileToAddDOMElement = document.getElementById('addfile');
    const filesDOMElement = document.getElementById('files');
    const getInputTemplate = (index, name) => '<div id="file' + index + '">' + '<span id="filename' + index + '">' + name + '</span><button type="button" class="files-remove" id="buttonFile-' + index + '">x</button></div>';
    renderFiles();
    function deleteListener(e) {
        const clickedIndex = e.target.id.split('-')[1];
        const removedID = 'file' + clickedIndex;
        const removedFile = document.getElementById(removedID);
        const removedFileName = document.getElementById('filename' + clickedIndex);
        removedFile.remove();

        let delrequest = new XMLHttpRequest();
        delrequest.open('DELETE', '/profile/file_delete');
        delrequest.setRequestHeader('Content-Type', 'application/json');
        delrequest.send(JSON.stringify({ filename: removedFileName.innerHTML }));
        //delrequest.onload = () => { // JK SAID THIS IS NOT NEEDED AS REMOVED FILE IS NO LONGER DISPLAYED
        //    console.log(delrequest.response);
        //}
        renderFiles();
    }

    function renderFiles() {
        new_request = new XMLHttpRequest();
        new_request.open('GET', '/profile/docs');
        new_request.send();
        new_request.onload = () => {
            const array = JSON.parse(new_request.response);
            filesDOMElement.innerHTML = '';
             array.forEach(element => {
                 filesDOMElement.innerHTML += getInputTemplate(currentIndex - 1, element);
             });
            const deleteFileButtons = Array.from(document.getElementsByClassName('files-remove'));
            deleteFileButtons.forEach(element => {
                element.addEventListener('click', deleteListener);
            });
        };
    }


    FileToAddDOMElement.addEventListener('change', function (e) {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('doc', file);
        request = new XMLHttpRequest();
        request.open('POST', '/profile/docs_upload');
        request.send(formData);
        request.onload = () => {
            renderFiles();
        }
    });


    // const deleteFileButtons = Array.from(document.getElementsByClassName('file-remove'));
    // deleteFileButtons.forEach(element => {
    //     element.addEventListener('click', deleteListener);
    // });

});
