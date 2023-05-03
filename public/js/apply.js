function apply(jobAdvertId) {
    const request = new XMLHttpRequest();
    const capturedForm = document.getElementById("applyForm");
    const formData = new FormData(capturedForm);
    let questionsArray = Array.from(document.getElementsByClassName("question")).map((element) => { return {answer: element.value } });
    console.log(questionsArray);
    formData.append("additionalQuestions", JSON.stringify(questionsArray));
    let filesArray = Array.from(document.getElementsByClassName("document")).map((element) => { return {filename: element.value } });
    console.log(jobAdvertId);
    formData.append("files", JSON.stringify(filesArray));

    request.open("POST", "/advert/apply")
}