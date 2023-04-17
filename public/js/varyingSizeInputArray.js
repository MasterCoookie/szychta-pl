window.addEventListener('load', function() {

    const getInputTemplate = (index) => '<input type="text" id="link" data-index="' + index + '" /><button type="button" data-index="' + index + '" class="array-remove">x</button>';
    const inputArrayDOMElement = document.getElementById('inputArray');
    let arrayAddDOMElement = document.getElementById('arrayAdd');
    let inputArray = [getInputTemplate(0)];

    function renderInputArray(inputArray) {

        if(inputArray.length < 8) {
            arrayAddDOMElement.style.display = 'inline';
        } else {
            arrayAddDOMElement.style.display = 'none';
        }

        inputArrayDOMElement.innerHTML = inputArray.join('');

        const arrayRemoveDOMElements = Array.from(document.getElementsByClassName("array-remove"));

        arrayRemoveDOMElements.forEach(element => {
            element.addEventListener('click', function(e) {
                const clickedIndex = e.target.dataset.index;
                inputArray.splice(clickedIndex, 1);
                renderInputArray(inputArray)
            });
        });
    }
    
    renderInputArray(inputArray);

    const arrayRemoveDOMElement = document.getElementById('arrayRemove');

    arrayAddDOMElement.addEventListener('click', function(e) {
        e.preventDefault();
        inputArray.push(getInputTemplate(inputArray.length));
        renderInputArray(inputArray);
    });
});
