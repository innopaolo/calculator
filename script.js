let screen = document.querySelector("#screen");
let screenOp = document.querySelector("#screenOp");
let previousNumber = null;

// State variables to keep track of when the screen is replaced by new number
let currentOperation = "default";
let equationFinished = "no"  

// Ensures 0 as initial value on screen
window.addEventListener("load", () => {
    screen.textContent = "0";
});

// Update screen with numbers
let numbers = document.querySelectorAll(".num")

numbers.forEach(key => {
    key.addEventListener("click", () => updateScreen(key.id))
})

function updateScreen(id) {
    let currentContent = screen.textContent;
    let newContent =  id;

    // Screen width measured by characters
    let maxWidth = 10;

    if (equationFinished === "yes") {
        previousNumber = null;
        screen.textContent = ""; 
        equationFinished = "no"; 
    }

    // Check if another key is pressed when "80085" is already displayed
    if (currentContent === "80085" || currentContent === "ERROR") {

        // Replace "80085" with the new number
        screen.textContent = newContent;

    } else if (currentContent.length <= maxWidth) {

        // Ensure only one decimal is included
        if (newContent === "." && currentContent.includes(".")) {
            return;
        }

        // Replace initial value 0 if number, if decimal append to it
        if (currentContent === "0" && newContent !== ".") {
            screen.textContent = newContent;
        } else {
            // Append number to the existing content and change current operation mode
            if (screenOp.textContent) {

                if (currentOperation === "append") {
                    screen.textContent += newContent;
                    return; 
                }

                previousNumber = parseFloat(currentContent);
                screen.textContent = newContent;
                currentOperation = "append";
            
            } else {
                screen.textContent += newContent;
            }
        }    
    }
}

// Update screen with operators
let operators = document.querySelectorAll(".op");

operators.forEach(key => {
    key.addEventListener("click", () => updateScreenOp(key.id))
});

function updateScreenOp(id) {
    let prevOp = screenOp.textContent;
    screenOp.textContent = id;

    if (id === "=") {
        updateSpecial("=", prevOp, previousNumber, parseFloat(screen.textContent));
        screenOp.textContent = "";
    }

    if (currentOperation === "append") {
        updateSpecial("=", id, previousNumber, parseFloat(screen.textContent));
    }
}

// Add functionality to special keys
let specialKeys = document.querySelectorAll(".special");

specialKeys.forEach(key => {
    key.addEventListener("click", () => updateSpecial(key.id))
})

function updateSpecial(id, operator, previousNumber, newNumber) {
    switch (id) {
        case "AC":
            screen.textContent = "0";
            screenOp.textContent = "";
            currentOperation = "default";
            equationFinished = "yes";
            previousNumber = null;
            break;
        case "C":
            // Code for "C" case 
            break;
        case "?":
            screen.textContent = "80085";
            break;
        case "+/-":
            let array = screen.textContent.split("");
            if (array[0] !== "-" ) {
                array.unshift("-");
                let negative = array.join("");
                screen.textContent = negative;
            } else {
                array.shift();
                let positive = array.join("");
                screen.textContent = positive;
            } 
            break;
        case "=":
            let result = null;
            switch (operator) {
                case "+":
                    result = previousNumber + newNumber;
                    break;
                case "-":
                    result = previousNumber - newNumber;
                    break;
                case "x":
                    result = previousNumber * newNumber;
                    break;
                case "/":
                    result = previousNumber / newNumber;
                    break;
                default:
                    screen.textContent = "ERROR";
                    screenOp.textContent = "";
                    break;
            }
            // Show only decimal when not an integer
            let formattedResult = result % 1 === 0 ? result : result.toFixed(8);
            screen.textContent = parseFloat(formattedResult);
            currentOperation = "default";
            screenOp.textContent = "";
            equationFinished = "yes";
            break;
    }   
}
