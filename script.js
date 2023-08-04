let numbers = document.querySelectorAll(".num")

numbers.forEach(key => {
    key.addEventListener("click", updateScreen)
})

function updateScreen(event) {
    let screen = document.querySelector("#screen");
    screen.textContent = event.target.textContent;
}