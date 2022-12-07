// Step 2
// const planSwitch = document.querySelector(".plan-checkbox");
// const planSwitchPeriods = document.querySelectorAll(".plan-switch-period");
// const priceSpans = document.querySelectorAll(".choice-description span");
// const choiceContainers = document.querySelectorAll(".choice-container ");
// const step3PriceSpan = document.querySelectorAll(.price span);

// planSwitch.addEventListener("click", function (e) {
//   planSwitchPeriods.forEach((e) => {
//     e.classList.toggle("active");
//   });
//   priceSpans.forEach((priceSpan) => {
//     priceSpan.classList.toggle("d-none");
//   });
//    step3PriceSpan.forEach((step3priceSpan) => {
//     priceSpan.classList.toggle("d-none");
//   });
// });
// choiceContainers.forEach((choiceContainer) => {
//   choiceContainer.addEventListener("click", function (event) {
//     choiceContainers.forEach((e) => {
//       if (e.classList.contains("active")) {
//         e.classList.remove("active");
//       }
//     });
//     this.classList.toggle("active");
//   });
// });

// Step 3
const step3ChoiceContainers = document.querySelectorAll(
  ".step-3 .choice-container"
);
const step3ChoiceContainersInput = document.querySelector(
  ".step-3 .choice-container input[type='checkbox']"
);
const step3ChoiceContainersInputs = document.querySelectorAll(
  ".step-3 .choice-container input[type='checkbox']"
);

function checkChecks() {
  step3ChoiceContainersInputs.forEach((input) => {
    if (input.checked) {
      input.closest(".choice-container").classList.add("active");
    } else if (!input.checked) {
      input.closest(".choice-container").classList.remove("active");
    }
  });
}
console.log(step3ChoiceContainers);
console.log(step3ChoiceContainersInput);

step3ChoiceContainersInput.checked = true;
checkChecks();
step3ChoiceContainers.forEach((container) => {
  container.addEventListener("click", function () {
    console.log(this.children[0].children[0].checked === false);

    if (this.children[0].children[0].checked === true) {
      this.children[0].children[0].checked = false;
    } else if (this.children[0].children[0].checked === false) {
      this.children[0].children[0].checked = true;
    }
    checkChecks();
  });
});
step3ChoiceContainersInputs.forEach((input) => {
  input.addEventListener("click", function (e) {
    checkChecks(input);
  });
  console.log(input.checked);
});
