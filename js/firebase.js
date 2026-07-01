import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

/* ==========================================
   FIREBASE CONFIG (YOUR PROJECT)
========================================== */

const firebaseConfig = {
  apiKey: "AIzaSyDK3xSGYDDwM6P6rvV_l3d9Fy_Hhj8JcnY",
  authDomain: "eunoiamh.firebaseapp.com",
  projectId: "eunoiamh",
  storageBucket: "eunoiamh.appspot.com",
  messagingSenderId: "102784803445",
  appId: "1:102784803445:web:ba0609ee23d37e26dbce3c",
  measurementId: "G-E20NRGX4B8"
};

/* ==========================================
   INIT FIREBASE
========================================== */

const app = initializeApp(firebaseConfig);

/* AUTH (IMPORTANT — THIS WAS MISSING) */
export const auth = getAuth(app);

/* ANALYTICS (optional but fine) */
export const analytics = getAnalytics(app);
