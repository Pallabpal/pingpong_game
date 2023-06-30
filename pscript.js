// Game variables

  
var paddleA = document.getElementById("paddleA");
var paddleB = document.getElementById("paddleB");
var ball = document.getElementById("ball");
var scoreA = document.getElementById("scoreA");
var scoreB = document.getElementById("scoreB");
var gameContainer = document.getElementById("game-container");
var startButton = document.getElementById("start-button");

var containerWidth = gameContainer.offsetWidth;
var containerHeight = gameContainer.offsetHeight;

var paddleHeight = paddleA.offsetHeight;
var paddleSpeed = 5;

var ballSize = ball.offsetWidth;
var ballSpeedX = 4;
var ballSpeedY = 4;

var playerAScore = 0;
var playerBScore = 0;

var gameRunning = false;
var animationFrameId;

// Reset ball position
function resetBall() {
  ball.style.left = containerWidth / 2 - ballSize / 2 + "px";
  ball.style.top = containerHeight / 2 - ballSize / 2 + "px";
}

// Move paddles
function movePaddle(event) {
  var paddlePosition = paddleA.offsetTop;

  if (event.key === "ArrowUp" && paddlePosition > 0) {
    paddleA.style.top = paddlePosition - paddleSpeed + "px";
    paddleB.style.top = paddlePosition - paddleSpeed + "px";
  } else if (event.key === "ArrowDown" && paddlePosition < containerHeight - paddleHeight) {
    paddleA.style.top = paddlePosition + paddleSpeed + "px";
    paddleB.style.top = paddlePosition + paddleSpeed + "px";
  }
}

// Move ball
function moveBall() {
  var ballX = ball.offsetLeft + ballSpeedX;
  var ballY = ball.offsetTop + ballSpeedY;

  // Ball collision with paddles
  if (
    ballX <= paddleA.offsetLeft + paddleA.offsetWidth &&
    ballY + ballSize >= paddleA.offsetTop &&
    ballY <= paddleA.offsetTop + paddleA.offsetHeight
  ) {
    ballSpeedX *= -1;
    playerAScore++;
    scoreA.textContent = playerAScore;
  } else if (
    ballX + ballSize >= paddleB.offsetLeft &&
    ballY + ballSize >= paddleB.offsetTop &&
    ballY <= paddleB.offsetTop + paddleB.offsetHeight
  ) {
    ballSpeedX *= -1;
    playerBScore++;
    scoreB.textContent = playerBScore;
  }

  // Ball collision with top and bottom boundaries
  if (ballY <= 0 || ballY >= containerHeight - ballSize) {
    ballSpeedY *= -1;
  }

  // Ball collision with left and right boundaries
  if (ballX <= 0 || ballX >= containerWidth - ballSize) {
    endGame();
    return;
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  animationFrameId = requestAnimationFrame(moveBall);
}

// Start the game
function startGame() {
  if (gameRunning) {
    return;
  }

  gameRunning = true;
  startButton.disabled = true;
  scoreA.textContent = "0";
  scoreB.textContent = "0";
  resetBall();
  document.addEventListener("keydown", movePaddle);
  animationFrameId = requestAnimationFrame(moveBall);
}

// End the game
function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animationFrameId);
  document.removeEventListener("keydown", movePaddle);
  startButton.disabled = false;
  var wonplayer="playerA";
  if(playerBScore> playerAScore) wonplayer="playerB";
  else
  if(playerBScore===playerAScore) wonplayer="Draw Game"
  alert("Game Over! Score:\nPlayer A: " + playerAScore + "\nPlayer B: " + playerBScore+"\nResult: "+wonplayer);
  playerAScore=0;
  playerBScore=0;
}

// Event listeners for start button click and arrow key press
startButton.addEventListener("click", startGame);
document.addEventListener("keydown", function (event) {
  if (gameRunning) {
    movePaddle(event);
  }
});
