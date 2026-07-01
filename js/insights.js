/* ==========================================
   EUNOIA
   Insights Engine
   Version 0.2 Alpha
========================================== */

if (localStorage.getItem("eunoiaUnlocked") !== "true") {

    window.location.href = "index.html";

}

/* ==========================================
   Load Data
========================================== */

const journal = Storage.get("eunoiaJournal", []);
const moods = Storage.get("eunoiaMood", {});
const habits = Storage.get("eunoiaHabits", []);
const goals = Storage.get("eunoiaGoals", []);

/* ==========================================
   Helpers
========================================== */

function set(id, value){

    const el = document.getElementById(id);

    if(el) el.textContent = value;

}

/* ==========================================
   BASIC STATS
========================================== */

function loadStats(){

    set("stat-journals", Array.isArray(journal) ? journal.length : 0);

    set("stat-moods", Object.keys(moods).length);

    set("stat-habits", habits.length);

    set("stat-goals", goals.length);

}

/* ==========================================
   MOOD ANALYSIS
========================================== */

function moodAnalysis(){

    const values = Object.values(moods);

    if(values.length === 0){

        document.getElementById("mood-summary").textContent =
            "Not enough mood data yet. Start logging your mood daily.";

        return;

    }

    const moodCount = {};

    values.forEach(v => {

        const mood = v.mood || "Unknown";

        moodCount[mood] = (moodCount[mood] || 0) + 1;

    });

    const topMood = Object.keys(moodCount).reduce((a,b)=>
        moodCount[a] > moodCount[b] ? a : b
    );

    document.getElementById("mood-summary").textContent =
        `Your most common mood is "${topMood}". You’ve logged ${values.length} mood entries.`;

}

/* ==========================================
   HABIT ANALYSIS
========================================== */

function habitAnalysis(){

    if(habits.length === 0){

        document.getElementById("habit-summary").textContent =
            "No habits tracked yet.";

        return;

    }

    const total = habits.length;

    const avgStreak =
        habits.reduce((sum,h)=> sum + (h.streak || 0), 0) / total;

    document.getElementById("habit-summary").textContent =
        `You have ${total} habits with an average streak of ${avgStreak.toFixed(1)} days.`;

}

/* ==========================================
   GOAL ANALYSIS
========================================== */

function goalAnalysis(){

    if(goals.length === 0){

        document.getElementById("goal-summary").textContent =
            "No goals set yet.";

        return;

    }

    const avgProgress =
        goals.reduce((sum,g)=> sum + (g.progress || 0), 0) / goals.length;

    document.getElementById("goal-summary").textContent =
        `You have ${goals.length} goals with average progress of ${avgProgress.toFixed(1)}%.`;

}

/* ==========================================
   INIT
========================================== */

loadStats();
moodAnalysis();
habitAnalysis();
goalAnalysis();
