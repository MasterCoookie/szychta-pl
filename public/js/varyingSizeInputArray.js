window.addEventListener('load', function() {

    const inputTemplate = '<input type="text" id="link" />';
    const inputArrayDOMElement = document.getElementById('inputArray');
    let arrayAddDOMElement = document.getElementById('arrayAdd');
    let inputArray = [inputTemplate];

    arrayAddDOMElement.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('dupa');
        inputArray.push(inputTemplate);
        renderInputArray(inputArray);
    });


    function renderInputArray(inputArray) {

        if(inputArray.length < 8) {
            arrayAddDOMElement.style.display = 'inline';
        } else {
            arrayAddDOMElement.style.display = 'none';
        }

        inputArrayDOMElement.innerHTML = inputArray.join('');
    }
    
    renderInputArray(inputArray);
})

