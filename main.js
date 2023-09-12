// JavaScript code
const moveSpeed = 3;
const gravity = 0.5;
let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");
let soundPoint = new Audio("sounds effect/point.mp3");
let soundDie = new Audio("sounds effect/die.mp3");

let background = document.querySelector(".background").getBoundingClientRect();
let scoreVal = document.querySelector(".score-val");
let scoreTitle = document.querySelector(".score-title");
let message = document.querySelector(".message");

let gameState = "Start";
img.style.display = "none";
message.classList.add("massageStyle");

document.addEventListener("click", () => {
  if (gameState === "Start") {
    startGame();
  } else if (gameState === "Play") {
    jump();
  } else if (gameState === "End") {
    resetGame();
  }
});

function startGame() {
  document.querySelectorAll(".pipe_sprite").forEach((e) => {
    e.remove();
  });
  img.style.display = "block";
  bird.style.top = "40vh";
  gameState = "Play";
  message.innerHTML = "";
  scoreTitle.innerHTML = "Score: ";
  scoreVal.innerHTML = "0";
  message.classList.remove("massageStyle");

  // Show the volume icon
  document.getElementById("volume-icon").style.display = "block";

  play();
}

function resetGame() {
  window.location.reload();
}

function jump() {
  if (gameState === "Play") {
    birdDY = -7;
    img.src = "images/Bird-2.png";
  }
}

function play() {
  let birdDY = 0;
  let birdProps = bird.getBoundingClientRect();

  function move() {
    if (gameState !== "Play") return;

    let pipeSprite = document.querySelectorAll(".pipe_sprite");
    pipeSprite.forEach((element) => {
      let pipeSpriteProps = element.getBoundingClientRect();
      birdProps = bird.getBoundingClientRect();

      if (pipeSpriteProps.right <= 0) {
        element.remove();
      } else if (
        birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width &&
        birdProps.left + birdProps.width > pipeSpriteProps.left &&
        birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height &&
        birdProps.top + birdProps.height > pipeSpriteProps.top
      ) {
        gameState = "End";
        message.innerHTML = "Game Over. Click To Restart";
        message.classList.add("massageStyle");
        img.style.display = "none";
        soundDie.play();
        return;
      } else if (
        pipeSpriteProps.right < birdProps.left &&
        pipeSpriteProps.right + moveSpeed >= birdProps.left &&
        element.getAttribute("data-increase-score") == "1"
      ) {
        scoreVal.innerHTML = parseInt(scoreVal.innerHTML) + 1;
        soundPoint.play();
      }
      element.style.left = pipeSpriteProps.left - moveSpeed + "px";
    });
    requestAnimationFrame(move);
  }

  requestAnimationFrame(move);

  document.addEventListener("click", () => {
    if (gameState === "Play") {
      img.src = "images/Bird-2.png";
      birdDY = -7.6;
    }
  });

  function applyGravity() {
    if (gameState !== "Play") return;

    birdDY = birdDY + gravity;

    if (birdProps.top <= 0 || birdProps.bottom >= background.bottom) {
      gameState = "End";
      message.innerHTML = "Game Over".fontcolor("red") + " Click To Restart";
      message.classList.add("massageStyle");
      img.style.display = "none";
      soundDie.play();
      return;
    }

    bird.style.top = birdProps.top + birdDY + "px";
    birdProps = bird.getBoundingClientRect();
    requestAnimationFrame(applyGravity);
  }

  applyGravity();

  let pipeGap = 35;
  let pipeSeparation = 0;

  function createPipe() {
    if (gameState !== "Play") return;

    if (pipeSeparation > 115) {
      pipeSeparation = 0;

      let pipePosi = Math.floor(Math.random() * 43) + 8;
      let pipeSpriteInv = document.createElement("div");
      pipeSpriteInv.className = "pipe_sprite";
      pipeSpriteInv.style.top = pipePosi - 70 + "vh";
      pipeSpriteInv.style.left = "100vw";
      document.body.appendChild(pipeSpriteInv);

      let pipeSprite = document.createElement("div");
      pipeSprite.className = "pipe_sprite";
      pipeSprite.style.top = pipePosi + pipeGap + "vh";
      pipeSprite.style.left = "100vw";
      pipeSprite.setAttribute("data-increase-score", "1");
      document.body.appendChild(pipeSprite);
    }
    pipeSeparation++;
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);
}

function resetGame() {
  startGame();
}

// let isMuted = false;
// const volumeIcon = document.getElementById("volume-icon");

// volumeIcon.addEventListener("click", toggleMute);
// function toggleMute(event) {
//   if (event.target.id === "volume-icon") {
//     const audioElements = [soundPoint, soundDie]; // Add all your audio elements here

//     if (isMuted) {
//       // Unmute
//       audioElements.forEach((audio) => {
//         audio.volume = 1; // Set the volume back to full
//       });
//       volumeIcon.classList.remove("fa-volume-mute");
//       volumeIcon.classList.add("fa-volume-high");
//     } else {
//       // Mute
//       audioElements.forEach((audio) => {
//         audio.volume = 0; // Set the volume to 0 (mute)
//       });
//       volumeIcon.classList.remove("fa-volume-high");
//       volumeIcon.classList.add("fa-volume-mute");
//     }

//     isMuted = !isMuted;
//   }
// }

const gameContainer = document.querySelector(".game-container");

gameContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("mute-button")) {
    if (gameState === "Start") {
      startGame();
    } else if (gameState === "Play") {
      jump();
    } else if (gameState === "End") {
      resetGame();
    }
  }
});

function resetGame() {
  startGame();
}

function startGame() {
  document.querySelectorAll(".pipe_sprite").forEach((e) => {
    e.remove();
  });
  img.style.display = "block";
  bird.style.top = "40vh";
  gameState = "Play";
  message.innerHTML = "";
  scoreTitle.innerHTML = "Score: ";
  scoreVal.innerHTML = "0";
  message.classList.remove("massageStyle");

  play();
}
