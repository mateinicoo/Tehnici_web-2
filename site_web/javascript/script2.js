// Temporizator
let timer;
let seconds = 0;

const timerDisplay = document.getElementById('timer-display');
const startTimerButton = document.getElementById('start-timer');
const resetTimerButton = document.getElementById('reset-timer');

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

startTimerButton.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startTimerButton.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
        startTimerButton.textContent = 'Pauză';
    }
});

resetTimerButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    updateTimerDisplay();
    startTimerButton.textContent = 'Start';
});

// Contor Repetări
const counterValue = document.getElementById('counter-value');
const incrementCounterButton = document.getElementById('increment-counter');
const resetCounterButton = document.getElementById('reset-counter');
let counter = 0;

incrementCounterButton.addEventListener('click', () => {
    counter++;
    counterValue.textContent = counter;
});

resetCounterButton.addEventListener('click', () => {
    counter = 0;
    counterValue.textContent = counter;
});

// Selector Exerciții
const exerciseSelector = document.getElementById('exercise-selector');
const startExerciseButton = document.getElementById('start-exercise');

startExerciseButton.addEventListener('click', () => {
    const selectedExercise = exerciseSelector.value;
    alert(`Începe exercițiul: ${selectedExercise}`);
});

const timerDiv = document.querySelector('.container2');
const styleButton = document.createElement('button');
styleButton.textContent = 'Schimbă Stil';
styleButton.addEventListener('click', () => {
    timerDiv.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
});
timerDiv.appendChild(styleButton);

const addExerciseForm = document.createElement('form');
addExerciseForm.innerHTML = `
    <input type="text" id="new-exercise" placeholder="Nume exercițiu" required>
    <button type="submit">Adaugă Exercițiu</button>
`;
document.querySelector('.exercises').appendChild(addExerciseForm);

addExerciseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const exerciseName = document.getElementById('new-exercise').value;
    if (!/^[a-zA-Zăîșțâ ]{3,}$/.test(exerciseName)) {
        alert('Nume invalid!');
        return;
    }
    const newOption = document.createElement('option');
    newOption.value = exerciseName.toLowerCase();
    newOption.textContent = exerciseName;
    document.getElementById('exercise-selector').appendChild(newOption);
    addExerciseForm.reset();
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('counter', counter);
    localStorage.setItem('timerSeconds', seconds);
});

window.addEventListener('load', () => {
    counter = parseInt(localStorage.getItem('counter')) || 0;
    counterValue.textContent = counter;
    seconds = parseInt(localStorage.getItem('timerSeconds')) || 0;
    updateTimerDisplay();
});

fetch('exercises.json')
    .then(response => response.json())
    .then(data => {
        const selector = document.getElementById('exercise-selector');
        data.exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.id;
            option.textContent = exercise.name;
            selector.appendChild(option);
        });
    })
    .catch(err => console.error('Eroare încărcare exerciții:', err));

