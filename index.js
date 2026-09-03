/* import "core-js/stable";
import "regenerator-runtime/runtime"; */

const body = document.querySelector("body");
const container = document.querySelector(".container");
const modeBtn = document.querySelector(".mode-btn");
const choiceContainer = document.querySelector(".choice-container");
const message = document.querySelector(".message");
const playerImg = document.querySelector(".player-img");
const computerImg = document.querySelector(".computer-img");

let mode;
const hands = ["rock", "paper", "scissors"];
const images = {
  rock: new URL("./images/rock.png", import.meta.url).href,
  paper: new URL("./images/paper.png", import.meta.url).href,
  scissors: new URL("./images/scissors.png", import.meta.url).href,
};

const init = function () {
  if (JSON.parse(localStorage.getItem("screenMode"))) {
    mode = JSON.parse(localStorage.getItem("screenMode"));
    body.style.transition = "all 0s";
    container.style.transition = "all 0s";
    if (mode === "dark") {
      body.classList.add("dark-mode");
      modeBtn.name = "moon-outline";
    }
    if (mode === "light") {
      body.classList.remove("dark-mode");
      modeBtn.name = "sunny-outline";
    }
  }
  message.textContent = "Let's play!";
};

init();
/* DARK MODE */

const changeMode = function () {
  body.style.transition = "all 0.3s ease";
  container.style.transition = "all 0.3s ease";
  body.classList.toggle("dark-mode");
  modeBtn.name =
    modeBtn.name === "sunny-outline" ? "moon-outline" : "sunny-outline";
  mode = modeBtn.name === "sunny-outline" ? "light" : "dark";
  localStorage.setItem("screenMode", JSON.stringify(mode));
};

modeBtn.addEventListener("click", changeMode);

/* GAME LOGIC */

const handleGame = function (e) {
  if (e.target.classList.contains("choice-container")) {
    return;
  }
  let randomNumber = Math.floor(Math.random() * 3);
  let computerChoice = hands[randomNumber];
  document
    .querySelectorAll(".choice")
    .forEach((choice) => (choice.style.opacity = "60%"));
  e.target.closest(".choice").style.opacity = "1";
  let playerChoice = e.target.closest(".choice").dataset.choice;
  message.textContent = "Waiting...";
  playerImg.src = images["rock"];
  playerImg.style.animation = "";
  computerImg.src = images["rock"];
  computerImg.style.animation = "";
  playerImg.offsetWidth;
  computerImg.offsetWidth;
  setTimeout(function () {
    if (computerChoice === playerChoice) {
      message.textContent = "Draw!";
    }
    if (
      (computerChoice === "rock" && playerChoice === "scissors") ||
      (computerChoice === "paper" && playerChoice === "rock") ||
      (computerChoice === "scissors" && playerChoice === "paper")
    ) {
      message.textContent = "Computer wins!";
    }
    if (
      (computerChoice === "scissors" && playerChoice === "rock") ||
      (computerChoice === "rock" && playerChoice === "paper") ||
      (computerChoice === "paper" && playerChoice === "scissors")
    ) {
      message.textContent = "Player wins!";
    }
    playerImg.src = images[playerChoice];
    computerImg.src = images[computerChoice];
  }, 3000);
  playerImg.style.animation = "tilt-down-player 1s ease 3";
  computerImg.style.animation = "tilt-down-computer 1s ease 3";
};

choiceContainer.addEventListener("click", handleGame);
