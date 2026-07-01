/* ==========================================
   EUNOIA
   Mood System
   Version 0.2 Alpha
========================================== */

const moodButtons = document.querySelectorAll(".moods button");

const saveMoodBtn = document.getElementById("saveMood");

const notes = document.getElementById("moodNotes");

const energy = document.getElementById("energy");
const stress = document.getElementById("stress");
const focus = document.getElementById("focus");
const sleep = document.getElementById("sleep");
const motivation = document.getElementById("motivation");

let selectedMood = null;

/* ==========================================
   Storage Key
========================================== */

const MOOD_KEY = "eunoiaMood";

/* ==========================================
   Get Today's Date Key
========================================== */

function getTodayKey(){

    const d = new Date();

    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

}

/* ==========================================
   Load Existing Mood
========================================== */

function loadMood(){

    const data = Storage.get(MOOD_KEY, {});

    const today = getTodayKey();

    if(data[today]){

        const entry = data[today];

        selectedMood = entry.mood;

        notes.value = entry.notes || "";

        energy.value = entry.energy ?? 5;
        stress.value = entry.stress ?? 5;
        focus.value = entry.focus ?? 5;
        sleep.value = entry.sleep ?? 5;
        motivation.value = entry.motivation ?? 5;

        moodButtons.forEach(btn=>{

            if(btn.dataset.mood === selectedMood){

                btn.classList.add("active-mood");

            }

        });

    }

}

/* ==========================================
   Select Mood
========================================== */

moodButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        moodButtons.forEach(b=>b.classList.remove("active-mood"));

        btn.classList.add("active-mood");

        selectedMood = btn.dataset.mood;

    });

});

/* ==========================================
   Save Mood
========================================== */

function saveMood(){

    const today = getTodayKey();

    const data = Storage.get(MOOD_KEY, {});

    data[today] = {

        mood: selectedMood || "Neutral",

        energy: Number(energy.value),

        stress: Number(stress.value),

        focus: Number(focus.value),

        sleep: Number(sleep.value),

        motivation: Number(motivation.value),

        notes: notes.value,

        timestamp: Date.now()

    };

    Storage.set(MOOD_KEY, data);

    saveMoodBtn.textContent = "Saved ✔";

    setTimeout(()=>{

        saveMoodBtn.textContent = "💾 Save Mood";

    },1500);

}

/* ==========================================
   Events
========================================== */

saveMoodBtn.addEventListener("click", saveMood);

/* ==========================================
   Init
========================================== */

loadMood();
