/* ==========================================
   EUNOIA - AUTH.JS
   Version 0.1 Alpha
========================================== */

const PASSWORD = "clockeddevelopment";

const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");
const loginCard = document.querySelector(".login-card");

/* -----------------------------------------
   Auto Login
------------------------------------------ */

if (localStorage.getItem("eunoiaUnlocked") === "true") {
    window.location.href = "dashboard.html";
}

/* -----------------------------------------
   Unlock
------------------------------------------ */

function unlock() {

    const enteredPassword = passwordInput.value.trim();

    message.style.color = "#ff9090";

    if (enteredPassword === PASSWORD) {

        message.style.color = "#8BFFB8";
        message.textContent = "Access Granted...";

        unlockBtn.disabled = true;
        unlockBtn.textContent = "Loading...";

        localStorage.setItem("eunoiaUnlocked", "true");

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 900);

    } else {

        message.textContent = "Incorrect Password";

        loginCard.classList.remove("shake");

        void loginCard.offsetWidth;

        loginCard.classList.add("shake");

        passwordInput.value = "";

        passwordInput.focus();

    }

}

/* -----------------------------------------
   Button
------------------------------------------ */

unlockBtn.addEventListener("click", unlock);

/* -----------------------------------------
   Enter Key
------------------------------------------ */

passwordInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        unlock();

    }

});

/* -----------------------------------------
   Show / Hide Password
------------------------------------------ */

togglePassword.addEventListener("click", function(){

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

    }else{

        passwordInput.type = "password";

        togglePassword.textContent = "👁";

    }

});
