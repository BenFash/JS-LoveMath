// wait for dom to finish loading before running game
// get the button eleements and add event listners to them

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  //adds event listener to keyboard key enter. if pressed runs checkanswer function
  document
    .getElementById("answer-box")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  runGame("addition");
});

/**
 *  The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
  // sets input field to blank at the start of everygame.
  document.getElementById("answer-box").value = "";
  // makes curser start in the input field with.focus
  document.getElementById("answer-box").focus();

  // creates two random numbers between 1 and 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
  } else {
    alert(`Unkown game type: ${gameType}`);
    throw `Unkown game type: ${gameType}. Aborting`;
  }
}

/**
 * checks the answer against the first element in
 * the reurned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Hey you got it right! :)");
    incrementScore();
  } else {
    alert(
      `Awww. you answered ${userAnswer}, correct answer is ${calculatedAnswer[0]}!`
    );
    incrementWrongAnswer();
  }
  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus,minus etc)
 * directly from the dom, and returns the correct answer
 */

function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  } else if (operator === "-") {
    return [operand1 - operand2, "subtract"];
  } else if (operator === "/") {
    return [operand1 / operand2, "division"];
  } else {
    alert(`Unimplemeneted operator ${operator}`);
    throw `Unimplemeneted operator ${operator}. Aborting`;
  }
}

/**
 * Gets the current score from DOM and increments it by 1
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
  operand1 = operand1 * operand2;
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "/";
}
