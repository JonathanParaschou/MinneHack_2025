import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, getDoc, updateDoc, query, where, DocumentData, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConstants";
import { CONTEST_COLLECTION } from "../constants/firebaseConstants";
import { UserInfo } from "interfaces/IUserInfo";

export class ContestDataHandler {
    app: FirebaseApp | undefined;
    db: Firestore;
    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    // send request
    async getContest() {
        try {
            const collectionRef = collection(this.db, CONTEST_COLLECTION);
            const snapshot = await getDocs(collectionRef);
            const contestRef = snapshot.docs[0];
            const contestData = contestRef.data();
            contestData.contestId = contestRef.id;

            return contestData;
        } catch (e) {
            console.error("Error sending request: ", e);
        }
    }
}