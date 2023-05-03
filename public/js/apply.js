function apply(jobAdvertID) {
    const request = new XMLHttpRequest();
    const capturedForm = document.getElementById("applyForm");
    const formData = new FormData(capturedForm);
    let questionsArray = Array.from(document.getElementsByClassName("question")).map((element) => { return {answer: element.value } });
    console.log(questionsArray);
    formData.append("additionalQuestions", JSON.stringify(questionsArray));
    let filesArray = Array.from(document.getElementsByClassName("document")).map((element) => { return {filename: element.value } });
    console.log(jobAdvertID);
    formData.append("files", JSON.stringify(filesArray));
    formData.append("jobAdvertID", jobAdvertID);
    let currentDate = new Date().toJSON().slice(0, 10);
    formData.append("applicationDate", currentDate);

    request.open("POST", "/advert/apply")
    request.send(formData);
}