let display = document.getElementById("screen");
let buttons = document.getElementsByClassName("btn");
let buttonsArray = Array.from(buttons);
let string = '';

buttonsArray.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        const value = event.target.value;

        if (value === 'C') {
            string = '';
            display.value = string;
        } else if (value === 'Del') {
            string = string.substring(0, string.length - 1);
            display.value = string;
        } else if (value === '=') {
            try {
                if (string === '') {
                    display.value = '0';
                } else if (string.includes('/0')) {
                    throw new Error("Division by zero");
                } else {
                    string = eval(string).toString();
                    display.value = string;
                }
            } catch (error) {
                display.value = 'error';
            }
        } else {
            if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(string[string.length - 1])) {
                return;
            }
            if (value === '.') {
                const lastNumber = string.split(/[\+\-\*\/]/).pop();
                if (lastNumber.includes('.')) {
                    return;
                }
            }
            if (string.length >= 20) {
                display.value = 'Limit Reached';
                return;
            }
            string += value;
            display.value = string;
        }

        console.log(event.target.value);
    });
});

// Handle keyboard input
document.addEventListener('keydown', function (event) {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace'];
    if (validKeys.includes(event.key)) {
        if (event.key === 'Enter') {
            document.querySelector('.btn[value="="]').click();
        } else if (event.key === 'Backspace') {
            document.querySelector('.btn[value="Del"]').click();
        } else {
            document.querySelector(`.btn[value="${event.key}"]`)?.click();
        }
    }
});
