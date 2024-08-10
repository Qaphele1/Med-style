let currentQuestion = 1;
const totalQuestions = 31; // Ensure the totalQuestions count is accurate
const correctAnswers = {
    q1: "Analyzing laboratory test results",
    q2: "A1C",
    q3: "Separating components",
    q4: "Gram stain",
    q5: "Swab",
    q6: "Enzyme-Linked Immunosorbent Assay",
    q7: "CBC",
    q8: "Contamination",
    q9: "Spectrophotometer",
    q10: "Ensure accuracy",
    q11: "Sodium citrate",
    q12: "Millimeters of mercury",
    q13: "Urine",
    q14: "All of the above",
    q15: "Water",
    q16: "PT",
    q17: "Hematology",
    q18: "Lymphocyte",
    q19: "Leukopenia",
    q20: "Complete Blood Count",
    q21: "Erythrocytosis",
    q22: "Lipids",
    q23: "Viewing",
    q24: "Liver",
    q25: "Leukocytosis",
    q26: "Blood",
    q27: "Microscopic examination",
    q28: "Examine morphology",
    q29: "Microcytes",
    q30: "Peripheral smear",
    q31: "Platelets"
};

let userAnswers = {};
let timer;
let startTime = new Date().getTime();

document.getElementById('startQuiz').addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    startTimer();
    showQuestion(currentQuestion);
});

function startTimer() {
    timer = setInterval(() => {
        const now = new Date().getTime();
        const elapsedTime = now - startTime;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        document.getElementById('timer').innerText = `Time: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }, 1000);
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function showQuestion(questionNumber) {
    for (let i = 1; i <= totalQuestions; i++) {
        const questionElement = document.getElementById(`question${i}`);
        if (i === questionNumber) {
            questionElement.classList.remove('hidden');
        } else {
            questionElement.classList.add('hidden');
        }
    }
}

function nextQuestion() {
    const questionId = `question${currentQuestion}`;
    const questionElement = document.getElementById(questionId);
    let userAnswer = '';
    let isCorrect = false;

    if (currentQuestion <= 14) { // For multiple-choice questions
        const selected = questionElement.querySelector('input[type="radio"]:checked');
        userAnswer = selected ? selected.value : 'Not answered';
    } else if (currentQuestion <= 21) { // For text input questions (15-21)
        userAnswer = document.getElementById(`answer${currentQuestion}`).value.trim();
    } else { // For text input questions (22-31)
        userAnswer = document.getElementById(`answer${currentQuestion}`).value.trim();
    }

    userAnswers[`q${currentQuestion}`] = userAnswer;
    isCorrect = userAnswer === correctAnswers[`q${currentQuestion}`];

    if (isCorrect) {
        showPopup("Correct! Moving to the next question...");
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion > totalQuestions) {
                finishQuiz();
            } else {
                showQuestion(currentQuestion);
            }
        }, 2000); // 2 seconds delay
    } else {
        currentQuestion++;
        if (currentQuestion > totalQuestions) {
            finishQuiz();
        } else {
            showQuestion(currentQuestion);
        }
    }
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 2000); // Display for 2 seconds
}

function finishQuiz() {
    clearInterval(timer);
    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = ''; // Clear previous results

    let score = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const correctAnswer = correctAnswers[`q${i}`];
        const userAnswer = userAnswers[`q${i}`] || 'Not answered';
        const isCorrect = userAnswer === correctAnswer;

        if (isCorrect) score++;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Question ${i}</td>
            <td>${userAnswer}</td>
            <td>${correctAnswer}</td>
        `;
        resultTable.appendChild(row);
    }

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    alert(`Your score: ${score}/${totalQuestions}`);
}
