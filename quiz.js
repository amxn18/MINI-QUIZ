const questions = [
    {
        question: "Which was the 1st non Test playing country to beat India in an international match?",
        answers: [
            {text: "Canada", correct: false},
            {text: "Sri Lanka", correct: true},
            {text: "Zimbawe", correct: false},
            {text: "USA", correct: false},
        ]
    },
    {
        question: "Grand Central Terminal, Park Avenue, New York is the world's",
        answers: [
            {text: "largest railway station", correct: true},
            {text: "highest railway station", correct: false},
            {text: "longest railway station", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "For which of the following disciplines is Nobel Prize awarded?",
        answers: [
            {text: "Physics and Chemistry", correct: false},
            {text: "Physiology or Medicine", correct: false},
            {text: "Literature, Peace and Economics", correct: false},
            {text: "All of the above", correct: true},
        ]    
    },
    {
        question: "Garampani sanctuary is located at",
        answers: [
            {text: "Junagarh, Gujarat", correct: false},
            {text: "Diphu, Assam", correct: true},
            {text: "Kohima, Nagaland", correct: false},
            {text: "None of the above", correct: false},
        ]    
    }

];

const questionElement = document.querySelector("#ques");
const answerButtons = document.querySelector("#ansBtn");
const nextButton = document.querySelector("#nextQues");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQues = questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    questionElement.innerHTML = quesNo + ". " + currentQues.question;


    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!`;
    nextButton.innerHtml = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuesIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

