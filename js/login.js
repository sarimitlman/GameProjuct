// משתנים גלובליים
let form1;
let form2;
let arrUsers;

window.onload = function () {
    // הגדרת משתנים
    form1 = document.getElementById("form1");
    form2 = document.getElementById("form2");
    arrUsers = JSON.parse(localStorage.getItem('arrUser')) || [];
    
    // מציאת הקישורים הנכונים
    let log = document.querySelector('.link a[href="#"][onclick*="switchToLogin"]');
    let sign = document.querySelector('.link a[href="#"][onclick*="switchToSignUp"]');

    // בדיקה אם האלמנטים קיימים
    if (log) log.addEventListener("click", changeTologIn);
    if (sign) sign.addEventListener("click", changeTosignUp);
    
    let signing = document.getElementById('form2');
    signing.addEventListener('submit', signUp);

    let loging = document.getElementById('form1');
    loging.addEventListener('submit', logIn);
}

// מעבר לכניסה
function changeTologIn(event) {
    event.preventDefault(); // חשוב למנוע פעולה ברירת מחדל של הקישור
    form1.style.display = 'block';
    form2.style.display = 'none';
}

// מעבר להרשמה
function changeTosignUp(event) {
    event.preventDefault(); // חשוב למנוע פעולה ברירת מחדל של הקישור
    form1.style.display = 'none';
    form2.style.display = 'block';
}

// הרשמה
function signUp(event) {
    event.preventDefault();
    
    let new_name = document.getElementById('user').value;
    let new_password = document.getElementById('password').value;
    let new_email = document.getElementById('email').value;
    let newuser = {
        user: new_name,
        password: new_password,
        email: new_email
    };

    if (arrUsers.find(element => element.email == new_email)) {
        alert('You are an existing user, please log in with your email and password');
        return;
    }

    if (new_password.length < 4) {
        alert('Your password must contain a minimum of 4 characters');
        return;
    }

    arrUsers.push(newuser);
    localStorage.setItem('arrUser', JSON.stringify(arrUsers));
    alert('Successful Sign Up');

}

// כניסה
function logIn(event) {
    event.preventDefault();

    let new_email = document.getElementById('Lemail').value;
    let new_password = document.getElementById('Lpassword').value;
    
    if (arrUsers.find(element => element.email == new_email && element.password == new_password)) {
        localStorage.setItem('userName', JSON.stringify(new_email));
        window.location = "../html/rating.html";
    } else {
        alert('Invalid email or password');
    }
}

