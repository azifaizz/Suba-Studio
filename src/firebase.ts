import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0FxCyU-ugDMWA5uDmwKrpU_6vRyfujVQ",
    authDomain: "suba-studios-63b26.firebaseapp.com",
    projectId: "suba-studios-63b26",
    storageBucket: "suba-studios-63b26.firebasestorage.app",
    messagingSenderId: "659487429340",
    appId: "1:659487429340:web:36d107fdc8d478f3e15a19",
    measurementId: "G-Z5F5T33G01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
