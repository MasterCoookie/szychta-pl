window.addEventListener('load', function () {
    const searchBarDOMElement = document.getElementById('skillsSearchBar');
    const searchResultsDOMElement = document.getElementById('skillsResults');
    let timeout = null;

    searchBarDOMElement.addEventListener('input', function (e) {
        const searchQuery = e.target.value;

        if(searchQuery.length == 0) {
            searchResultsDOMElement.innerHTML = 'Start typing to search for skills';
            return;
        }

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            console.log("Searching for: " + searchQuery);
        }, 500);
    });
});
