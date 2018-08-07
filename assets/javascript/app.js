var startscreen;
var gamescreen;
var counter = 30;
var questions = ["Insects outnumber humans 1,000 to one.", "Table tennis balls have been known to travel off the paddle at speeds up to 160 km/h.", "The giant squid has the second largest eyes in the world.", "Your tongue is one of the only muscles in your body that is attached at one end.", "A duck's quack doesn't echo, and no one knows why."];
var answers = [["True", "False"], ["True", "False"], ["True", "False"], ["True", "False"], ["True", "False"]];
var correctAnswers = ["False", "True", "False", "False", "True"];
var questionCounter = 0;
var selectedAnswer;
var clock;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

//initial screen when the page loads
$(document).ready(function () {
    function initialScreen() {
        startscreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button'>Start Quiz</a></p>";
        $("#gameContent").html(startscreen);

    }

    initialScreen();
});



//generate content when start button is clicked, replace html in gameContent div

$("body").on("click", ".start-button", function (event) {
    event.preventDefault();
    generateHtml();

    timerWrapper();
});

// click event for when an answer is selected
$("body").on("click", ".answer", function (event) {
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
        clearInterval(clock);
        correct();
    }
    else {
        clearInterval(clock);
        incorrect();
    }
});

//function for selecting a correct answer

function correct() {
    //track correct answers
    correctCounter++;
    //change gamescreen contents
    gamescreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
    $("#gameContent").html(gamescreen);
    //move on to next question after 4 seconds
    setTimeout(next, 4000);
}

function incorrect() {
    incorrectCounter++;
    gamescreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>";
    $("#gameContent").html(gamescreen);
    setTimeout(next, 4000);
}

//function that gives unanswered for running out of time
function OutofTime() {
    unansweredCounter++;
    gamescreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
    $("#gameContent").html(gamescreen);
    setTimeout(next, 4000);
}

//set up initial gamescreen with timer, question, and answers
function generateHtml() {
    gamescreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionCounter] + "</p><button class='first-answer answer'>" + answers[questionCounter][0] + "</button><button class='answer'>" + answers[questionCounter][1] + "</button>";
    $("#gameContent").html(gamescreen);
}

//creat function that progresses the question and the content in gameContent div, reset timer
function next() {
    if (questionCounter < 4) {
        questionCounter++;
        generateHtml();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

//set up timer and determine what happens when timer reaches 0
function timerWrapper() {
    clock = setInterval(timer, 1000);
    function timer() {
        if (counter === 0) {
            clearInterval(clock);
            OutofTime();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter)
    }
}

//screen after all question are gone through, show correct, incorrect, unanswered, add reset button
function finalScreen() {
    clearInterval(clock)
    gamescreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCounter + "</p>" + "<p>Wrong Answers: " + incorrectCounter + "</p>" + "<p>Unanswered: " + unansweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button'>Play Again!</a></p>";
    $("#gameContent").html(gamescreen);
    //click event for reset button to restart the game
    $("#gameContent").on("click", ".reset-button",resetGame)
}

function resetGame() {
    questionCounter = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    counter = 30;
    generateHtml();
    timerWrapper();
}

