window.addEventListener('load', function () {

    const getInputTemplate = (index) => '<input class="array-input" type="text" id="input' + index + '" /><button type="button" data-buttonindex="" class="array-remove" id="' + index + '">x</button>';
    const inputArrayDOMElement = document.getElementById('inputArray');
    let arrayAddDOMElement = document.getElementById('arrayAdd');
    let inputArrayLen = 1;

    function renderInputArray() {

        if (inputArrayLen < 8) {
            arrayAddDOMElement.style.display = 'inline';
        } else {
            arrayAddDOMElement.style.display = 'none';
        }


        const arrayRemoveDOMElements = Array.from(document.getElementsByClassName('array-remove'));

        arrayRemoveDOMElements.forEach(element => {
            element.addEventListener('click', function (e) {
                const clickedIndex = e.target.id;

                const removedButton = document.getElementById(clickedIndex);
                const removedInput = document.getElementById('input' + clickedIndex);

                removedButton.remove();
                removedInput.remove();

                renderInputArray();

            });
        });
        
    }

    renderInputArray();

    arrayAddDOMElement.addEventListener('click', function (e) {
        e.preventDefault();
        inputArrayLen++;
        inputArrayDOMElement.insertAdjacentHTML('beforeend', getInputTemplate(inputArrayLen - 1));
        renderInputArray();
    });
});
