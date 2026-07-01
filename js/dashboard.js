/* ==========================================
   EUNOIA
   Dashboard JavaScript
   Version 0.1 Alpha
========================================== */

/* ------------------------------------------
   Security Check
------------------------------------------ */

if (localStorage.getItem("eunoiaUnlocked") !== "true") {
    window.location.href = "index.html";
}

/* ------------------------------------------
   Logout
------------------------------------------ */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("eunoiaUnlocked");

            window.location.href = "index.html";

        }

    });

}

/* ------------------------------------------
   Greeting
------------------------------------------ */

const greetingTitle = document.querySelector("header h1");

if (greetingTitle) {

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good Morning ☀️";

    }

    else if (hour < 18) {

        greeting = "Good Afternoon 🌤️";

    }

    else {

        greeting = "Good Evening 🌙";

    }

    greetingTitle.textContent = greeting;

}

/* ------------------------------------------
   Quote Of The Day
------------------------------------------ */

const quotes = [

    "Every small step counts.",

    "Progress is still progress.",

    "Take life one day at a time.",

    "Be proud of how far you've come.",

    "Growth isn't always loud.",

    "Rest is productive too.",

    "You don't need to be perfect to improve.",

    "Small habits create big changes.",

    "Be kind to yourself today.",

    "Your future self will thank you."

];

const quoteElement = document.getElementById("dailyQuote");

if (quoteElement) {

    const today = new Date().getDate();

    quoteElement.textContent = quotes[today % quotes.length];

}

/* ------------------------------------------
   Current Date
------------------------------------------ */

const dateElement = document.getElementById("currentDate");

if (dateElement) {

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString(undefined, {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}

/* ------------------------------------------
   Theme
------------------------------------------ */

const savedTheme = localStorage.getItem("eunoiaTheme");

if (savedTheme) {

    document.body.classList.add(savedTheme);

}

/* ------------------------------------------
   Future Placeholder
------------------------------------------ */

console.log("Eunoia Dashboard Loaded Successfully");
