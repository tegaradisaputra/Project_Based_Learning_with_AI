import { questions } from "./questions.js";



// get timer element
const timerCircle = document.getElementById('timerCircle');
const timerText = document.getElementById('timerText');

const TOTAL_TIME = 30;
let timeLeft = TOTAL_TIME;

function renderTimer(currentTime, totalTime) {

    timerText.textContent =`${currentTime}s`;

    const percentage = currentTime / totalTime;
    const degree = percentage * 360;

    const blue300 = "var(--color-blue-300)";
    const gray200 = "var(--color-gray-200)";

    timerCircle.style.background = `
        conic-gradient(
            ${blue300} ${degree}deg,
            ${gray200} ${degree}deg
        )
    `;

}


function renderProgressBar() {
    
    // get progress bar
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    const totalQuestions = questions.length;
    const activeQuestion = currentQuestion + 1;

    const percentage = Math.round((activeQuestion / totalQuestions) * 100);

    progressBar.style.setProperty('width', `${percentage}%`, 'important');
    progressText.textContent = `${percentage}%`;

}

let timerInterval = null;

function startTimer() {



    clearInterval(timerInterval);
    timerInterval = setInterval(() => {

        timeLeft--;

        renderTimer(timeLeft, TOTAL_TIME);

        if(timeLeft <= 0) {
            clearInterval(timerInterval);

            PopUpNotification();

        }
    }, 1000)
}

function resetTimer() {
    clearInterval(timerInterval);

    timeLeft = TOTAL_TIME;

    renderTimer(timeLeft, TOTAL_TIME);
}

resetTimer();
startTimer();




// progress
// get progress
const currentQuestionNum = document.getElementById('currentQuestionNum');
const totalQuestionsNum = document.getElementById('totalQuestionsNum');


function renderCurrentProgress() {
    currentQuestionNum.textContent = currentQuestion + 1;
    totalQuestionsNum.textContent = questions.length;
}



// get questionText
const questionText = document.getElementById('questionText');
const answerList = document.getElementById('answerList');


let currentQuestion = 0;
let selectedAnswer = null;
let totalCorrect = 0;

// next button
const nextButton = document.getElementById('nextButton');

function renderQuestions() {
    
    renderCurrentProgress();

    questionText.textContent = "";


    const question = questions[currentQuestion];

    renderProgressBar();

    questionText.textContent = question.question;
    console.log(question);

    answerList.textContent = "";

    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.className = 'flex-col flex gap-2'

        const button = document.createElement('button');
        button.className = 'answer-btn w-full flex items-center gap-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-sm px-4 py-3 transition-all hover:bg-white/80 hover:shadow-md';
        button.textContent = answer;

        li.appendChild(button);

        answerList.appendChild(li)

        button.addEventListener('click', () => {
            
            const allButtons = answerList.querySelectorAll('.answer-btn');
            allButtons.forEach(btn => {
                btn.classList.remove('bg-blue-400', 'text-white');
                btn.classList.add('bg-white/60', 'hover:bg-white/80');
            });
            
            button.classList.remove('bg-white/60', 'hover:bg-white/80');
            button.classList.add('bg-blue-400', 'text-white');
            
            selectedAnswer = index;
        })
        
        if(nextButton === question.length - 1) {
            nextButton.textContent = 'Done';
        }else {
            nextButton.textContent = 'Next question ->'
        }
    })
    
}

renderQuestions();


    
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {

    const currentQuestionData = questions[currentQuestion];

    if(selectedAnswer == null && selectedAnswer == undefined){
        return;
    }
    
    if(selectedAnswer === currentQuestionData.correct) {
        totalCorrect += 1
    }
    
    currentQuestion += 1;

    if (currentQuestion <= questions.length - 1) {
        renderQuestions();
        selectedAnswer = null;
    } else {
        clearInterval(timerInterval);
        PopUpNotification();
    }

}



// get notification
// notification-overlay
const notificationOverlay = document.getElementById('notificationOverlay');

function PopUpNotification() {
    notificationOverlay.classList.add('flex');
    notificationOverlay.classList.remove('hidden');


    // get finally
    const currentQuestionCorrect = document.getElementById('currentQuestionCorrect');
    const totalQuestionsFinally = document.getElementById('totalQuestionsFinally');

    currentQuestionCorrect.textContent = totalCorrect;
    totalQuestionsFinally.textContent = questions.length;
}

function closePopUp() {
    notificationOverlay.classList.add('hidden')
    notificationOverlay.classList.remove('flex');
    selectedAnswer = null;
    renderQuestions();
    resetTimer();
    startTimer();
}

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', closePopUp);
