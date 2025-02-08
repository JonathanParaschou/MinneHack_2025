// Import necessary Firebase services
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./constants/firebaseConstants";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Fetch data from Firestore
async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot.id, " => ", docSnapshot.data());
      });
    } catch (e) {
      console.error("Error fetching data: ", e);
    }
  }
  
  // Add data to Firestore
  async function addData() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: "John Doe",
        age: 30,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }