var flashedButton = $(".btn")[Math.floor(Math.random() * 4)];
var buttonClicked = 0;
var clickCounter = 0;
var startText = "Press A Key to Start";
var gameOverText = "Press A Key to Restart"
var n = 1;
var c = 0;
var answer = []; // keeps refreshing
var sequence = []; //remains same and increasing

function soundEffect(buttonColor) {
  switch (buttonColor) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;

    default:
      yellow.play();
  }
}

// starting the game
$(document).on("keydown", start);
function start() {
  $("h1").text("Level " + n);
  setTimeout(function() {
    flashRandomButton();
  }, 1000)
  sequence.push(flashedButton.id);
}

// flashing a button and adding sound to it
function flashRandomButton() {
  flashedButton.classList.add("pressed");
  setTimeout(function() {
    flashedButton.classList.remove("pressed");
  }, 100);
  soundEffect(flashedButton.id);
}

$(".btn").on("click", function() {
  buttonClicked = this.id;
  clickCounter++;
  answer.push(buttonClicked);
  soundEffect(buttonClicked);
  $("div " + "." + buttonClicked).addClass("pressed");

  setTimeout(function() {
    $("div " + "." + buttonClicked).removeClass("pressed");
  }, 100);
  if (clickCounter < n) {
    if (answer[c] === sequence[c]) {
      c++;
    } else {
      gameOver();
    }
  } else {
    ifAnswerIsCorrect();
  }
});

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
// checking if the player guessed the sequence correctly
function ifAnswerIsCorrect() {


  if (arrayEquals(answer, sequence) === true) {
    setTimeout(function() {
      for (i = 0; i < n; i++) {
        flashedButton = $(".btn")[Math.floor(Math.random() * 4)]; }
      n++;
      answer = [];
      c = 0;
      clickCounter = 0;
      start();
    }, 1000); } else {
    gameOver();
  }
}

function gameOver() {
  $("body").css("backgroundColor", "red");
  setTimeout(function() {
    $("body").css("backgroundColor", "#011F3F");
  }, 100);
  $("body").css("backgroundColor", "red");
  setTimeout(function() {
    $("body").css("backgroundColor", "#011F3F");
  }, 100);
  $("h1").text("Game Over, press any button to start again");
  soundEffect("wrong");
  $(document).on("keydown", function() {
    buttonClicked = 0;
    clickCounter = 0;
    n = 1;
    c = 0;
    answer = [];
    sequence = [];
    start();
  });
}
