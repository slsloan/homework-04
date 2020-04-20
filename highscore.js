var myHighScores = JSON.parse(localStorage.getItem("scores"));
var highScoreListEl = document.getElementById("high-score-list");

for (i = 0; i < myHighScores.length; i++) {
    highScoreListEl.innerHTML("Initials: " + myHighScores[i].initials + "   Score: " + myHighScores[i].highScore);
}

var clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", function () {
    localStorage.clear();
});
