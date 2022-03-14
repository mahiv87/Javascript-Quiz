var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector("#timer");
var loseElement = document.querySelector("#lose-text")

var questionElement = document.querySelector("#question");
var choiceElement = Array.from(document.querySelectorAll(".choice"));
var timerElement = document.querySelector("#timer");

var chosenQuestion = {};
var timer;
var timerCount;

var questions = [
    {
        question: 'JavaScript is a ___-side programming language.',
        optionA: 'A. Client',
        optionB: 'B. Server',
        optionC: 'C. Both',
        optionD: 'D. None',
        answer: 'c',

    },
    {
        question: 'Which of the following will write the message “Hello World!” in an alert box?',
        optionA: 'A. alertBox(“Hello World!”);',
        optionB: 'B. alert(Hello World!);',
        optionC: 'C. msgAlert(“Hello World!”);',
        optionD: 'D. alert(“Hello World!”);',
        answer: 'd',

    },
    {
        question: 'How do you find the minimum of x and y using JavaScript?',
        optionA: 'A. min(x,y);',
        optionB: 'B. Math.min(x,y);',
        optionC: 'C. Math.min(xy);',
        optionD: 'D. min(xy);',
        answer: 'b',

    },
    {
        question: 'Which is the correct JavaScript syntax to change the HTML content given? "<p id=”test”>Hello World!</p>"',
        optionA: 'A. document.getElementById(“test”).innerHTML = “Hello DataFlair!”;',
        optionB: 'B. document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;',
        optionC: 'C. document.getElementById(test).innerHTML = “Hello DataFlair!”;',
        optionD: 'D. document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;',
        answer: 'a',

    },
    {
        question: 'Arrays in JavaScript can be used to store _____.',
        optionA: 'A. numbers and strings',
        optionB: 'B. other arrays',
        optionC: 'C. booleans',
        optionD: 'D. all of the above',
        answer: 'd',

    }
]

function startGame() {
    isWin = false;
    timerCount = 5;
    renderQuestion();
    startTimer();
}

function renderQuestion(){
    chosenQuestion = [...questions];
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }

        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function loseGame() {
    document.querySelector("#lose-text").innerHTML = "You ran out of time!";
    var restartGame = document.createElement('a');
    restartGame.setAttribute("href", "./index.html");    
    restartGame.setAttribute("style", "max-width: 20rem; font-size: 2rem; font-weight: bold; text-decoration: none; border: 1px solid #d88373; border-radius: 4px; padding: 5px 10px; background-color: #d88373; color: #212121;");
    var restart = document.createTextNode("Restart Game");
    restartGame.appendChild(restart);
    loseElement.appendChild(restartGame);
}


startGame();
