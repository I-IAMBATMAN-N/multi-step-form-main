"use strict";

//
//UX/UI
// ********************************************************************
// START UP
const formInfoContainer = document.querySelectorAll(
  ".form-info--content-container"
);
const choiceContainers = document.querySelectorAll(
  ".step-2 .choice-container "
);

//Display first step
formInfoContainer.forEach((container) => {
  if (!container.classList.contains("step-1")) {
    container.classList.add("d-none");
  }
});
// ********************************************************************
//DISPLAY STEP
const formNavLinks = document.querySelectorAll(".form-nav--link");
function displayStep(index) {
  //
  formInfoContainer.forEach((container) => {
    if (!container.classList.contains("d-none")) {
      container.classList.add("d-none");
    }
  });
  //
  formInfoContainer.forEach((container) => {
    if (container.classList.contains(`step-${index}`)) {
      container.classList.remove("d-none");
    }
    // console.log(container);
  });
  //
  formNavLinks.forEach((navLink) => {
    navLink.classList.remove("active");
    console.log("navLink", navLink.children[0].innerText);
    if (Number(navLink.children[0].innerText) === index) {
      navLink.classList.add("active");
    }
  });

  changeStepButtons.forEach((button) => {
    if (index === 1 && button.innerText.toLowerCase() === "go back") {
      button.classList.add("d-none");
    } else if (index !== 1 && button.innerText.toLowerCase() === "go back") {
      if (button.classList.contains("d-none")) {
        button.classList.remove("d-none");
      }
    }
    if (index === 4 && button.innerText.toLowerCase() === "next step") {
      button.innerText = "Confirm";
      button.style.backgroundColor = "hsl(243, 100%, 62%)";
    } else if (index !== 4 && button.innerText.toLowerCase() === "confirm") {
      button.innerText = "Next Step";
      button.style.backgroundColor = "hsl(213, 96%, 18%)";
    }
    if (index === 5) {
      document
        .querySelectorAll(".form-nav--link--number")[3]
        .closest(".form-nav--link")
        .classList.add("active");
      document.querySelector(".form-footer").classList.add("d-none");
    }
  });
  //
}
// Step 2
const planSwitch = document.querySelector(".plan-checkbox");
const planSwitchPeriods = document.querySelectorAll(".plan-switch-period");
const priceSpans = document.querySelectorAll(".choice-description span");

let yearly = false;

// console.log("step3PriceSpans", step3PriceSpans);

if (document.querySelector(".step-2")) {
  planSwitch.addEventListener("click", function (e) {
    priceSpans2.forEach((priceSpan2) => {
      priceSpan2.classList.toggle("d-none");
    });
    if (!yearly) {
      yearly = true;
      planSwitchPeriods.forEach((period) => {
        period.classList.remove("active");
        if (period.innerHTML.toLowerCase() === "yearly") {
          period.classList.add("active");
        }
      });
    } else if (yearly) {
      yearly = false;
      planSwitchPeriods.forEach((period) => {
        period.classList.remove("active");
        if (period.innerHTML.toLowerCase() === "monthly") {
          period.classList.add("active");
        }
      });
    }
    console.log("yearly", yearly);
    priceSpans.forEach((priceSpan) => {
      priceSpan.classList.toggle("d-none");
    });
  });
  choiceContainers.forEach((choiceContainer) => {
    choiceContainer.addEventListener("click", function (event) {
      choiceContainers.forEach((choiceContainer) => {
        if (choiceContainer.classList.contains("active")) {
          choiceContainer.classList.remove("active");
        }
      });
      this.classList.toggle("active");
    });
  });
}

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
const priceSpans2 = document.querySelectorAll(".price span");

function checkChecks() {
  step3ChoiceContainersInputs.forEach((input) => {
    if (input.checked) {
      input.closest(".choice-container").classList.add("active");
    } else if (!input.checked) {
      input.closest(".choice-container").classList.remove("active");
    }
  });
}
// console.log(step3ChoiceContainers);
// console.log(step3ChoiceContainersInput);

step3ChoiceContainersInput.checked = true;
checkChecks();
//
step3ChoiceContainers.forEach((container) => {
  container.addEventListener("click", function () {
    //
    // console.log(this.children[0].children[0].checked === false);
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

// console.log(formInfoContainer);

let index = 1;
const changeStepButtons = document.querySelectorAll(".change-step");

changeStepButtons.forEach((button) => {
  function checkInputs() {
    inputs.forEach((input) => {
      if (
        input.innerText.length >= Number(inputs[0].getAttribute("minlength"))
      ) {
        return true;
      } else return false;
    });
  }

  button.addEventListener("click", function (event) {
    if (event.target.innerText.toLowerCase() === "next step") {
      // console.log(index);
      if (index === 4) {
        index = 4;
      } else {
        index++;
      }
    } else if (event.target.innerText.toLowerCase() === "go back") {
      if (index === 1) {
        index = 1;
      } else {
        index--;
      }
      console.log(index);
    } else if (
      event.target.innerText.toLowerCase() === "confirm" &&
      !checkInputs()
    ) {
      alert("Fill all inputs firs");
    } else if (
      event.target.innerText.toLowerCase() === "confirm" &&
      checkInputs()
    ) {
      index = 5;
    }
    displayStep(index);
  });
});

//********************************************************************
//
//LOGIC
//********************************************************************
//GATHER FORM INFORMATIONS
class FormResults {
  price = 0;
  constructor(name, email, phoneNumber, plan, yearly, addOns) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.plan = plan;
    this.yearly = yearly;
    this.addOns = addOns;
  }
  getTotal() {
    this.price = 0;
    //PLAN
    if (yearly === false) {
      console.log("plan-price", Number(this.plan.price.slice(1, 3)));
      if (plan.name.toLowerCase() === "arcade") {
        this.price += Number(this.plan.price.slice(1, 2));
      } else if (plan.name.toLowerCase() !== "arcade") {
        this.price += Number(this.plan.price.slice(1, 3));
      }
      //   console.log("this price", this.price);
    } else if (yearly === true) {
      console.log("yearly true");
      if (plan.name.toLowerCase() === "arcade") {
        this.price += Number(this.plan.price.slice(1, 3));
      } else if (plan.name.toLowerCase() !== "arcade") {
        this.price += Number(this.plan.price.slice(1, 4));
      }
      //   console.log("plan-price", Number(this.plan.price.slice(1, 4)));
      //   console.log("this price", this.price);
    }
    console.log("price after main plan", this.price);
    //ADD ONS
    if (this.addOns.length === 0) {
      return this.price;
    }
    if (this.addOns.length <= 1) {
      console.log("yearly", yearly);
      if (yearly === false) {
        console.log("monthly price", Number(this.addOns[0].price.slice(2, 3)));
        // console.log("price", this.price);
        this.price += Number(this.addOns[0].price.slice(2, 3));
      } else if (yearly === true) {
        console.log("yearly price", Number(this.addOns[0].price.slice(2, 4)));
        // console.log("price", this.price);
        this.price += Number(this.addOns[0].price.slice(2, 4));
      }
    } else if (this.addOns.length > 1) {
      this.addOns.forEach((addOn) => {
        if (yearly === false) {
          // console.log("monthly price", Number(this.addOns[0].price.slice(2, 3)));
          //   console.log("price", this.price);
          this.price += Number(addOn.price.slice(2, 3));
        } else if (yearly === true) {
          // console.log("yearly price", Number(this.addOns[0].price.slice(2, 4)));
          //   console.log("price", this.price);
          this.price += Number(addOn.price.slice(2, 4));
        }
      });
    }
    console.log("TOTAAAAL", this.price);
    return this.price;
  }
}

const inputs = document.querySelectorAll(".input");
let namee;
let email;
let phoneNumber;
const credentialsArr = [namee, email, phoneNumber];
const plan = {};
let formResults;

//Gather all form information on 3rd Next Step button click
changeStepButtons.forEach((changeStepButton) => {
  changeStepButton.addEventListener("click", function (event) {
    if (index === 4 && event.target.innerText.toLowerCase() === "confirm") {
      console.log("SUBMITED");
      // console.log("atr", Number(inputs[0].getAttribute("minlength")));
      for (let i = 0; i < inputs.length; i++) {
        // console.log(inputs[i].value);
        credentialsArr[i] = inputs[i].value;
        // console.log(credentialsArr);
      }
      //   inputs.forEach((input) => {
      //     // console.log(input.value);
      //   });
      choiceContainers.forEach((container) => {
        if (container.classList.contains("active")) {
          //
          //   console.log(container.children[1].children[0].innerText);
          plan.name = container.children[1].children[0].innerText;
          //   console.log(" plan.name", plan);

          container.children[1].children[1]
            .querySelectorAll("span")
            .forEach((child) => {
              if (!child.classList.contains("d-none")) {
                if (!yearly) {
                  //   console.log(
                  //     "plan-price-gather",
                  //     container.children[1].children[1].innerText
                  //       .trim()
                  //       .slice(0, 2) + child.innerText
                  //   );
                  if (plan.name.toLowerCase() === "arcade") {
                    plan.price =
                      container.children[1].children[1].innerText
                        .trim()
                        .slice(0, 2) + child.innerText;
                  } else if (plan.name.toLowerCase() !== "arcade") {
                    plan.price =
                      container.children[1].children[1].innerText
                        .trim()
                        .slice(0, 3) + child.innerText;
                  }
                } else if (yearly) {
                  //   console.log(
                  //     "plan-price-gather",
                  //     container.children[1].children[1].innerText
                  //       .trim()
                  //       .slice(0, 3) + child.innerText
                  //   );
                  if (plan.name.toLowerCase() === "arcade") {
                    plan.price =
                      container.children[1].children[1].innerText
                        .trim()
                        .slice(0, 2) + child.innerText;

                    console.log("arcade", plan.price);
                  } else if (plan.name.toLowerCase() !== "arcade") {
                    plan.price =
                      container.children[1].children[1].innerText
                        .trim()
                        .slice(0, 3) + child.innerText;

                    console.log("noarcaade", plan.price);
                  }
                }
              }
            });
        }
      });
      //
      let addOns = [];
      step3ChoiceContainers.forEach((container) => {
        if (container.classList.contains("active")) {
          //   console.log(container.children[1].children[0].innerText);
          container.children[2].querySelectorAll("span").forEach((child) => {
            if (!child.classList.contains("d-none")) {
              //   console.log(
              //     container.children[2].innerText.trim().slice(1, 3) +
              //       child.innerText
              //   );
              addOns.push({
                name: container.children[1].children[0].innerText,
                price:
                  container.children[2].innerText.trim().slice(0, 3) +
                  child.innerText,
              });
              //   console.log("addOns", addOns);
            }
          });
        }
      });
      formResults = new FormResults(
        credentialsArr[0],
        credentialsArr[1],
        credentialsArr[2],
        plan,
        yearly,
        addOns
      );
      displayFormResults();
    }
  });
});

//Step 4
//DISPLAY FORM INFO
const step4Heading = document.querySelector(".step-4 .heading-3");
const planPrice = document.querySelector(".step-4 .plan-price");
const addOnsContainer = document.querySelector(".step-4 .add-ons-container");
addOnsContainer.innerHTM = ``;

function displayFormResults() {
  function displayTotal() {
    document.querySelector(
      ".total-price"
    ).innerText = `+$${formResults.getTotal()}/${yearly ? "yr" : "mo"}`;
    document.querySelector(".total-period").innerText = yearly
      ? "(per year)"
      : "(per month)";
  }
  //
  console.log("formResults", formResults);
  step4Heading.innerText =
    formResults.plan.name + `(${formResults.yearly ? "Yearly" : "Monthly"})`;
  planPrice.innerText = formResults.plan.price;

  addOnsContainer.innerHTML = ``;
  if (formResults.addOns.length === 0) {
    displayTotal();
    return;
  } else if (formResults.addOns.length === 1) {
    addOnsContainer.innerHTML += `
    <div class="add-on">
        <p class="form-text">${formResults.addOns[0].name}</p>
        <span class="plan-price">${formResults.addOns[0].price}</span>
    </div>
    `;
    displayTotal();
  } else if (formResults.addOns.length > 1) {
    formResults.addOns.forEach((addOn) => {
      addOnsContainer.innerHTML += `
        <div class="add-on">
            <p class="form-text">${addOn.name}</p>
            <span class="plan-price">${addOn.price}</span>
        </div>
        `;
    });
    displayTotal();
  }
}
//Go back to step 2 on plan change btn click
document
  .querySelector(".change-plan-link")
  .addEventListener("click", function () {
    index = 2;
    displayStep(index);
  });
