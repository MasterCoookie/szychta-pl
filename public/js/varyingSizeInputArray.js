function initializeVaryingSizeInputArray(prefix, startingLength, maxNumberOfElements) {
    window.addEventListener('load', function () {

        const getInputTemplate = (index) => '<input class="array-input" type="text" id="input' + index + '" /><button type="button" data-buttonindex="" class="array-remove" id="' + index + '">x</button>';
        const inputArrayDOMElement = document.getElementById('inputArray');
        let arrayAddDOMElement = document.getElementById('arrayAdd');
        let currentIndex = startingLength;
        let currentArrayLen = startingLength;
        const maximalNumberOfElements = maxNumberOfElements;
        function renderInputArray() {

            if (currentArrayLen < maximalNumberOfElements) {
                arrayAddDOMElement.style.display = 'inline';
            } else {
                arrayAddDOMElement.style.display = 'none';
            }


            const arrayRemoveDOMElements = Array.from(document.getElementsByClassName('array-remove'));

            arrayRemoveDOMElements.forEach(element => {
                element.addEventListener('click', function(e) {
                    const clickedIndex = e.target.id;

                    const removedButton = document.getElementById(clickedIndex);
                    const removedInput = document.getElementById('input' + clickedIndex);

                    removedButton.remove();
                    removedInput.remove();
                    currentArrayLen--;
                    renderInputArray();
                });
            });
        }

        renderInputArray();

        arrayAddDOMElement.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex++;
            currentArrayLen++;
            inputArrayDOMElement.insertAdjacentHTML('beforeend', getInputTemplate(currentIndex - 1));
            renderInputArray();
        });
    });
}

export { initializeVaryingSizeInputArray };
