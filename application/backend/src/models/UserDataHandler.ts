// Import necessary Firebase services
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConstants";
import { AUTHENTICATION_COLLECTION } from "../constants/firebaseConstants";
import { SubmissionInfo } from "interfaces/ISubmissionInfo";

export class UserDataHandler {
    app: FirebaseApp | undefined;
    db: Firestore;

    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    // READ
    async fetchData(uid : string) {
        try {
            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION)
            const q = query(usersRef, where('uid', '==', uid));
            const querySnapshot = await getDocs(collection(this.db, AUTHENTICATION_COLLECTION));
            
            if (querySnapshot.empty) {
                return res.status(404).json({ message: 'User not found' });
            }

            let userData;
            querySnapshot.forEach(doc => {
                userData = { id: doc.id, ...doc.data() }; // Assuming only one result
            });

        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    // CREATE
    async addData(submissionData: SubmissionInfo) {
        try {
            await addDoc(collection(this.db, AUTHENTICATION_COLLECTION), submissionData);
        } catch (e) {
            throw new Error("Error adding document: " + e);
        }
    }

    // DESTROY
    async deleteData(id: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, id);
            await deleteDoc(docRef);
        } catch (e) {
            throw new Error("Error deleting document: " + e);
        }
    }

    // UPDATE
    async updateData(id: string, updatedData: Partial<SubmissionInfo>) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, id);

            await updateDoc(docRef, updatedData);
            console.log(`Document with ID ${id} updated.`);
        } catch (e) {
            throw new Error("Error updating document: " + e);
        }
    }

    public static async authenticate(req, res, next) {
        try {
            console.log(req);
            console.log(res);
            const apikey = req.headers.apikey;
            if (!apikey) {
                return res.status(401).json({ message: 'API key is required.' });
            }
    
            // Query Firestore to check if the API key exists
            const keysRef = collection(this.db, 'api_keys'); // Change 'api_keys' to your actual collection name
            const q = query(keysRef, where('key', '==', apikey));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                return res.status(401).json({ message: 'Unauthorized access.' });
            }
    
            next(); // API key is valid, proceed to the next middleware
        } catch (error) {
            return res.status(500).json({ message: 'Server error.', error });
        }
    }
}