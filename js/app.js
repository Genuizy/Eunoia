/* ==========================================
   EUNOIA
   App Controller
   Version 0.2 Alpha
========================================== */

const Eunoia = {

    version: "0.2 Alpha",

    storage: {

        journal: "eunoiaJournal",

        theme: "eunoiaTheme",

        unlocked: "eunoiaUnlocked",

        settings: "eunoiaSettings"

    },

    pages: {

        dashboard: "dashboard.html",

        journal: "journal.html",

        mood: "mood.html",

        habits: "habits.html",

        goals: "goals.html",

        insights: "insights.html",

        settings: "settings.html"

    }

};

/* ==========================================
   Navigation
========================================== */

function go(page){

    if(Eunoia.pages[page]){

        window.location.href = Eunoia.pages[page];

    }

}

/* ==========================================
   Logout
========================================== */

function logout(){

    if(confirm("Logout from Eunoia?")){

        localStorage.removeItem(Eunoia.storage.unlocked);

        window.location.href = "index.html";

    }

}

/* ==========================================
   Theme
========================================== */

function loadTheme(){

    const theme = localStorage.getItem(Eunoia.storage.theme);

    if(theme){

        document.body.classList.add(theme);

    }

}

function saveTheme(theme){

    document.body.className = document.body.className.replace(/\btheme-\S+/g,'');

    document.body.classList.add(theme);

    localStorage.setItem(Eunoia.storage.theme, theme);

}

/* ==========================================
   Greeting
========================================== */

function greeting(){

    const hour = new Date().getHours();

    if(hour < 12) return "Good Morning ☀️";

    if(hour < 18) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";

}

/* ==========================================
   Today's Date
========================================== */

function today(){

    return new Date().toLocaleDateString(undefined,{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}

console.log("Eunoia Loaded");
