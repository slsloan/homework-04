var myHighScores = JSON.parse(localStorage.getItem("scores") || "[]");

for (var i = 0; i < myHighScores.length; i++) {
    var highScoreList = document.getElementById("high-scores-list");
    var newLi = document.createElement("li")
    newLi.textContent = "Intials: " + myHighScores[i].initials + " ---- Score: " + myHighScores[i].highScore;
    highScoreList.append(newLi);
}

var clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
