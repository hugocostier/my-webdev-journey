const input = document.getElementById("input");
let expression = "", result = "", currentOperator = "", currentResult = "", lastResult = 0, newOperation = true;; 

// Calculator functions 
// C button
const clearInput = () => {
    input.textContent = "0";
    expression = ""; 
    result = "";
    currentOperator = "";
    newOperation = true;
}

// CE button
const deleteLast = () => {
    if (input.textContent.length == 1 && input.textContent == "0") {
        return; 
    }
    else if (input.textContent.length == 1) {
        input.textContent = "0";
        expression = expression.slice(0, expression.length - 1); 
    }
    else {
        input.textContent = input.textContent.substring(0, input.textContent.length - 1);
        expression = expression.slice(0, expression.length - 1); 
    }
}

// Percent button
const percent = () => {
    let percent = parseFloat(input.textContent) / 100;
    input.textContent = deleteUnecessaryZeros(updateNotation(percent));
}

// Number buttons
const addNumber = (number) => { 
    if (newOperation) {
        clearInput();
        newOperation = false;
    }  

    if (input.textContent.length < 11) {
        expression += number; 

        if (input.textContent == "0" && number == ".") {
            input.textContent = input.textContent + number;
        }
        else if (input.textContent == "0" && number == " ") {
            return; 
        }
        else {
            expression = deleteUnecessaryZeros(expression);
            input.textContent = addSpaces(removeSpaces(expression));
        }
    }
    else {
        return; 
    }
}

// Operator buttons
const addOperator = (operator) => {    
    if (currentOperator) {
        result = result.slice(0, result.length - 2) + operator + " ";
      currentOperator = operator;
    }
    else {
        result += expression + " " + operator + " ";
        currentOperator = operator;
    }
    currentOperator = ""; 

    input.textContent = "0"; 
    expression = "";
    newOperation = false;
}

// Equal button
const equalTo = () => {
    result += expression;

    if (result[result.length - 2] == currentOperator) {
        return; 
    }

    if (removeSpaces(result)) {
        result = evaluate(result);
        input.textContent = deleteUnecessaryZeros(updateNotation(result));
    } 
    else {
        input.textContent = "Error"; 
    }

    currentOperator = "";
    expression = "";
    newOperation = true;
}


// Keyboard support
document.addEventListener("keydown", function(event) {
    if (event.key >= 0 && event.key <= 9) {
        addNumber(event.key);
    }
    else if (event.key == ".") {
        addNumber(event.key);
    }
    else if (event.key == "Backspace") {
        deleteLast();
    }
    else if (event.key == "Escape") {
        clearInput();
    }
    else if (event.key == "%") {
        percent();
    }
    else if (event.key == "+") {
        addOperator(event.key);
    }
    else if (event.key == "-") {
        addOperator(event.key);
    }
    else if (event.key == "*") {
        addOperator(event.key);
    }
    else if (event.key == "/") {
        addOperator(event.key);
    }
    else if (event.key == "Enter") {
        equalTo();
    }
});


// Desactivate operator buttons when one is active
const operators = document.querySelectorAll(".right");
const buttons = document.querySelectorAll(".btn");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        for (let j = 0; j < operators.length; j++) {
            operators[j].classList.remove("active");
        }
        if (this.classList.contains("right")) {
            this.classList.add("active");
        }
    }); 
}


// Additionnal functions used in the calculator functions
const removeSpaces = (expression) => expression.replace(/\s+/g, ""); // Remove multiple spaces from the expression. The '/' enclose a pattern, '\s' match any whitespace character, '+' means one or more. The 'g' flag is used to replace all occurences of the pattern 

const addSpaces = (result) => {
    if (result.toString().includes(".")) {
        let [integerPart, decimalPart] = result.toString().split(".");

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
        return integerPart + "." + decimalPart; 
    }
    else {
        return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // This regular expression matches every non-word boundary (\B) that is immediately followed by a group of three digits ((\d{3})) that is not followed by another digit ((?!\d)).
    }
}

const evaluate = (result) => {
    let evalResult = 0;
    let [firstOperand, operator, secondOperand] = result.split(" ");

    switch (operator) {
        case "+":
            evalResult = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case "-":
            evalResult = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case "*":
            evalResult = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case "/":
            if (secondOperand == "0") {
                return "Error"; 
            }
            evalResult = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        default:
            evalResult = result;
    }
    return evalResult;
}

const updateNotation = (result) => {
    let resultString = addSpaces(result);

    if (resultString.includes(".")) {
        let [integerPart, decimalPart] = resultString.split("."); 
        let maxDecimal = 11 - integerPart.length - 1;

        if (maxDecimal < 0) {
            return addSpaces(parseFloat(result).toExponential(0));
        }
        else if (decimalPart.length > maxDecimal) {
            return addSpaces(parseFloat(result).toFixed(maxDecimal));
        }
        return resultString;
    }
    else if (resultString.length > 11) {
        return parseFloat(result).toExponential(4); 
    }
    else {
        return resultString; 
    }
}

const deleteUnecessaryZeros = (expression) => {
    while (expression.substring(0, 1) == "0" && expression.length > 1 && !expression.includes(".")) {
        expression = expression.substring(1); 
    }

    while (expression.includes(".") && expression.substring(expression.length - 1) == "0") {
        expression = expression.substring(0, expression.length - 1);
    }

    return expression;
}