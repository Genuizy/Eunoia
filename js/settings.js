/* ==========================================
   EUNOIA
   Settings System
   Version 0.2 Alpha
========================================== */

const EXPORT_KEY = "eunoia";

const exportBtn = document.getElementById("exportBtn");

const resetBtn = document.getElementById("resetBtn");

const lockBtn = document.getElementById("lockBtn");

/* ==========================================
   EXPORT DATA
========================================== */

function exportData(){

    const data = {

        journal: Storage.get("eunoiaJournal", []),

        mood: Storage.get("eunoiaMood", {}),

        habits: Storage.get("eunoiaHabits", []),

        goals: Storage.get("eunoiaGoals", []),

        exportedAt: new Date().toISOString()

    };

    const blob = new Blob([JSON.stringify(data,null,2)],{

        type:"application/json"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "eunoia-backup.json";

    a.click();

}

/* ==========================================
   RESET APP
========================================== */

function resetApp(){

    if(confirm("This will delete ALL data. Continue?")){

        Storage.clearAll();

        localStorage.removeItem("eunoiaTheme");

        localStorage.removeItem("eunoiaUnlocked");

        window.location.href = "index.html";

    }

}

/* ==========================================
   LOCK APP
========================================== */

function lockApp(){

    localStorage.setItem("eunoiaUnlocked","false");

    window.location.href = "index.html";

}

/* ==========================================
   EVENTS
========================================== */

exportBtn.addEventListener("click", exportData);

resetBtn.addEventListener("click", resetApp);

lockBtn.addEventListener("click", lockApp);
