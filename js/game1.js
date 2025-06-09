
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#container');
    const numButtons = 10;
    const numDifferentColors = 7;
    let gameActive = true;
    let timerInterval;
    let timeRemaining = 15; // זמן טיימר בהתחלה
    let clickCount = 0; // משתנה לספירת הקשות על כפתורים צבעוניים
    let wins = 0; // משתנה לספירת מספר הניצחונות

    // יצירת אלמנט הודעה
    const messageElement = document.createElement('div');
    messageElement.id = 'message';
    messageElement.style.position = 'absolute';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.padding = '20px';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageElement.style.color = 'white';
    messageElement.style.borderRadius = '10px';
    messageElement.style.display = 'none'; // חבא את האלמנט עד שהמשחק ידרוש
    messageElement.style.zIndex = '1000'; // לוודא שהאלמנט יופיע מעל הכל
    container.appendChild(messageElement);

    // הגדרת מיקומים ספציפיים לכל כפתור
    const buttonPositions = [
        { top: '132px', left: '381.5px' },
        { top: '132px', left: '472px' },
        { top: '132px', left: '560px' },
        { top: '210px', left: '339px' },
        { top: '210px', left: '429px' },
        { top: '210px', left: '515px' },
        { top: '210px', left: '603px' },
        { top: '284px', left: '381.5px' },
        { top: '284px', left: '472px' },
        { top: '284px', left: '560px' }
    ];

    // יצירת אובייקטים Audio עבור הצלילים
    const defaultSound = new Audio('../sound/PBOING1.WAV');
    const randomSound = new Audio('../sound/wow.mp3');

    // יצירת 10 כפתורים
    const buttons = Array.from({ length: numButtons }, (_, i) => {
        const button = document.createElement('button');
        button.className = 'button default-color'; // קלאס כללי עבור כל הכפתורים
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

        buttons.forEach(button => button.className = 'button default-color');
        differentColorIndices.forEach(index => buttons[index].className = 'button random-color');
        
        // אתחול מספר הקשות
        clickCount = 0;
    }

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

    // עדכון תצוגת הטיימר באמצעות querySelector
    function updateTimerDisplay() {
        const timerDisplay = document.querySelector('#timer');
        if (timerDisplay) {
            timerDisplay.textContent = ` ${timeRemaining} `;
        }
    }

    function checkLevelUp() {
        if (wins > 2) {
            showMessage('עבר לשלב 3!').then(() => {
                window.location.href = "../html/game2.html"; // שנה את הקישור לדף המתאים לשלב 3
            });
        }
    }

    function showMessage(message) {
        return new Promise(resolve => {
            messageElement.textContent = message;
            messageElement.style.display = 'block';
            
            // אחרי 3 שניות (או זמן אחר) נסגור את ההודעה ונתקדם בהתאם
            setTimeout(() => {
                messageElement.style.display = 'none';
                resolve();
            }, 3000); // זמן התצוגה של ההודעה
        });
    }

    // הגדרת התנהגות כפתור
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!gameActive) return;

            if (this.classList.contains('random-color')) {
                this.className = 'button default-color';
                randomSound.play(); // נגן צליל עבור כפתור בצבע רנדומלי
                clickCount++; // הגדל את ספירת הקשות

                const remainingRandomColors = buttons.filter(btn => btn.classList.contains('random-color'));

                // אם כל הכפתורים בצבע שונה נלחצו
                if (remainingRandomColors.length === 0) {
                    wins++; // הגדל את מספר הניצחונות
                    createRandomColors();
                    checkLevelUp(); // בדוק אם צריך לעבור לשלב 2
                }
            } else {
                defaultSound.play(); // נגן צליל עבור כפתור בצבע ברירת מחדל
            }
        });
    });

    // התחלת המשחק והטיימר
    createRandomColors();
    startTimer(); // הוסף קריאה לפונקציה זו כאן

    // יצירת אלמנט לתצוגת טיימר
    const timerElement = document.createElement('div');
    timerElement.id = 'timer'; // ID זהה ל-CSS
    container.appendChild(timerElement);

    // הגדרת התנהגות כפתור Exit
    document.querySelector("#exit")?.addEventListener("click", function() {
        window.location.href = "../html/rating.html"; 
    });

    // הגדרת התנהגות כפתור Restart
    document.querySelector("#restart")?.addEventListener("click", function() {
        window.location.href = "../html/game.html"; 
    });
});

// פונקציה לשיבוש (shuffle) מערך
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// הוספת טיימר נוסף עם setInterval
setInterval(() => {
    // הוספת פעולה מתמשכת או לבדוק משהו כל פרק זמן קבוע
    console.log('טיימר נוסף פועל כל שנייה');
}, 1000); // 1000 מ"ל = 1 שנייה