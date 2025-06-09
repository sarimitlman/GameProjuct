function navigateToPage(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myButton1").addEventListener("click", function() {
        navigateToPage("game1.html"); // שנה לכתובת של הדף שלך
    });
    document.getElementById("myButton2").addEventListener("click", function() {
        navigateToPage("game2.html"); // שנה לכתובת של הדף שלך
    });
    document.getElementById("myButton3").addEventListener("click", function() {
        navigateToPage("game3.html"); // שנה לכתובת של הדף שלך
    });
});