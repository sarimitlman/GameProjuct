document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const numButtons = 10;
    const numDifferentColors = 8;
    let gameActive = true;
    let timerInterval;
    let timeRemaining = 15; // זמן טיימר בהתחלה
    let clickCount = 0; // משתנה לספירת הקשות על כפתורים צבעוניים
    let wins = 0; // משתנה לספירת מספר הניצחונות

    // הגדרת מיקומים ספציפיים לכל כפתור
    const buttonPositions = [
        { top: '132px', left: '381.5px'},
        { top: '132px', left: '472px' },
        { top: '132px', left: '560px' },
        { top: '210px', left: '339px' },
        { top: '210px', left: '429px' },
        { top: '210px', left: '515px' },
        { top: '210px', left: '603px' },
        { top: '284px', left: '381.5px'},
        { top: '284px', left: '472px' },
        { top: '284px', left: '560px' }
    ];

    // יצירת אובייקטים Audio עבור הצלילים
    const defaultSound = new Audio('../sound/PBOING1.WAV');
    const randomSound = new Audio('../sound/wow.mp3');

    // יצירת 10 כפתורים
    const buttons = Array.from({ length: numButtons }, (_, i) => {
        const button = document.createElement('button');
        button.className = 'default-color';
        button.style.position = 'absolute';
        button.style.top = buttonPositions[i].top;
        button.style.left = buttonPositions[i].left;
        container.appendChild(button);
        return button;
    });

    // פונקציה ליצירת צבעים רנדומליים
    function createRandomColors() {
        const indices = Array.from({ length: numButtons }, (_, i) => i);
        shuffle(indices);
        const differentColorIndices = indices.slice(0, numDifferentColors);

        buttons.forEach(button => button.className = 'default-color');
        differentColorIndices.forEach(index => buttons[index].className = 'random-color');
        
        // אתחול מספר הקשות
        clickCount = 0;
    }
    startTimer();

    // הפעלת טיימר
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);

        timeRemaining = 15;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                gameActive = false;
                alert(`טיימר נגמר!   פעמים והצלחת לנצח ${wins} פעמים.`);
            }
        }, 1000);
    }

    // עדכון תצוגת הטיימר
    function updateTimerDisplay() {
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) {
            timerDisplay.textContent = ` ${timeRemaining} `;
        }
    }

    // בדיקת אם לנצח את המשחק
    function checkForVictory() {
        if (wins >= 3) {
            window.location.href = '../html/win.html'; // עובר לדף הניצחון
        }
    }

    // הגדרת התנהגות כפתור
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!gameActive) return;

            if (this.classList.contains('random-color')) {
                this.className = 'default-color';
                randomSound.play(); // נגן צליל עבור כפתור בצבע רנדומלי
                clickCount++; // הגדל את ספירת הקשות

                const remainingRandomColors = buttons.filter(btn => btn.classList.contains('random-color'));

                // אם כל הכפתורים בצבע שונה נלחצו
                if (remainingRandomColors.length === 0) {
                    wins++; // הגדל את מספר הניצחונות
                    createRandomColors();
                    checkForVictory(); // בדוק אם צריך לעבור לדף הניצחון
                }
            } else {
                defaultSound.play(); // נגן צליל עבור כפתור בצבע ברירת מחדל
            }
        });
    });

    // התחלת המשחק והטיימר
    createRandomColors();

    // יצירת אלמנט לתצוגת טיימר
    const timerElement = document.createElement('div');
    timerElement.id = 'timer'; // ID זהה ל-CSS
    container.appendChild(timerElement);
});

// פונקציה לשיבוש (shuffle) מערך
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("exit").addEventListener("click", function() {    
        window.location.href = "../html/rating.html"; 
    });
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("restart").addEventListener("click", function() {    
        window.location.href = "../html/game.html"; 
    });
});