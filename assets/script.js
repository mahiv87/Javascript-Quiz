// Global variables
var indexHeader = document.querySelector("#index-header");
var indexText = document.querySelector(".instructions");
var startButton = document.querySelector(".start-button");
var scoreButton = document.querySelector(".view-highscores");
var timerElement = document.querySelector("#timer");
var timeElement = document.querySelector(".time");
var winElement = document.querySelector("#win-game");
var loseElement = document.querySelector("#lose-text");
var questionElement = document.querySelector("#question");
var choiceList = document.querySelector("#choice-list");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var highscoreElement = document.querySelector("#highscore-title");

var chosenQuestion = {};
var questionAmount = [];
var chooseAnswer = true;
var timer;
var timerCount;

// This array will hold scores for local storage 
var scoreList = [];

// This variable is and array of objects that hold the questions 
var questions = [
  {
    question: "JavaScript is a ___-side programming language.",
    option1: "Client",
    option2: "Server",
    option3: "Both",
    option4: "None",
    answer: 3,
  },
  {
    question:
      "Which of the following will write the message “Hello World!” in an alert box?",
    option1: "alertBox(“Hello World!”);",
    option2: "alert(Hello World!);",
    option3: "msgAlert(“Hello World!”);",
    option4: "alert(“Hello World!”);",
    answer: 4,
  },
  {
    question: "How do you find the minimum of x and y using JavaScript?",
    option1: "min(x,y);",
    option2: "Math.min(x,y);",
    option3: "Math.min(xy);",
    option4: "min(xy);",
    answer: 2,
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    option1: 'var colors = ["red", "green", "blue"];',
    option2: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue");',
    option3: 'var colors = "red", "green", "blue";',
    option4: 'var colors = (1:"red", 2:"green", 3:"blue");',
    answer: 1,
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    option1: "numbers and strings",
    option2: "other arrays",
    option3: "booleans",
    option4: "all of the above",
    answer: 4,
  },
];

var choice = [choice1, choice2, choice3, choice4];

// Hides quiz elements when at index page
choiceList.setAttribute("style", "display: none");
timeElement.setAttribute("style", "display: none");

// When Start Quiz button is clicked, hides index page elements and displays quiz elements
function startQuiz() {
  choiceList.setAttribute("style", "display: block");
  timeElement.setAttribute("style", "display: block");
  indexHeader.setAttribute("style", "display: none");
  indexText.setAttribute("style", "display: none");
  startButton.setAttribute("style", "display: none");
  scoreButton.setAttribute("style", "display: none");

  // Initial values, and starts timer and questions
  isWin = false;
  timerCount = 60;
  questionAmount = [...questions];
  renderQuestion();
  startTimer();

// This function chooses which question and choices to display
  function renderQuestion() {
    var questionIndex = Math.floor(Math.random() * questionAmount.length);
    chosenQuestion = questionAmount[questionIndex];
    questionElement.innerHTML = chosenQuestion.question;

    choice1.innerHTML = chosenQuestion.option1;
    choice2.innerHTML = chosenQuestion.option2;
    choice3.innerHTML = chosenQuestion.option3;
    choice4.innerHTML = chosenQuestion.option4;

    questionAmount.splice(questionIndex, 1);

    chooseAnswer = true;
  }

  // forEach loop that determines if selected answer is correct/incorrect.
  choice.forEach(choices => {
    // Event listener for the user selection
  choices.addEventListener("click", function (event) {
    chooseAnswer = false;
    var selection = event.target;
    var chosenAnswer = selection.dataset["number"];

    // Conditional that styles the selected choice with green or red border
    if (chosenAnswer == chosenQuestion.answer) {
      choices.setAttribute("style", "border: 1px solid green");
    } else {
      choices.setAttribute("style", "border: 1px solid red");
      timerCount -= 10;
    }

    // One second delay to allow user to view selection.
    // And renders next question unless there are none available
    setTimeout(function delay() {
      choices.removeAttribute("style", "border:");
      if (questionAmount.length > 0) {
        renderQuestion();
      } else if (questionAmount.length === 0) {
        isWin = true;
      }
    }, 1000);
  });
  })  

  // Starts timer. And determines which result page to display 
  function startTimer() {
    timer = setInterval(function () {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (isWin && timerCount > 0) {
          clearInterval(timer);
          winGame();
        }
      }

      if (timerCount <= 0) {
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }
  
  // If conditional is met winGame fires to display input for user initials
  function winGame() {
    questionElement.setAttribute("style", "display: none;");
    choiceList.setAttribute("style", "display: none;");

    var imgElement = document.createElement("img");
    imgElement.setAttribute("src", "assets/images/happy.png");
    imgElement.setAttribute("style", "max-width: 50%; margin-inline: auto");
    imgElement.setAttribute("alt", "Happy robot");

    var enterIntials = document.createElement("h1");
    enterIntials.innerHTML = "Enter your initials";

    var scoreForm = document.createElement("form");

    var inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute(
      "style",
      "background-color: rgba(102, 155, 188, .3); color: #f5e2c8;"
    );

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "submit-button");
    submitBtn.innerHTML = "Submit";
    submitBtn.setAttribute(
      "style",
      "display: block; margin: 3rem auto; max-width: 20rem; font-size: 2rem; font-weight: bold; text-decoration: none; border: 1px solid #d88373; border-radius: 4px; padding: 5px 10px; background-color: #d88373; color: #212121;"
    );

    scoreForm.appendChild(inputText);
    scoreForm.appendChild(submitBtn);

    winElement.appendChild(imgElement);
    winElement.appendChild(enterIntials);
    winElement.appendChild(scoreForm);

    function storeScore() {
      localStorage.setItem("score", JSON.stringify(scoreList));
    }

    scoreForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var initialText = inputText.value.trim();

      if (initialText === "") {
        return;
      }

      scoreList.push(initialText + "-" + timerCount);
      inputText.value = "";

      storeScore();
      highscoreList();
    });
  }

  // If conditional is met loseGame fires to display button to return to main menu 
  function loseGame() {
    questionElement.setAttribute("style", "display: none;");
    choiceList.setAttribute("style", "display: none;");

    var imgElement = document.createElement("img");
    imgElement.setAttribute("src", "assets/images/sad.png");
    imgElement.setAttribute("style", "max-width: 50%; margin-inline: auto");
    imgElement.setAttribute("alt", "Sad robot");

    var lostMessage = document.createElement("h1");
    lostMessage.innerHTML = "You ran out of time!";

    var restartGame = document.createElement("a");
    restartGame.setAttribute("href", "./index.html");
    restartGame.setAttribute(
      "style",
      "max-width: 20rem; font-size: 2rem; font-weight: bold; text-decoration: none; border: 1px solid #d88373; border-radius: 4px; padding: 5px 10px; background-color: #d88373; color: #212121;"
    );

    var restart = document.createTextNode("Restart Quiz");
    restartGame.appendChild(restart);

    loseElement.appendChild(imgElement);
    loseElement.appendChild(lostMessage);
    loseElement.appendChild(restartGame);
  }


}

// This function will display the scores pulled from local storage
function highscoreList() {
  indexHeader.setAttribute("style", "display: none");
  indexText.setAttribute("style", "display: none");
  startButton.setAttribute("style", "display: none");
  scoreButton.setAttribute("style", "display: none");
  choiceList.setAttribute("style", "display: none");
  timeElement.setAttribute("style", "display: none");
  winElement.setAttribute("style", "display: none");

  var header = document.createElement("h1");
  header.innerHTML = "Highscores";

  var ol = document.createElement("ol");
  ol.setAttribute("class", "ordered-list");

  var buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "inline-flex");

  var goBack = document.createElement("a");
  goBack.setAttribute("id", "button");
  goBack.setAttribute("class", "go-back");
  goBack.setAttribute("href", "./index.html");
  goBack.innerHTML = "Go Back";

  var clearHighscores = document.createElement("span");
  clearHighscores.setAttribute("id", "button");
  clearHighscores.setAttribute("class", "clear-highscores");
  clearHighscores.innerHTML = "Clear Highscores";

  buttonDiv.appendChild(goBack);
  buttonDiv.appendChild(clearHighscores);

  highscoreElement.appendChild(header);
  highscoreElement.appendChild(ol);
  highscoreElement.appendChild(buttonDiv);

  var highscoreList = document.querySelector(".ordered-list");
  var clearScores = document.querySelector(".clear-highscores");

  function renderScore() {
    for (var i = 0; i < scoreList.length; i++) {
      var scoreLists = scoreList[i];

      var li = document.createElement("li");
      li.textContent = scoreLists;
      li.setAttribute("data-index", i);

      highscoreList.appendChild(li);
    }
  }

  // This event listener clears rendered scores and local storage
  clearScores.addEventListener("click", function () {
    highscoreList.textContent = "";
    localStorage.clear();
  });

  renderScore();
}

// This function pulls scores stored in local storage 
function init() {
  var storedScores = JSON.parse(localStorage.getItem("score"));

  if (storedScores !== null) {
    scoreList = storedScores;
  }
}

init();

// Index event listener 
startButton.addEventListener("click", startQuiz);
scoreButton.addEventListener("click", highscoreList);
