import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvKHZJBU8PjllsSiKdhFm8mohHTDZAnAc",
    authDomain: "software-crafters.firebaseapp.com",
    projectId: "software-crafters",
    storageBucket: "software-crafters.appspot.com",
    messagingSenderId: "395722433678",
    appId: "1:395722433678:web:833c3213154987b72ed5df",
    measurementId: "G-188970TZHT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
