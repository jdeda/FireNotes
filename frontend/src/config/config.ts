import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtOb7shSvRgTlut70IHAAJOaKLQ1GOMjM",
    authDomain: "firenotes-10199.firebaseapp.com",
    projectId: "firenotes-10199",
    storageBucket: "firenotes-10199.appspot.com",
    messagingSenderId: "126854689100",
    appId: "1:126854689100:web:a8f61b80371a249ed55fe9",
    measurementId: "G-8D2JJL1DR6"
};

export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);





// FIRESTORE
// rules_version = '2';
// service cloud.firestore {
//     match / databases / { database } / documents {
//         match / { document=**} {
//       allow read, write: if false;
//         }
//     }
// }
