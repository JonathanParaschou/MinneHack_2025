// Import necessary Firebase services
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore } from "firebase/firestore";
import { firebaseConfig } from "./constants/firebaseConstants";
import { SUBMISSION_COLLECTION } from "./constants/firebaseConstants";
import { SubmissionInfo } from "models/ISubmissionInfo";

export class FirebaseSubmissions {
    app: FirebaseApp | undefined;
    db: Firestore;

    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    async fetchData() {
        try {
            const querySnapshot = await getDocs(collection(this.db, SUBMISSION_COLLECTION));
            querySnapshot.forEach((docSnapshot) => {
                console.log(docSnapshot.id, " => ", docSnapshot.data());
            });
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    async addData(submissionData: SubmissionInfo) {
        try {
            const docRef = await addDoc(collection(this.db, SUBMISSION_COLLECTION), submissionData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}