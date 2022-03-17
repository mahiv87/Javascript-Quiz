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

var scoreList = [];

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

choiceList.setAttribute("style", "display: none");
timeElement.setAttribute("style", "display: none");

function startQuiz() {
  choiceList.setAttribute("style", "display: block");
  timeElement.setAttribute("style", "display: block");
  indexHeader.setAttribute("style", "display: none");
  indexText.setAttribute("style", "display: none");
  startButton.setAttribute("style", "display: none");
  scoreButton.setAttribute("style", "display: none");

  function startGame() {
    isWin = false;
    timerCount = 60;
    questionAmount = [...questions];
    renderQuestion();
    startTimer();
  }

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

  choice1.addEventListener("click", function (event) {
    chooseAnswer = false;
    var selection = event.target;
    var chosenAnswer = selection.dataset["number"];

    if (chosenAnswer == chosenQuestion.answer) {
      choice1.setAttribute("style", "border: 1px solid green");
    } else {
      choice1.setAttribute("style", "border: 1px solid red");
      timerCount -= 10;
    }

    setTimeout(function delay() {
      choice1.removeAttribute("style", "border:");
      if (questionAmount.length > 0) {
        renderQuestion();
      } else if (questionAmount.length === 0) {
        isWin = true;
      }
    }, 1000);
  });

  choice2.addEventListener("click", function (event) {
    chooseAnswer = false;
    var selection = event.target;
    var chosenAnswer = selection.dataset["number"];

    if (chosenAnswer == chosenQuestion.answer) {
      choice2.setAttribute("style", "border: 1px solid green");
    } else {
      choice2.setAttribute("style", "border: 1px solid red");
      timerCount -= 10;
    }

    setTimeout(function delay() {
      choice2.removeAttribute("style", "border:");
      if (questionAmount.length > 0) {
        renderQuestion();
      } else if (questionAmount.length === 0) {
        isWin = true;
      }
    }, 1000);
  });

  choice3.addEventListener("click", function (event) {
    chooseAnswer = false;
    var selection = event.target;
    var chosenAnswer = selection.dataset["number"];

    if (chosenAnswer == chosenQuestion.answer) {
      choice3.setAttribute("style", "border: 1px solid green");
    } else {
      choice3.setAttribute("style", "border: 1px solid red");
      timerCount -= 10;
    }

    setTimeout(function delay() {
      choice3.removeAttribute("style", "border:");
      if (questionAmount.length > 0) {
        renderQuestion();
      } else if (questionAmount.length === 0) {
        isWin = true;
      }
    }, 1000);
  });

  choice4.addEventListener("click", function (event) {
    chooseAnswer = false;
    var selection = event.target;
    var chosenAnswer = selection.dataset["number"];

    if (chosenAnswer == chosenQuestion.answer) {
      choice4.setAttribute("style", "border: 1px solid green");
    } else {
      choice4.setAttribute("style", "border: 1px solid red");
      timerCount -= 10;
    }

    setTimeout(function delay() {
      choice4.removeAttribute("style", "border:");
      if (questionAmount.length > 0) {
        renderQuestion();
      } else if (questionAmount.length === 0) {
        isWin = true;
      }
    }, 1000);
  });

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

  startGame();
}

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

  clearScores.addEventListener("click", function () {
    highscoreList.textContent = "";
    localStorage.clear();
  });

  renderScore();
}

function init() {
  var storedScores = JSON.parse(localStorage.getItem("score"));

  if (storedScores !== null) {
    scoreList = storedScores;
  }
}

init();

startButton.addEventListener("click", startQuiz);
scoreButton.addEventListener("click", highscoreList);
