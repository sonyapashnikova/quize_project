const questions = [
    { text: "Как называется третий день Масленицы?", options: ["Едок", "Обжора", "Лакомка"], correct: 2 },
    { text: "Для диагностики какой болезни делают пробу Манту?", options: ["корь", "туберкулёз", "скарлатина"], correct: 1 },
    { text: "Президент России?", options: ["Д.Д. Трамп", "В.В. Путин", "Д.А. Медведев"], correct: 1 },
    { text: "В каком году началась Великая Отечественная Война?", options: ["1941", "1812", "1991"], correct: 0 },
    { text: "Сколько сердец у осьминога?", options: ["3", "5", "1"], correct: 0 },
    { text: "Кто написал роман «Мастер и Маргарита»?", options: ["А.С. Пушкин", "М.А. Булгаков", "Л.Н. Толстой"], correct: 1 },
    { text: "Что означает аббревиатура IDE?", options: ["Integrated Development Environment", "Interactive Data Editor", "Internal Debugging Engine"], correct: 0 },
    { text: "Кто играет за футбольный клуб «Барселона»?", options: ["Сафронов", "Мбаппе", "Рафинья"], correct: 2 },
    { text: "Какое из этих растений плотоядное?", options: ["Росянка", "Мытник", "Ромашка"], correct: 0 },
    { text: "С головой какого животного изображается индуистский бог Ганеша?", options: ["Обезьяны", "Слона", "Коровы"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-question-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score-text');

function showQuestion() {
    let q = questions[currentQuestion];
    questionText.textContent = q.text;
    answerButtons.innerHTML = '';

    let percent = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = percent + '%';

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Показать результаты';
    } else {
        nextBtn.textContent = 'Следующий вопрос';
    }

    q.options.forEach((opt, idx) => {
        let div = document.createElement('div');
        div.className = 'option-wrapper';

        div.innerHTML = `
            <input type="radio" name="quiz" value="${idx}" id="opt_${idx}">
            <label for="opt_${idx}">${opt}</label>
        `;

        let radio = div.querySelector('input');

        radio.addEventListener('change', function() {
            const allOptions = document.querySelectorAll('.option-wrapper');
            const correctAnswer = q.correct;

            allOptions[correctAnswer].classList.add('correct-answer');

            if (idx !== correctAnswer) {
                div.classList.add('incorrect-answer');
            }

            document.querySelectorAll('input[name="quiz"]').forEach(input => input.disabled = true);
        });

        answerButtons.appendChild(div);
    });
}

function nextQuestion() {
    const selectedRadio = document.querySelector('input[name="quiz"]:checked');

    if (parseInt(selectedRadio.value) === questions[currentQuestion].correct) {
        score++;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    nextBtn.style.display = 'none';
    scoreText.innerHTML = `Вы ответили правильно на <b>${score}</b> из <b>${questions.length}</b> вопросов.`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    nextBtn.style.display = 'block';
    showQuestion();
}

startBtn.addEventListener('click', function() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    nextBtn.style.display = 'block';
    showQuestion();
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
