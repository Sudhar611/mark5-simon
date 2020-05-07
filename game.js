var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelCount = 0;
var started = false;

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length)
})

function nextSequence() {
  levelCount++;
  $("h1").text("Level " + levelCount);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  switch (name) {
    case "blue":
      var colourSound = new Audio("sounds/blue.mp3");
      colourSound.play();
      break;

    case "green":
      var colourSound = new Audio("sounds/green.mp3");
      colourSound.play();
      break;

    case "red":
      var colourSound = new Audio("sounds/red.mp3");
      colourSound.play();
      break;

    case "yellow":
      var colourSound = new Audio("sounds/yellow.mp3");
      colourSound.play();
      break;

    default:
      console.log(randomChosenColour);

  }

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
    if(currentLevel===gamePattern.length){
      userClickedPattern=[];
      setTimeout(nextSequence,1000);
    }
  }else{
    var colourSound = new Audio("sounds/wrong.mp3");
    colourSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    started=false;
    levelCount=0;
    userClickedPattern=[];
    gamePattern=[];
  }
}
