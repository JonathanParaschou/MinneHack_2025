// Import necessary Firebase services
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, updateDoc, DocumentData, query, where, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConstants";
import { PROMPT_COLLECTION } from "../constants/firebaseConstants";

export class PromptDataHandler {
    app: FirebaseApp | undefined;
    db: Firestore;
    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    // Fetches all submission data from the database

    async fetchPrompt() {
        try {
            const docRef = doc(this.db, PROMPT_COLLECTION, "prompt_master");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    async addUID(uid: string) {
        try {
            const docRef = doc(this.db, PROMPT_COLLECTION, "prompt_master");
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();

            console.log(data);
            if (!data) {
                throw new Error("Document not found.");
            }

            const uids = data.uids || [];
            uids.push(uid);

            await updateDoc(docRef, { uids: uids });
        } catch (e) {
            console.error("Error adding UID: ", e);
        }
    }

    async replacePrompt(prompt: string) {
        try {
            const docRef = await doc(collection(this.db, PROMPT_COLLECTION));
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();

            if (!data) {
                throw new Error("Document not found.");
            }

            await updateDoc(docRef, { prompt: prompt });
        } catch (e) {
            console.error("Error replacing prompt: ", e);
        }
    }
}
