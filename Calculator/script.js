
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.bttn');
const equalButton = document.querySelector('.bttn1'); 

// Function to update display
function updateDisplay(value) {
    display.textContent += value;
}

// Function to clear display
function clearDisplay() {
    display.textContent = '';
}

// calculating result
function calculate() {
    const expression = display.textContent;
    if (expression) {
        try {
            const result = eval(expression); 
            display.textContent = result;
        } catch (error) {
            display.textContent = 'Error';
        }
    }
}


buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        let value = event.target.innerHTML;
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else {
            updateDisplay(value);
        }
    });
});


equalButton.addEventListener('click', function(event) {
    calculate();
});
