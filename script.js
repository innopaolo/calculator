let screen = document.querySelector("#screen");
let screenOp = document.querySelector("#screenOp");

// Update screen with numbers
let numbers = document.querySelectorAll(".num")

numbers.forEach(key => {
    key.addEventListener("click", (event) => updateScreen(event, key.id))
})

function updateScreen(event, id) {
    let currentContent = screen.textContent;
    let newContent =  id;

    let maxWidth = 10;

    // Check if another key is pressed when "80085" is already displayed
    if (currentContent === "8 0 0 8 5") {
        // Replace "80085" with the new number
        screen.textContent = newContent;
    } else if (currentContent.length <= maxWidth) {
        // Append the new number to the existing content
        screen.textContent += newContent;
    }
}

// Update screen with operators
let operators = document.querySelectorAll(".op");

operators.forEach(key => {
    key.addEventListener("click", (event) => updateScreenOp(event, key.id))
})

function updateScreenOp(event, id) {
    screenOp.textContent = id;
}

// Add functionality to special keys
let specialKeys = document.querySelectorAll(".special");

specialKeys.forEach(key => {
    key.addEventListener("click", (event) => updateSpecial(event, key.id))
})

function updateSpecial(event, id) {
    switch (id) {
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