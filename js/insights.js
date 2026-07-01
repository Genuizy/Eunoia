/* ==========================================
   EUNOIA
   Insights Engine (Foundation)
   Version 0.2 Alpha
========================================== */

const Insights = {

    /* ------------------------------------------
       Collect Mood Data
    ------------------------------------------ */

    getMoodData(){

        return Storage.get("eunoiaMood", {});

    },

    /* ------------------------------------------
       Collect Habit Data
    ------------------------------------------ */

    getHabitData(){

        return Storage.get("eunoiaHabits", []);

    },

    /* ------------------------------------------
       Collect Goal Data
    ------------------------------------------ */

    getGoalData(){

        return Storage.get("eunoiaGoals", []);

    },

    /* ------------------------------------------
       Basic Stats (placeholder logic)
    ------------------------------------------ */

    getStats(){

        const moods = this.getMoodData();

        const habits = this.getHabitData();

        const goals = this.getGoalData();

        return {

            totalMoods: Object.keys(moods).length,

            totalHabits: habits.length,

            totalGoals: goals.length,

        };

    }

};
