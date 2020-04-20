var questions = [
    {
        title: "Question 1: Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Question 2: The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Question 3: The instructions for a function are enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "curly brackets"
    },
    {
        title: "Question 4: A property of an object that is a function is called a ____.",
        choices: ["method", "string", "stylesheet", "boolean"],
        answer: "method"
    },
    {
        title: "Question 5: The logical operator that represents 'or' is ____.",
        choices: ["||", "OR", "&&", "==="],
        answer: "||"
    }
];

function initQuiz() {

    var timeRemaining = 0;

    var startBtnEl = document.getElementById("start-button");
    var timerEl = document.getElementById("time-remaining");
    var finalScoreEl = document.getElementById("final-score");
    var numQuestions = questions.length;
    var landingContainerEl = document.getElementById("landing-container");
    var quizContainerEl = document.getElementById("quiz-container");
    var finalContainerEl = document.getElementById("final-container");
    var submitButtonEl = document.getElementById("submit-initials");
    var highScores = [];
    if (JSON.parse(localStorage.getItem('scores')) !== null) {
        highScores = JSON.parse(localStorage.getItem("scores"));
    }

    function startQuiz() {

        landingContainerEl.setAttribute("class", "container d-none");
        quizContainerEl.setAttribute("class", "container");

        var currentQuestion = 1;
        var score = 0;

        timeRemaining = numQuestions * 15;
        timerEl.setAttribute("value", timeRemaining);

        let myInterval = setInterval(function () {
            if (timeRemaining < 1) {
                clearInterval(myInterval);

                quizContainerEl.setAttribute("class", "container d-none");
                finalContainerEl.setAttribute("class", "container");
                return;
            }
            timeRemaining--;
            timerEl.setAttribute("value", timeRemaining);
        }, 1000);
        let clickTimeout = false;
        function generateQuestion(questionNum) {

            quizContainerEl.innerHTML = "";
            rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row");
            quizContainerEl.append(rowEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-0 col-sm-2");
            rowEl.append(colEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-12 col-sm-8");
            rowEl.append(colEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-0 col-sm-2");
            rowEl.append(colEl);

            colEl = rowEl.children[1];
            rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row mb-3");
            colEl.append(rowEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-12");
            rowEl.append(colEl);

            headerEl = document.createElement("h2");
            headerEl.innerHTML = questions[questionNum - 1].title;
            colEl.append(headerEl);

            colEl = quizContainerEl.children[0].children[1];
            for (let i = 0; i < 4; i++) {
                let rowEl = document.createElement("div");
                rowEl.setAttribute("class", "row mb-1");
                colEl.append(rowEl);

                let colEl2 = document.createElement("div");
                colEl2.setAttribute("class", "col-12");
                rowEl.append(colEl2);

                buttonEl = document.createElement("button");
                buttonEl.setAttribute("class", "btn btn-primary");
                buttonEl.setAttribute("type", "button");
                buttonEl.innerHTML = questions[currentQuestion - 1].choices[i];
                colEl2.append(buttonEl);
                buttonEl.addEventListener("click", function () {

                    if (clickTimeout) {
                        return;
                    }
                    clickTimeout = true;
                    clearInterval(myInterval);
                    let colEl = quizContainerEl.children[0].children[1];
                    let rowEl = document.createElement("div");
                    rowEl.setAttribute("class", "row border-top");
                    colEl.append(rowEl);

                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-12");
                    rowEl.append(colEl);

                    let parEl = document.createElement("p");
                    colEl.append(parEl);
                    if (this.innerHTML === questions[currentQuestion - 1].answer) {
                        parEl.innerHTML = "Correct!";
                    } else {
                        parEl.innerHTML = "Incorrect";
                        timeRemaining = timeRemaining - 15;
                        if (timeRemaining < 0) {
                            timeRemaining = 0;
                        }
                        timerEl.setAttribute("value", timeRemaining);
                    }
                    currentQuestion++;
                    if (currentQuestion > questions.length) {
                        score = timeRemaining;
                    }
                    setTimeout(function () {

                        if (currentQuestion > questions.length) {

                            quizContainerEl.setAttribute("class", "container d-none");
                            finalContainerEl.setAttribute("class", "container");
                            finalScoreEl.setAttribute("value", score);
                        } else {
                            generateQuestion(currentQuestion);
                            clickTimeout = false;
                            myInterval = setInterval(function () {
                                if (timeRemaining < 1) {
                                    clearInterval(myInterval);
                                    quizContainerEl.setAttribute("class", "container d-none");
                                    finalContainerEl.setAttribute("class", "container");
                                    return;
                                }
                                timeRemaining--;
                                timerEl.setAttribute("value", timeRemaining);
                            }, 1000);
                        }
                    }, 2000);
                });
            }


        }
        function saveHighScore() {
            let initialsEl = document.getElementById("initials-entry");
            let newHighScore = {
                initials: initialsEl.value,
                highScore: score
            };
            console.log(newHighScore);
            highScores.push(newHighScore);
            console.log(highScores);
            localStorage.setItem("scores", JSON.stringify(highScores));
        }
        submitButtonEl.addEventListener("click", saveHighScore);

        generateQuestion(currentQuestion);
    }

    startBtnEl.addEventListener("click", startQuiz);

}

initQuiz();





