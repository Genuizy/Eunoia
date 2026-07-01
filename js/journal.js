/* ==========================================
   EUNOIA
   Journal System
   Version 0.1 Alpha
========================================== */

const titleInput = document.getElementById("entryTitle");
const moodSelect = document.getElementById("moodSelect");
const journalText = document.getElementById("journalText");

const saveBtn = document.getElementById("saveEntry");
const clearBtn = document.getElementById("clearEntry");
const newBtn = document.getElementById("newEntryBtn");

const searchInput = document.getElementById("searchInput");
const entriesList = document.getElementById("entriesList");

let entries = JSON.parse(localStorage.getItem("eunoiaJournal")) || [];

let selectedId = null;

/* ==========================================
   Render Entries
========================================== */

function renderEntries(filter = "") {

    entriesList.innerHTML = "";

    const filtered = entries.filter(entry => {

        const search = filter.toLowerCase();

        return (
            entry.title.toLowerCase().includes(search) ||
            entry.text.toLowerCase().includes(search)
        );

    });

    if(filtered.length === 0){

        entriesList.innerHTML = `
        <div class="entry-card">
            <h3>No Entries</h3>
            <p>Create your first journal entry.</p>
        </div>
        `;

        return;

    }

    filtered.sort((a,b)=>b.created-a.created);

    filtered.forEach(entry=>{

        const card=document.createElement("div");

        card.className="entry-card";

        if(entry.id===selectedId){

            card.classList.add("active-entry");

        }

        card.innerHTML=`

            <h3>${entry.title}</h3>

            <p>${entry.text.substring(0,80)}...</p>

            <span>

                ${entry.mood}

                •

                ${new Date(entry.created).toLocaleDateString()}

            </span>

        `;

        card.onclick=()=>loadEntry(entry.id);

        entriesList.appendChild(card);

    });

}

/* ==========================================
   Save
========================================== */

function saveEntry(){

    const title=titleInput.value.trim() || "Untitled";

    const text=journalText.value.trim();

    if(text===""){

        alert("Please write something first.");

        return;

    }

    if(selectedId){

        const entry=entries.find(e=>e.id===selectedId);

        entry.title=title;
        entry.text=text;
        entry.mood=moodSelect.value;
        entry.updated=Date.now();

    }

    else{

        entries.push({

            id:Date.now(),

            title,

            text,

            mood:moodSelect.value,

            created:Date.now(),

            updated:Date.now()

        });

    }

    localStorage.setItem(

        "eunoiaJournal",

        JSON.stringify(entries)

    );

    renderEntries();

}

/* ==========================================
   Load Entry
========================================== */

function loadEntry(id){

    const entry=entries.find(e=>e.id===id);

    if(!entry) return;

    selectedId=id;

    titleInput.value=entry.title;

    journalText.value=entry.text;

    moodSelect.value=entry.mood;

    renderEntries();

}

/* ==========================================
   New Entry
========================================== */

function newEntry(){

    selectedId=null;

    titleInput.value="";

    journalText.value="";

    moodSelect.selectedIndex=0;

    renderEntries();

}

/* ==========================================
   Delete / Clear
========================================== */

function clearEntry(){

    if(selectedId){

        if(confirm("Delete this journal entry?")){

            entries=entries.filter(e=>e.id!==selectedId);

            localStorage.setItem(

                "eunoiaJournal",

                JSON.stringify(entries)

            );

            newEntry();

        }

    }

    else{

        titleInput.value="";

        journalText.value="";

    }

}

/* ==========================================
   Search
========================================== */

searchInput.addEventListener("input",()=>{

    renderEntries(searchInput.value);

});

/* ==========================================
   Auto Save
========================================== */

setInterval(()=>{

    if(journalText.value.trim()==="") return;

    saveEntry();

},30000);

/* ==========================================
   Events
========================================== */

saveBtn.addEventListener("click",saveEntry);

clearBtn.addEventListener("click",clearEntry);

newBtn.addEventListener("click",newEntry);

/* ==========================================
   Initial Load
========================================== */

renderEntries();
