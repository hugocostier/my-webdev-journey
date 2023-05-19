// ----- Handling the quizz logic 
const quizz = {
    num1: 0,
    num2: 0,
    operator: '',
    question: '',
    answer: '', 
    score: 0,
    count: 0
}; 

// Initialisation of the quizz
quizz.num1 = Math.ceil(Math.random() * 10);
quizz.num2 = Math.ceil(Math.random() * 10);
quizz.operator = ['+', '-', '*'][Math.ceil(Math.random() * 3) - 1];
quizz.question = quizz.num1 + quizz.operator + quizz.num2;

document.getElementById('question').innerHTML = `What is the result of ${quizz.question} ?`;  
document.getElementById('score').innerHTML = `Score : ${quizz.score}`;  

// Check the answer when the user press the Enter key
function inputKeyPress(event) {
    if (event.key === 'Enter') {
        checkAnswer(); 
    }
}

function checkAnswer() {
    quizz.answer = parseInt(document.getElementById('answer').value); 

    if (quizz.answer == eval(quizz.question)) {
        quizz.answer = ''; 
        document.getElementById('answer').value = quizz.answer;
        document.getElementById('answer').style.border = '2px solid green';
        quizz.score += 1;
        document.getElementById('score').innerHTML = `Score : ${quizz.score}`; 

        quizz.num1 = Math.ceil(Math.random() * 10);
        quizz.num2 = Math.ceil(Math.random() * 10);
        quizz.operator = ['+', '-', '*'][Math.ceil(Math.random() * 3) - 1];

        quizz.question = quizz.num1 + quizz.operator + quizz.num2;
        document.getElementById('question').innerHTML = `What is the result of ${quizz.question} ?`; 
    }
    else {
        quizz.answer = ''; 
        document.getElementById('answer').value = quizz.answer;
        document.getElementById('answer').style.animation = 'shake 0.2s ease-in-out';
        document.getElementById('answer').style.border = '2px solid red';
        quizz.score -= 1;
        document.getElementById('score').innerHTML = `Score : ${quizz.score}`; 
    }

    quizz.count += 1;
    endGame();
}

// Terminate the game when the user reach 10 questions
function endGame() {
    if (quizz.count === 10 && quizz.score <= 5) {
        document.getElementById('question').innerHTML = `Game Over ! Your score is ${quizz.score} !`; 
        document.getElementById('answer').style.display = 'none';
        restart();
        stopTimer();
    }
    else if (quizz.count === 10 && quizz.score > 5) {
        document.getElementById('question').innerHTML = `Congratulations ! Your score is ${quizz.score} !`; 
        document.getElementById('answer').style.display = 'none';
        restart();
        stopTimer();
    }
}

function restart() {
    const restart = document.createElement('button');
    restart.innerHTML = 'Restart';
    restart.id = 'restart-btn';
    document.getElementById('question-container').appendChild(restart);    

    restart.addEventListener('click', () => {
        location.reload();
    }
    );
}

// -----------------------------------------------
// ----- Handling the timer
let startTime; 
let timerInterval; 

function startTimer() {
    startTime = new Date().getTime(); 
    timerInterval = setInterval(updateTimer, 1000); 
}

function stopTimer() {
    clearInterval(timerInterval); 
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime;

    const minutes = Math.floor(timeElapsed / (1000 * 60)); 
    const seconds = Math.floor((timeElapsed % (1000 * 60) / 1000)); 

    const formattedTime = `Time : ${padZero(minutes)}:${padZero(seconds)}`;

    document.getElementById('timer').innerHTML = formattedTime; 
}

// Add a zero in front of the number if it is less than 10
function padZero(value) { 
    return value < 10 ? `0${value}` : value;
}


// -----------------------------------------------
// ----- Handling the DOM events
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('answer').addEventListener('input', () => {
        if (startTime === undefined) {
            startTimer();
        }
        document.getElementById('answer').style.animation = '';
        document.getElementById('answer').style.border = '1px solid black';
    })

    document.getElementById('answer').addEventListener('keypress', inputKeyPress); 
});