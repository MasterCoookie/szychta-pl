window.addEventListener('load', function () {

    const getInputTemplate = (index) => '<input class="array-input" type="text" id="input' + index + '" /><button type="button" data-buttonindex="" class="array-remove" id="' + index + '">x</button>';
    const inputArrayDOMElement = document.getElementById('inputArray');
    let arrayAddDOMElement = document.getElementById('arrayAdd');
    let inputArrayLen = 1;
    let numberOfElements = 1;
    /*
    Create a variable that is incrementen on add and decremented on remove and add this to an if
    */

    function renderInputArray() {

        if (numberOfElements < 8) {
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
                numberOfElements--;
                renderInputArray();

            });
        });
        
    }

    renderInputArray();

    arrayAddDOMElement.addEventListener('click', function (e) {
        e.preventDefault();
        inputArrayLen++;
        numberOfElements++;
        inputArrayDOMElement.insertAdjacentHTML('beforeend', getInputTemplate(inputArrayLen - 1));
        renderInputArray();
    });
});
