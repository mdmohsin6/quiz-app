const quizData = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    // Add more quiz questions here
];

const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const feedbackContainer = document.getElementById('feedback-container');
const scoreContainer = document.getElementById('score');
const timerContainer = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let timerInterval;

function startQuiz() {
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(answer.correct));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(correct) {
    if (correct) {
        score++;
        feedbackContainer.innerText = 'Correct!';
    } else {
        feedbackContainer.innerText = 'Incorrect!';
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score}</p>`;
}

function updateTimer() {
    timer--;
    timerContainer.innerText = `Time Remaining: ${timer} seconds`;

    if (timer <= 0) {
        endQuiz();
    }
}

document.getElementById('submit-btn').addEventListener('click', () => selectAnswer(false));
startQuiz();
