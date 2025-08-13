document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".div17");
    const buttons = document.querySelectorAll(".parent > div:not(.div17)");

    let currentInput = "";
    let lastOperator = null;
    let resultDisplayed = false;

    function updateDisplay() {
        display.textContent = currentInput || "0";
    }

    function isOperator(value) {
        return ["+", "-", "x", "÷"].includes(value);
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent.trim();

            if (value === "AC") {
                currentInput = "";
                lastOperator = null;
                resultDisplayed = false;
                updateDisplay();
                return;
            }

            if (value === "=") {
                try {
                    const expression = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
                    const result = eval(expression);
                    currentInput = result.toString();
                    updateDisplay();
                    resultDisplayed = true;
                } catch {
                    display.textContent = "Erro";
                    currentInput = "";
                }
                return;
            }

            if (isOperator(value)) {
                if (currentInput === "") return;

                // Evita operadores duplicados
                if (isOperator(currentInput.slice(-1))) {
                    currentInput = currentInput.slice(0, -1) + value;
                } else {
                    currentInput += value;
                }

                resultDisplayed = false;
                updateDisplay();
                return;
            }

            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
