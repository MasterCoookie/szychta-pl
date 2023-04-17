window.addEventListener('load', function() {

    const getInputTemplate = (index) => '<input type="text" id="link" data-index="' + index + '" /><button type="button" data-index="' + index + '" class="array-remove">x</button>';
    const inputArrayDOMElement = document.getElementById('inputArray');
    let arrayAddDOMElement = document.getElementById('arrayAdd');
    let inputArrayLen = 1;

    function renderInputArray() {

        if(inputArrayLen < 8) {
            arrayAddDOMElement.style.display = 'inline';
        } else {
            arrayAddDOMElement.style.display = 'none';
        }


        const arrayRemoveDOMElements = Array.from(document.getElementsByClassName("array-remove"));

        arrayRemoveDOMElements.forEach(element => {
            element.addEventListener('click', function(e) {
                const clickedIndex = e.target.dataset.index;
                console.log(clickedIndex);
            });
        });
    }
    
    renderInputArray();

    arrayAddDOMElement.addEventListener('click', function(e) {
        e.preventDefault();
        inputArrayLen++;
        inputArrayDOMElement.insertAdjacentHTML('beforeend', getInputTemplate(inputArrayLen - 1));
        renderInputArray();
    });
});
