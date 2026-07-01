/* ==========================================
   EUNOIA
   Storage Layer
   Version 0.2 Alpha
========================================== */

const Storage = {

    /* ------------------------------------------
       Get data safely
    ------------------------------------------ */

    get(key, fallback = null) {

        try {

            const data = localStorage.getItem(key);

            return data ? JSON.parse(data) : fallback;

        } catch (err) {

            console.warn("Storage GET error:", key, err);

            return fallback;

        }

    },

    /* ------------------------------------------
       Save data safely
    ------------------------------------------ */

    set(key, value) {

        try {

            localStorage.setItem(key, JSON.stringify(value));

        } catch (err) {

            console.warn("Storage SET error:", key, err);

        }

    },

    /* ------------------------------------------
       Remove key
    ------------------------------------------ */

    remove(key) {

        localStorage.removeItem(key);

    },

    /* ------------------------------------------
       Clear all Eunoia data only
    ------------------------------------------ */

    clearAll() {

        Object.keys(localStorage).forEach(key => {

            if (key.startsWith("eunoia")) {

                localStorage.removeItem(key);

            }

        });

    }

};
