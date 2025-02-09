// Import necessary Firebase services
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, updateDoc, DocumentData, query, where, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConstants";
import { SUBMISSION_COLLECTION, AUTHENTICATION_COLLECTION } from "../constants/firebaseConstants";
import { SubmissionInfo } from "interfaces/ISubmissionInfo";

export class SubmissionDataHandler {
    app: FirebaseApp | undefined;
    db: Firestore;
    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    // Fetches all submission data from the database
    async fetchData(uid: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();
            if(!userData) {
                throw new Error("Document not found.");
            }

            let uids = userData.friends;
            uids.push(uid);
            
            let ret: SubmissionInfo[] = [];
            const q = query(collection(this.db, SUBMISSION_COLLECTION), where("creatorId", "in", uids));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((docSnapshot) => {
                ret.push(docSnapshot.data() as SubmissionInfo);
                console.log(docSnapshot.id, " => ", docSnapshot.data());
            });

            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    // Fetches for document by ID
    async fetchSubmissionDataById(id: string) {
        try {
            const docRef = doc(this.db, SUBMISSION_COLLECTION, id);            
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

    // Fetches all submissions based on creator ID
    async fetchSubmissionDataByCreatorIds(creatorIds: string[]) {
        try {
            const q = query(collection(this.db, SUBMISSION_COLLECTION), where("creatorId", "in", creatorIds));
            const querySnapshot = await getDocs(q);
            let ret: SubmissionInfo[] = [];

            querySnapshot.forEach((docSnapshot) => {
                ret.push(docSnapshot.data() as SubmissionInfo);
                console.log(docSnapshot.id, " => ", docSnapshot.data());
            });
            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    // Add a document into the database
    async addData(submissionData: SubmissionInfo) {
        try {
            await addDoc(collection(this.db, SUBMISSION_COLLECTION), submissionData);
        } catch (e) {
            throw new Error("Error adding document: " + e);
        }
    }

    // Delete a document based on id
    async deleteData(id: string) {
        try {
            const docRef = doc(this.db, SUBMISSION_COLLECTION, id);
            await deleteDoc(docRef);
        } catch (e) {
            throw new Error("Error deleting document: " + e);
        }
    }

    // Update and existing document
    async updateData(id: string, updatedData: Partial<SubmissionInfo>) {
        try {
            const docRef = doc(this.db, SUBMISSION_COLLECTION, id);

            await updateDoc(docRef, updatedData);
            console.log(`Document with ID ${id} updated.`);
        } catch (e) {
            throw new Error("Error updating document: " + e);
        }
    }
}
