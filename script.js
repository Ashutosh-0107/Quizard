const questions = [
    {
        question: "What does 'CPU' stand for?",
        answers: [
            { text: "Central Programming Unit", correct: false },
            { text: "Central Process Unit", correct: false },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Processing Unit", correct: true }
        ]
    },
    {
        question: "Which of the following is an example of a programming language?",
        answers: [
            { text: "HTML", correct: true },
            { text: "JPEG", correct: false },
            { text: "GIF", correct: false },
            { text: "MP3", correct: false }
        ]
    },
    {
        question: "What is the main function of an operating system?",
        answers: [
            { text: "Playing games", correct: false },
            { text: "Managing hardware and software", correct: true },
            { text: "Editing documents", correct: false },
            { text: "Creating websites", correct: false }
        ]
    },
    {
        question: "Which device is used to input data into a computer?",
        answers: [
            { text: "Monitor", correct: false },
            { text: "Printer", correct: false },
            { text: "Keyboard", correct: true },
            { text: "Speakers", correct: false }
        ]
    },
    {
        question: "What does RAM stand for?",
        answers: [
            { text: "Random Access Memory", correct: true },
            { text: "Read-Only Memory", correct: false },
            { text: "Read and Modify", correct: false },
            { text: "Remote Access Module", correct: false }
        ]
    },
    {
        question: "What is a 'URL'?",
        answers: [
            { text: "Universal Recording Language", correct: false },
            { text: "Uniform Resource Locator", correct: true },
            { text: "Unique Relational Link", correct: false },
            { text: "User Related Listing", correct: false }
        ]
    },
    {
        question: "What is the extension of a JavaScript file?",
        answers: [
            { text: ".java", correct: false },
            { text: ".script", correct: false },
            { text: ".js", correct: true },
            { text: ".javascript", correct: false }
        ]
    },
    {
        question: "Which software is used to view web pages on the internet?",
        answers: [
            { text: "Word", correct: false },
            { text: "Excel", correct: false },
            { text: "PowerPoint", correct: false },
            { text: "Web Browser", correct: true }
        ]
    },
    {
        question: "Which component of a computer is responsible for processing information?",
        answers: [
            { text: "Hard Drive", correct: false },
            { text: "Graphics Card", correct: false },
            { text: "Processor (CPU)", correct: true },
            { text: "Monitor", correct: false }
        ]
    },
    {
        question: "Which term describes a program that replicates itself and spreads to other computers?",
        answers: [
            { text: "Worm", correct: true },
            { text: "Antivirus", correct: false },
            { text: "Cookie", correct: false },
            { text: "Firewall", correct: false }
        ]
    },
    {
        question: "What does the acronym 'HTML' stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "High Technology Markup Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Text Management Language", correct: false }
        ]
    },
    {
        question: "Which programming language is commonly used for building web applications and is known for its simplicity and ease of use?",
        answers: [
            { text: "C++", correct: false },
            { text: "Python", correct: false },
            { text: "Ruby", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What is the purpose of a 'try-catch' block in programming languages?",
        answers: [
            { text: "It is used to declare variables", correct: false },
            { text: "It is used for executing loops", correct: false },
            { text: "It is used to handle exceptions and errors", correct: true },
            { text: "It is used to define classes", correct: false }
        ]
    },
    {
        question: "Which data structure stores elements in a way that allows for efficient insertion, deletion, and retrieval, and often maintains elements in a sorted order?",
        answers: [
            { text: "Array", correct: false },
            { text: "Linked List", correct: false },
            { text: "Stack", correct: false },
            { text: "Binary Search Tree", correct: true }
        ]
    },
    {
        question: "In object-oriented programming, what is the term for the ability of a class to inherit properties and behaviors from another class?",
        answers: [
            { text: "Inheritance", correct: true },
            { text: "Encapsulation", correct: false },
            { text: "Abstraction", correct: false },
            { text: "Polymorphism", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You have Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
 
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();