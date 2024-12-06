console.log("script running");

const progressBar = document.querySelector("#progressbar");
const status = document.querySelector("#status");
const principalInput = document.querySelector("#principal");
const interestInput = document.querySelector("#rate");
const timesRadioButtons = document.querySelectorAll(
  'input[name="timescompounded"]'
);
const yearsInput = document.querySelector("#years");

const interestOutput = document.querySelector("#interest");
const totalOutput = document.querySelector("#total");

principalInput.addEventListener("input", calculateInterest);
interestInput.addEventListener("input", calculateInterest);
for (const radioButton of timesRadioButtons) {
  radioButton.addEventListener("change", calculateInterest);
}
yearsInput.addEventListener("input", calculateInterest);

function calculateInterest(e) {
  const principal = Number(principalInput.value);
  const rate = Number(interestInput.value) / 100;
  const time = this.value;
  const years = Number(yearsInput.value);

  /* Calculate compound interest - https://www.geeksforgeeks.org/javascript-program-to-find-compound-interest/#*/
  const calculatedInterest =
    principal * Math.pow(1 + rate / time, time * years);
  const totalInterest = calculatedInterest.toFixed(2);
  const accumulatedInterest = (totalInterest - principal).toFixed(2);

  interestOutput.textContent = accumulatedInterest;
  totalOutput.textContent = totalInterest;
  updateProgressBar();
}

function updateProgressBar() {
  let progressCounter = 0;
  if (principalInput.value != "") {
    progressCounter += 1;
  }
  if (interestInput.value != "") {
    progressCounter += 1;
  }
  for (const radioButton of timesRadioButtons) {
    if (radioButton.checked) {
      progressCounter += 1;
    }
  }
  if (yearsInput.value != "") {
    progressCounter += 1;
  }
  if (progressCounter == 4) {
    status.textContent = `Completed (${progressCounter}/4)`;
  } else {
    status.textContent = `In Progress (${progressCounter}/4)`;
  }
  progressBar.value = progressCounter;
}
