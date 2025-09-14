// =====================
// Interactive Quiz Setup
// =====================
const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web pages?",
        options: ["Python", "HTML", "C++", "Java"],
        answer: "HTML"
    }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function showQuestion() {
    answered = false;
    questionEl.textContent = questions[current].question;
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;

    questions[current].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn"); // Add styling class
        button.onclick = () => selectAnswer(button, option);
        optionsEl.appendChild(button);
    });
}

function selectAnswer(button, option) {
    if(answered) return; // Prevent multiple selections

    answered = true;

    const correct = option === questions[current].answer;
    if(correct) {
        score++;
    }
    button.classList.add("selected"); // Highlight the selected option
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    current++;
    if(current < questions.length) {
        showQuestion();
    } else {
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = "";
        nextBtn.style.display = "none";
        scoreEl.textContent = `Your score is ${score} / ${questions.length}`;
    }
});

showQuestion();

// =====================
// API Data Fetching
// =====================
function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            document.getElementById("joke").textContent = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => {
            document.getElementById("joke").textContent = "Failed to fetch joke.";
            console.error("Error fetching joke:", error);
        });
}
