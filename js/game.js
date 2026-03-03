// ==============================
// MEME FLAPPY PRO - FINAL STABLE VERSION
// ==============================

// DOM
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const player = document.getElementById("player");
const pipesContainer = document.getElementById("pipesContainer");

const scoreDisplay = document.getElementById("scoreDisplay");
const finalScore = document.getElementById("finalScore");
const bestScoreText = document.getElementById("bestScore");
const bestScoreStart = document.getElementById("bestScoreStart");

const crashGif = document.getElementById("crashGif");

// ==============================
// GAME VARIABLES
// ==============================

let gravity = 0.5;
let jumpPower = -9;
let velocity = 0;
let playerY = 200;
let rotation = 0;

let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

let gameRunning = false;
let animationFrame;
let pipeInterval;

const PIPE_GAP = 250;
const PIPE_SPEED = 2;
const MIN_PIPE_HEIGHT = 100;
const MAX_PIPE_HEIGHT = 280;
const GAME_HEIGHT = 600;

// ==============================
// AUDIO (Correct Paths)
// ==============================

const bgMusic = new Audio("../assets/bg.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.6;

const crashSound = new Audio("../assets/bg.mp4");

// Game over background music
const gameOverMusic = new Audio("../assets/bg.mp4");
gameOverMusic.loop = true;
gameOverMusic.volume = 0.5;

// ==============================
// INITIALIZE BEST SCORE
// ==============================

bestScoreStart.innerText = bestScore;
bestScoreText.innerText = bestScore;

// ==============================
// START GAME
// ==============================

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

function startGame() {

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    resetGame();

    gameRunning = true;   // 🔥 IMPORTANT FIX

    // Stop game over music if playing
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;

    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});

    pipeInterval = setInterval(createPipe, 2400);
    gameLoop();
}

// ==============================
// RESET GAME
// ==============================

function resetGame() {

    score = 0;
    velocity = 0;
    playerY = 200;
    rotation = 0;

    player.style.top = playerY + "px";
    player.style.transform = "rotate(0deg)";
    scoreDisplay.innerText = score;

    pipesContainer.innerHTML = "";
    crashGif.innerHTML = "";
}

// ==============================
// GAME LOOP
// ==============================

function gameLoop() {

    if (!gameRunning) return;

    velocity += gravity;
    playerY += velocity;

    const roundedY = Math.floor(playerY);

    rotation = Math.min(Math.max(velocity * 3, -25), 90);

    player.style.top = roundedY + "px";
    player.style.transform = `rotate(${rotation}deg)`;

    checkCollision();

    animationFrame = requestAnimationFrame(gameLoop);
}

// ==============================
// CONTROLS
// ==============================

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && gameRunning) jump();
});

document.addEventListener("click", () => {
    if (gameRunning) jump();
});

function jump() {
    velocity = jumpPower;
}

// ==============================
// CREATE PIPE
// ==============================

function createPipe() {

    const pipeTopHeight = Math.floor(
        Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT) + MIN_PIPE_HEIGHT
    );

    const topPipe = document.createElement("img");
    const bottomPipe = document.createElement("img");

    topPipe.src = "../assets/pipe.png";
    bottomPipe.src = "../assets/pipe.png";

    topPipe.classList.add("pipe");
    bottomPipe.classList.add("pipe");

    topPipe.style.transform = "rotate(180deg)";
    topPipe.style.transformOrigin = "center center";

    topPipe.style.height = pipeTopHeight + "px";
    topPipe.style.top = "0";

    bottomPipe.style.height =
        (GAME_HEIGHT - pipeTopHeight - PIPE_GAP) + "px";
    bottomPipe.style.bottom = "0";

    pipesContainer.appendChild(topPipe);
    pipesContainer.appendChild(bottomPipe);

    movePipe(topPipe, bottomPipe);
}

// ==============================
// MOVE PIPE
// ==============================

function movePipe(topPipe, bottomPipe) {

    let pipeX = 400;

    const move = setInterval(() => {

        if (!gameRunning) {
            clearInterval(move);
            return;
        }

        pipeX -= PIPE_SPEED;
        const roundedX = Math.floor(pipeX);

        topPipe.style.left = roundedX + "px";
        bottomPipe.style.left = roundedX + "px";

        if (roundedX < -100) {
            topPipe.remove();
            bottomPipe.remove();
            clearInterval(move);
        }

        // Score trigger
        if (roundedX === 80) {
            score++;
            scoreDisplay.innerText = score;
        }

    }, 20);
}

// ==============================
// COLLISION
// ==============================

function checkCollision() {

    const playerRect = player.getBoundingClientRect();
    const pipes = document.querySelectorAll(".pipe");

    pipes.forEach(pipe => {

        const pipeRect = pipe.getBoundingClientRect();

        if (
            playerRect.left < pipeRect.right &&
            playerRect.right > pipeRect.left &&
            playerRect.top < pipeRect.bottom &&
            playerRect.bottom > pipeRect.top
        ) {
            gameOver();
        }
    });

    if (playerY > GAME_HEIGHT - player.clientHeight || playerY < 0) {
        gameOver();
    }
}

// ==============================
// GAME OVER
// ==============================

function gameOver() {

    gameRunning = false;

    cancelAnimationFrame(animationFrame);
    clearInterval(pipeInterval);

    bgMusic.pause();
    bgMusic.currentTime = 0;

    crashSound.currentTime = 0;
    crashSound.play().catch(() => {});

    // Play game over background music after a short delay
    setTimeout(() => {
        gameOverMusic.currentTime = 0;
        gameOverMusic.play().catch(() => {});
    }, 800);

    updateBestScore();

    finalScore.innerText = score;
    bestScoreText.innerText = bestScore;

    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");

    showCrashGif();
}

// ==============================
// BEST SCORE
// ==============================

function updateBestScore() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }
}

// ==============================
// CRASH GIF
// ==============================

function showCrashGif() {
    const gif = document.createElement("img");
    gif.src = "../assets/crash.gif";
    crashGif.appendChild(gif);
}