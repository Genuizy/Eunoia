/* ==========================================
   EUNOIA
   Safety System
   Version 0.2 Alpha
========================================== */

const box = document.getElementById("breathingBox");
const startBtn = document.getElementById("startBreathing");

let breathing = false;

/* ==========================================
   Breathing Loop
========================================== */

function breathe(){

    if(!breathing) return;

    box.textContent = "Inhale";

    box.classList.add("breathing-in");

    box.classList.remove("breathing-out");

    setTimeout(()=>{

        if(!breathing) return;

        box.textContent = "Exhale";

        box.classList.add("breathing-out");

        box.classList.remove("breathing-in");

    },4000);

}

/* ==========================================
   Start / Stop
========================================== */

startBtn.addEventListener("click", ()=>{

    breathing = !breathing;

    if(breathing){

        startBtn.textContent = "Stop";

        breathe();

        const loop = setInterval(()=>{

            if(!breathing){

                clearInterval(loop);

                return;

            }

            breathe();

        },8000);

    } else {

        startBtn.textContent = "Start";

        box.textContent = "Start";

        box.classList.remove("breathing-in","breathing-out");

    }

});
