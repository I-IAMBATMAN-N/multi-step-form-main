const planSwitch = document.querySelector(".plan-checkbox");
const planSwitchPeriods = document.querySelectorAll(".plan-switch-period");
const priceSpans = document.querySelectorAll(".choice-description span");
const choiceContainers = document.querySelectorAll(".choice-container ");

planSwitch.addEventListener("click", function (e) {
  planSwitchPeriods.forEach((e) => {
    e.classList.toggle("active");
  });
  priceSpans.forEach((priceSpan) => {
    priceSpan.classList.toggle("d-none");
  });
});
choiceContainers.forEach((choiceContainer) => {
  choiceContainer.addEventListener("click", function (event) {
    choiceContainers.forEach((e) => {
      if (e.classList.contains("active")) {
        e.classList.remove("active");
      }
    });
    this.classList.toggle("active");
  });
});
