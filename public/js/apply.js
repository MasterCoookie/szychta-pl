function apply(jobAdvertID) {
    const request = new XMLHttpRequest();
    const capturedForm = document.getElementById("applyForm");
    let formData = new FormData(capturedForm);
    const questionsArray = Array.from(document.getElementsByClassName("question")).map(element => element.textContent);
    const answerArray = Array.from(document.getElementsByClassName("questionAnswer")).map(element => element.value);
    const keyValueQuestionArray = questionsArray.reduce((obj, question, index) => {
        const answer = answerArray[index];
        if (answer !== "") {
        obj[question] = answer;
        }
        return obj;
    }, {});
    //console.log(elements);
    console.log(keyValueQuestionArray);
    formData.append("additionalQuestions", JSON.stringify(keyValueQuestionArray));
    const filesArray = Array.from(document.getElementsByClassName("document")).filter(element => element.checked).map(element => element.value);
    formData.append("relativeDocuments", JSON.stringify(filesArray));
    formData.append("jobAdvertID", jobAdvertID);
    const currentDate = new Date().toJSON().slice(0, 10);
    formData.append("applicationDate", currentDate);

    request.addEventListener('load', (event) => {
        if(event.target.status === 201){
            document.getElementById("message").innerHTML = "Aplikowano pomyślnie";
        }
        else {
            const response = JSON.parse(event.target.responseText);
            let errorMessage = "";
            if(response.errors !== null){
                response.errors.forEach(element => {
                    errorMessage+=element+". ";
                    document.getElementById("message").innerHTML = errorMessage;
                });
            }
        }
    });
    request.open("POST", "/advert/apply")
    request.send(formData);
}
