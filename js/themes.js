/* ==========================================
   EUNOIA
   Theme System
   Version 0.2 Alpha
========================================== */

const THEME_KEY = "eunoiaTheme";

const buttons = document.querySelectorAll(".theme-btn");

/* ==========================================
   Load Theme
========================================== */

function loadTheme(){

    const theme = localStorage.getItem(THEME_KEY);

    if(theme){

        document.body.classList.add(theme);

    }

}

/* ==========================================
   Save Theme
========================================== */

function applyTheme(theme){

    document.body.classList.remove(
        "theme-dark",
        "theme-ocean",
        "theme-forest",
        "theme-sunset"
    );

    document.body.classList.add(theme);

    localStorage.setItem(THEME_KEY, theme);

}

/* ==========================================
   Events
========================================== */

buttons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        applyTheme(btn.dataset.theme);

    });

});

/* ==========================================
   Init
========================================== */

loadTheme();
