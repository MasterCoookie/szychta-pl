window.addEventListener('load', function () {
    const profilePictureDOMElement = document.getElementById('profilePicture');
    const profilePicturePreviewDOMElement = document.getElementById('profilePicturePreview');
    const clearProfilePictureDOMElement = document.getElementById('clearProfilePictureButton');

    profilePictureDOMElement.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', function (e) {
            profilePicturePreviewDOMElement.src = e.target.result;
        });

        reader.readAsDataURL(file);
    });

    clearProfilePictureDOMElement.addEventListener('click', function (e) {
        profilePictureDOMElement.value = '';
        profilePicturePreviewDOMElement.src = 'img/blank-profile-picture-973460_1280.webp';
    });
});
