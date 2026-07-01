/* ==========================================
   EUNOIA
   Goals System
   Version 0.2 Alpha
========================================== */

const titleInput = document.getElementById("goalTitle");
const descInput = document.getElementById("goalDesc");
const addBtn = document.getElementById("addGoalBtn");
const list = document.getElementById("goalsList");

const GOALS_KEY = "eunoiaGoals";

let goals = Storage.get(GOALS_KEY, []);

/* ==========================================
   Save
========================================== */

function save(){

    Storage.set(GOALS_KEY, goals);

}

/* ==========================================
   Render Goals
========================================== */

function render(){

    list.innerHTML = "";

    if(goals.length === 0){

        list.innerHTML = "<p style='color:#AEB7C9'>No goals yet. Create one above.</p>";

        return;

    }

    goals.forEach((goal, index)=>{

        const item = document.createElement("div");

        item.className = "goal-item";

        item.innerHTML = `

            <div class="goal-title">${goal.title}</div>

            <div class="goal-desc">${goal.desc || ""}</div>

            <div class="progress-bar">

                <div class="progress" style="width:${goal.progress || 0}%"></div>

            </div>

            <div class="goal-actions">

                <button class="inc">+ Progress</button>

                <button class="dec">- Progress</button>

                <button class="del" style="background:#ef4444">Delete</button>

            </div>

        `;

        /* + Progress */

        item.querySelector(".inc").onclick = ()=>{

            goal.progress = Math.min(100, (goal.progress || 0) + 10);

            save();

            render();

        };

        /* - Progress */

        item.querySelector(".dec").onclick = ()=>{

            goal.progress = Math.max(0, (goal.progress || 0) - 10);

            save();

            render();

        };

        /* Delete */

        item.querySelector(".del").onclick = ()=>{

            goals.splice(index,1);

            save();

            render();

        };

        list.appendChild(item);

    });

}

/* ==========================================
   Add Goal
========================================== */

function addGoal(){

    const title = titleInput.value.trim();

    if(!title) return;

    goals.push({

        title,

        desc: descInput.value.trim(),

        progress:0,

        created:Date.now()

    });

    titleInput.value = "";

    descInput.value = "";

    save();

    render();

}

/* ==========================================
   Events
========================================== */

addBtn.addEventListener("click", addGoal);

/* ==========================================
   Init
========================================== */

render();
