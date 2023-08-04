// Update screen with numbers
let numbers = document.querySelectorAll(".num")

numbers.forEach(key => {
    key.addEventListener("click", updateScreen)
})

function updateScreen(event) {
    let screen = document.querySelector("#screen");
    screen.textContent = event.target.textContent;
}


// Update screen with operators
let operators = document.querySelectorAll(".op");

operators.forEach(key => {
    key.addEventListener("click", updateScreenOp)
})

function updateScreenOp(event) {
    let screenOp = document.querySelector("#screenOp");
    screenOp.textContent = " " + event.target.textContent;
}

