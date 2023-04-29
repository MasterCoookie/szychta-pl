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
            console.log('searching for: ' + searchQuery);
            const request = new XMLHttpRequest();
            request.open('GET', '/skills');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({ searchQuery: searchQuery }));
            request.onload = () => {
                if(request.status === 200) {
                    const skills = JSON.parse(request.response);
                    if(skills.length == 0) {
                        searchResultsDOMElement.innerHTML = 'No skills found';
                        return;
                    }
                    searchResultsDOMElement.innerHTML = '';
                    skills.forEach(skill => {
                        const skillDOMElement = document.createElement('div');
                        skillDOMElement.classList.add('skill');
                        skillDOMElement.innerHTML = skill.name;
                        skillDOMElement.addEventListener('click', function () {
                            const skillInputDOMElement = document.getElementById('skillInput');
                            skillInputDOMElement.value = skill.name;
                            searchResultsDOMElement.innerHTML = '';
                        });
                        searchResultsDOMElement.appendChild(skillDOMElement);
                    });
                } else if(request.status < 500) {
                    searchResultsDOMElement.innerHTML = 'No skills found';
                } else {
                    searchResultsDOMElement.innerHTML = 'Something went wrong, try again later';
                }
            };
        }, 500);
    });
});
