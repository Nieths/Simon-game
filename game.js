// variables
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;


// User click

$(".btn").on('click', async function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  if (userClickedPattern.length == gamePattern.length) {
    if (compareArray(userClickedPattern, gamePattern)) {

      // if right
      nextSequence();
      playGamePattern();

      userClickedPattern = [];
    } else {
      // if wrong
      playSound("wrong");
      $("h1").text('Game Over💀 Press any key to start over');
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
    }

    // finish the game

    // replay the whole gamePattern and play nextsequence
  }
});

// Start game

$(document).on("keydown", function(event) {

  if (event.key)

  {
    if (level == 0) {
      userClickedPattern = [];
      nextSequence();
      $("#" + gamePattern[0]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[0]);
    }

  }

});


// functions
function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3')
  sound.play();
}

async function animatePress(color) {
  $("#" + color).addClass('pressed');
  await timer(100);
  $("#" + color).removeClass('pressed');
}

async function nextSequence() {
  console.log('Enter');
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  // playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function compareArray(user, pattern) {
  a = user.toString();
  b = pattern.toString();
  console.log(a === b);
  return a === b;
}

async function playGamePattern() {
  console.log('Entered PGP');
  for (var i = 0; i < gamePattern.length; i++) {
    await timer(1000);
    $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  }
}


// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))
