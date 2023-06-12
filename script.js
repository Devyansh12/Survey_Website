// Survey questions
const questions = [
  { id: 1, text: "How satisfied are you with our products?", type: "rating", max: 5 },
  { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", max: 5 },
  { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", max: 5 },
  { id: 4, text: "On a scale of 1-10, how likely are you to recommend us to your friends and family?", type: "rating", max: 10 },
  { id: 5, text: "What could we do to improve our service?", type: "text" }
];

// Current survey state
let currentQuestion = 0;
let answers = {};

// Utility functions
function showElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "block";
  }
}

function hideElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "none";
  }
}

function updateQuestionNumber() {
  const questionNumber = document.getElementById("questionNumber");
  if (questionNumber) {
    questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  }
}

function updateQuestion() {
  const question = document.getElementById("question");
  const options = document.getElementById("options");
  const textInput = document.getElementById("textInput");
  const currentQuestionObj = questions[currentQuestion];

  if (question) {
    question.textContent = currentQuestionObj.text;
  }

  if (currentQuestionObj.type === "rating") {
    if (options) {
      options.innerHTML = "";
      for (let i = 1; i <= currentQuestionObj.max; i++) {
        const label = document.createElement("label");
        label.textContent = i;
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "rating";
        radio.value = i;
        options.appendChild(label);
        options.appendChild(radio);
      }
    }
    if (textInput) {
      textInput.style.display = "none";
    }
  } else if (currentQuestionObj.type === "text") {
    if (options) {
      options.innerHTML = "";
    }
    if (textInput) {
      textInput.style.display = "block";
    }
  }
}

function saveAnswer() {
  const currentQuestionObj = questions[currentQuestion];

  if (currentQuestionObj.type === "rating") {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (selectedRating) {
      answers[currentQuestionObj.id] = parseInt(selectedRating.value);
    }
  } else if (currentQuestionObj.type === "text") {
    const textInput = document.getElementById("textInput");
    if (textInput) {
      answers[currentQuestionObj.id] = textInput.value;
    }
  }
}

function startSurvey() {
  hideElement("welcomeScreen");
  showElement("surveyScreen");
  updateQuestionNumber();
  updateQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    saveAnswer();
    currentQuestion--;
    updateQuestionNumber();
    updateQuestion();
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    saveAnswer();
    currentQuestion++;
    updateQuestionNumber();
    updateQuestion();
  } else if (currentQuestion === questions.length - 1) {
    hideElement("surveyScreen");
    showElement("confirmationScreen");
  }
}

function skipQuestion() {
  if (currentQuestion < questions.length - 1) {
    saveAnswer();
    currentQuestion++;
    updateQuestionNumber();
    updateQuestion();
  } else if (currentQuestion === questions.length - 1) {
    hideElement("surveyScreen");
    showElement("confirmationScreen");
  }
}

function submitSurvey() {
  // Save answers to local storage or send to the server via AJAX
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  localStorage.setItem("surveyStatus", "COMPLETED");

  hideElement("confirmationScreen");
  showElement("thankYouScreen");

  setTimeout(function() {
    hideElement("thankYouScreen");
    showElement("welcomeScreen");
    currentQuestion = 0;
    answers = {};
  }, 5000);
}

function cancelSubmit() {
  hideElement("confirmationScreen");
  showElement("surveyScreen");
}
