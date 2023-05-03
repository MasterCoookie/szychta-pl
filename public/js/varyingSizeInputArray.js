function initializeVaryingSizeInputArray(prefix, startingLength, maxNumberOfElements) {
    window.addEventListener('load', function () {

        const getInputTemplate = (index) => '<input class="' + prefix + '-array-input" type="text" id="' + prefix + 'input' + index + '" /><button type="button" class="' + prefix + '-array-remove btn btn-decolored" id="' + prefix + '-' + index + '">x</button>';
        const inputArrayDOMElement = document.getElementById(prefix + '-inputArray');
        let arrayAddDOMElement = document.getElementById(prefix + '-arrayAdd');
        let currentIndex = startingLength;
        let currentArrayLen = startingLength;
        const maximalNumberOfElements = maxNumberOfElements;
        function renderInputArray() {

            if (currentArrayLen < maximalNumberOfElements) {
                arrayAddDOMElement.style.display = 'inline';
            } else {
                arrayAddDOMElement.style.display = 'none';
            }


            const arrayRemoveDOMElements = Array.from(document.getElementsByClassName(prefix + '-array-remove'));

            arrayRemoveDOMElements.forEach(element => {
                element.addEventListener('click', function(e) {
                    const clickedIndex = e.target.id.split('-')[1];

                    const removedButton = document.getElementById(prefix + '-' + clickedIndex);
                    const removedInput = document.getElementById(prefix + 'input' + clickedIndex);
                    try{
                        removedButton.remove();
                        removedInput.remove();
                        currentArrayLen--;
                        renderInputArray();
                    } catch(e) {
                        console.log(e);
                    }
                });
            });
        }

        renderInputArray();

        arrayAddDOMElement.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex++;
            currentArrayLen++;
            inputArrayDOMElement.insertAdjacentHTML('beforeend', getInputTemplate(currentIndex - 1));
            document.getElementById(prefix + 'input' + (currentIndex - 1)).focus();
            renderInputArray();
        });
    });
}

export { initializeVaryingSizeInputArray };
