let screen = document.querySelector("#screen");
let screenOp = document.querySelector("#screenOp");

// Update screen with numbers
let numbers = document.querySelectorAll(".num")

numbers.forEach(key => {
    key.addEventListener("click", updateScreen)
})

function updateScreen(event) {
    screen.textContent = event.target.textContent;
}


// Update screen with operators
let operators = document.querySelectorAll(".op");

operators.forEach(key => {
    key.addEventListener("click", updateScreenOp)
})

function updateScreenOp(event) {
    screenOp.textContent = " " + event.target.textContent;
}

// Add functionality to special keys
let specialKeys = document.querySelectorAll(".special");

specialKeys.forEach(key => {
    key.addEventListener("click", updateSpecial)
})

function updateSpecial(event) {
    switch (event.target.textContent) {
        case "AC":
            screen.textContent = "";
            screenOp.textContent = "";
            break;
        case "C":
            // Code for "C" case 
            break;
        case "?":
            screen.textContent = "8 0 0 8 5";
            break;
        case "+/-":
            let array = screen.textContent[0];
            console.log(array);  
            break;
        case "=":
            // Code for "=" case 
            break;
    }
}