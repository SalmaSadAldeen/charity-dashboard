// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"; // هذه كانت ناقصة في الاستيراد
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMwYNRlo_xlSvyqcJMWiYeVqZJ7-usMio",
  authDomain: "association-system-1601d.firebaseapp.com",
  projectId: "association-system-1601d",
  storageBucket: "association-system-1601d.firebasestorage.app",
  messagingSenderId: "335108424121",
  appId: "1:335108424121:web:8d1d1cf07d64adf9ff7668",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);


//BD2IU2XiRhPo7K5e_kz5gvSVbTEtHqa93Kkkh8rMUbl_v9h59gEbyHIoS0N4NAIPYHRL_F68UNgWEtrWPgvplm8