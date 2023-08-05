let screen = document.querySelector("#screen");
let screenOp = document.querySelector("#screenOp");
let previousNumber = null;

// Flag variables to keep track of when the screen is replaced by new input
let currentOperation = "default";
let equationFinished = "no"  

// Ensures 0 as initial value on screen
window.addEventListener("load", () => {
    screen.textContent = "0";
});

// Main function to update screen with numbers
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

    if (screen.style.fontSize === "25px") {
        screen.style.fontSize = "58px";
    }

    if (currentContent === "80085" || currentContent === "ERROR") {
        screen.textContent = newContent;

    } else if (currentContent.length <= maxWidth) {

        // Ensure only one decimal is included
        if (newContent === "." && currentContent.includes(".")) {
            return;
        }

        // Replace the initial value 0 to number, if decimal append to it
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
        if (previousNumber === null || equationFinished === "yes") {
            screenOp.textContent = "";
            return;
        } else {
            updateSpecial("=", prevOp, previousNumber, parseFloat(screen.textContent));
            screenOp.textContent = "";
        }
    }

    // When it is the 2nd part of the equation and an operator is clicked
    if (currentOperation === "append") {
        updateSpecial("=", prevOp, previousNumber, parseFloat(screen.textContent), id);
    }
}

// Add functionality to special keys
let specialKeys = document.querySelectorAll(".special");

specialKeys.forEach(key => {
    key.addEventListener("click", () => updateSpecial(key.id))
})

function updateSpecial(id, operator, previousNumber, newNumber, currOp) {
    switch (id) {
        case "AC":
            screen.textContent = "0";
            screenOp.textContent = "";
            currentOperation = "default";
            equationFinished = "yes";
            previousNumber = null;
            break;
        case "C":
            screen.textContent = screen.textContent.slice(0, -1);
            if (screen.textContent === "") {
                screen.textContent = 0;
            }
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

            // If user divides by zero
            if (formattedResult === "Infinity") {
                let message = "to infinity and beyond!";
                screen.style.fontSize = "25px"; 
                screen.textContent = message;
            }
            
            // Shows the next operator to be used
            screenOp.textContent = currOp;

            currentOperation = "default";
            equationFinished = "yes";
            break;
    }   
}
