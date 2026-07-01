/* ==========================================
   EUNOIA
   Habits System
   Version 0.2 Alpha
========================================== */

const habitInput = document.getElementById("habitName");
const addBtn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitsList");

const HABITS_KEY = "eunoiaHabits";

/* ==========================================
   Get Today Key
========================================== */

function getToday(){

    const d = new Date();

    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

}

/* ==========================================
   Load Habits
========================================== */

let habits = Storage.get(HABITS_KEY, []);

function saveHabits(){

    Storage.set(HABITS_KEY, habits);

}

/* ==========================================
   Render
========================================== */

function render(){

    list.innerHTML = "";

    if(habits.length === 0){

        list.innerHTML = "<p style='color:#AEB7C9'>No habits yet. Add one!</p>";

        return;

    }

    const today = getToday();

    habits.forEach((habit, index)=>{

        if(!habit.history) habit.history = {};

        const doneToday = habit.history[today] === true;

        const item = document.createElement("div");

        item.className = "habit-item";

        item.innerHTML = `

            <div class="habit-left">

                <input type="checkbox" ${doneToday ? "checked" : ""}>

                <div>

                    <strong>${habit.name}</strong>

                    <div class="streak">🔥 Streak: ${habit.streak || 0} days</div>

                </div>

            </div>

            <button style="background:none;border:none;color:#ef4444;cursor:pointer;">🗑</button>

        `;

        /* Toggle completion */

        const checkbox = item.querySelector("input");

        checkbox.addEventListener("change", ()=>{

            if(!habit.history) habit.history = {};

            if(checkbox.checked){

                habit.history[today] = true;

                habit.streak = (habit.streak || 0) + 1;

            } else {

                habit.history[today] = false;

                habit.streak = Math.max(0, (habit.streak || 0) - 1);

            }

            saveHabits();

            render();

        });

        /* Delete */

        const delBtn = item.querySelector("button");

        delBtn.addEventListener("click", ()=>{

            habits.splice(index,1);

            saveHabits();

            render();

        });

        list.appendChild(item);

    });

}

/* ==========================================
   Add Habit
========================================== */

function addHabit(){

    const name = habitInput.value.trim();

    if(!name) return;

    habits.push({

        name,

        streak:0,

        history:{}

    });

    habitInput.value = "";

    saveHabits();

    render();

}

/* ==========================================
   Events
========================================== */

addBtn.addEventListener("click", addHabit);

habitInput.addEventListener("keydown", (e)=>{

    if(e.key === "Enter") addHabit();

});

/* ==========================================
   Init
========================================== */

render();
