function initializeSkillsSearch(allowCreation = false) {
    window.addEventListener('load', function () {
        const searchBarDOMElement = document.getElementById('skillsSearchBar');
        const searchResultsDOMElement = document.getElementById('skillsResults');
        const skillFormDOMElement = document.getElementById('skillForm');
        const newSkillClickText = document.getElementById('newSkillClickText');
        const skillNameInputDOMElement = document.getElementById('skillName');
        const notFoundMsg = 'No skills found';
        let timeout = null;

        searchBarDOMElement.addEventListener('input', function (e) {
            const searchQuery = e.target.value;

            if(searchQuery.length == 0) {
                searchResultsDOMElement.innerHTML = 'Start typing to search for skills';
                return;
            }
            newSkillClickText.innerHTML = 'Create new skill named "' + searchQuery + '"';

            clearTimeout(timeout);
            timeout = setTimeout(function () {
                console.log('searching for: ' + searchQuery);
                const request = new XMLHttpRequest();
                request.open('POST', '/skills/search');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify({ searchQuery: searchQuery }));
                request.onload = () => {
                    if(request.status === 200) {
                        const skills = JSON.parse(request.response);
                        if(skills.length == 0) {
                            searchResultsDOMElement.innerHTML = notFoundMsg;
                            return;
                        }
                        searchResultsDOMElement.innerHTML = '';
                        skills.forEach(skill => {
                            const skillDOMElement = document.createElement('div');
                            skillDOMElement.className += 'skill btn btn-primary p-2 mx-1 my-2 text-dark';
                            skillDOMElement.style.cursor = 'pointer';
                            skillDOMElement.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
                            skillDOMElement.innerHTML = skill.name;
                            skillDOMElement.addEventListener('click', function () {
                                const skillInputDOMElement = document.getElementById('skillInput');
                                skillInputDOMElement.value = skill.name;
                                searchResultsDOMElement.innerHTML = '';
                            });
                            searchResultsDOMElement.appendChild(skillDOMElement);
                        });
                    } else if(request.status < 500) {
                        searchResultsDOMElement.innerHTML = notFoundMsg;
                    } else {
                        searchResultsDOMElement.innerHTML = 'Something went wrong, try again later';
                    }
                };
            }, 500);
        });

        newSkillClickText.addEventListener('click', function () {
            skillFormDOMElement.style.display = 'block';
            skillNameInputDOMElement.value = searchBarDOMElement.value;
            searchBarDOMElement.value = '';
        });
    });
}

export { initializeSkillsSearch };
