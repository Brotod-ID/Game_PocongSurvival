// ==========================
// STATE GAME
// ==========================
let gameState = "menu"; // menu | playing | gameover
let score = 0;

// ==========================
// ELEMEN HTML
// ==========================
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const gameOverScreen = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const jumpBtn = document.getElementById("jumpBtn");
const backMenuBtn = document.getElementById("backMenuBtn");

const scoreText = document.getElementById("score");
const finalScoreText = document.getElementById("finalScore");
const messageText = document.getElementById("message");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ==========================
// ASSET PLACEHOLDER (ISI NANTI)
// ==========================

// Gambar karakter
const ocongImg = new Image();
ocongImg.src = "assets/images/ocong.png"; // ← TARUH GAMBAR OCONG DI SINI

const ustadzImg = new Image();
ustadzImg.src = "assets/images/ustadz.png"; // ← TARUH GAMBAR USTADZ DI SINI

// Sound
const menuSound = new Audio("assets/sounds/menu.mp3"); // ← SOUND MENU
const chaseSound = new Audio("assets/sounds/chase.mp3"); // ← SOUND GAMEPLAY
const deathSound = new Audio("assets/sounds/death.mp3"); // ← SOUND MATI

menuSound.loop = true;
chaseSound.loop = true;


// SETUP CANVAS RESPONSIVE

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// PLAYER (OCONG)

let ocong = {
  x: 100,
  y: 200,
  width: 60,
  height: 60,
  velocity: 0,
  gravity: 0.5,
  jumpPower: -10
};


// MULAI GAME

startBtn.onclick = () => {
  gameState = "playing";
  menu.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  score = 0;
  scoreText.textContent = "Score: 0";

  menuSound.pause();
  chaseSound.currentTime = 0;
  chaseSound.play();

  gameLoop();
};

// ==========================
// LOMPAT
// ==========================
function jump() {
  if (gameState === "playing") {
    ocong.velocity = ocong.jumpPower;
  }
}
jumpBtn.addEventListener("click", jump);
jumpBtn.addEventListener("touchstart", jump);

// ==========================
// GAME OVER
// ==========================
function gameOver() {
  gameState = "gameover";

  chaseSound.pause();
  deathSound.currentTime = 0;
  deathSound.play();

  gameContainer.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");

  finalScoreText.textContent = "Score: " + score;

  if (score < 5) {
    messageText.textContent = "Ocong masih cupu 😭";
  } else if (score <= 10) {
    messageText.textContent = "Lumayan selamat dari ustadz 😰";
  } else {
    messageText.textContent = "Ocong master kabur 😱🔥";
  }
}

// ==========================
// KEMBALI KE MENU
// ==========================
backMenuBtn.onclick = () => {
  gameState = "menu";
  gameOverScreen.classList.add("hidden");
  menu.classList.remove("hidden");

  menuSound.currentTime = 0;
  menuSound.play();
};

// ==========================
// GAME LOOP DASAR
// ==========================
function gameLoop() {
  if (gameState !== "playing") return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // GRAVITASI
  ocong.velocity += ocong.gravity;
  ocong.y += ocong.velocity;

  // GAMBAR OCONG (jika asset belum ada, tampil kotak putih)
  
    ctx.drawImage(assets/image/ocong.png, ocong.x, ocong.y, ocong.width, ocong.height);
 
  // BATAS BAWAH
  if (ocong.y + ocong.height > canvas.height) {
    gameOver();
  }

  requestAnimationFrame(gameLoop);
}

// ==========================
// SOUND MENU SAAT LOAD
// ==========================
menuSound.play().catch(() => {});

