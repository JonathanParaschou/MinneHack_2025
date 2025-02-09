import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, updateDoc, query, where, DocumentData, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConstants";
import { AUTHENTICATION_COLLECTION } from "../constants/firebaseConstants";
import { UserInfo } from "interfaces/IUserInfo";

export class UserDataHandler {
    app: FirebaseApp | undefined;
    db: Firestore;
    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    // FETCH ALL DATA
    async fetchAllData() {
        try {
            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION);
            const querySnapshot = await getDocs(usersRef);
            let ret: UserInfo[] = [];
            querySnapshot.forEach((docSnapshot: DocumentData) => {
                console.log('user!');
                ret.push(docSnapshot.data() as UserInfo);
            });
            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    // READ
    async fetchData(uid : string) {
        try {
            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION)
            const q = query(usersRef, where('uid', '==', uid));
            const querySnapshot = await getDocs(collection(this.db, AUTHENTICATION_COLLECTION));
            let ret: UserInfo[] = [];
            
            querySnapshot.forEach((docSnapshot: DocumentData) => {
                ret.push(docSnapshot.data() as UserInfo);
            });
            if (querySnapshot.empty) {
                return ret;
            }
            let userData;
            querySnapshot.forEach(doc => {
                userData = { id: doc.id, ...doc.data() }; // Assuming only one result
            });
            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    // CREATE
    async addData(userData: UserInfo) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, userData.uid);
            await setDoc(docRef, userData);
        } catch (e) {
            throw new Error("Error adding document: " + e);
        }
    }

    // UPDATE
    async updateData(id: string, updatedData: Partial<UserInfo>) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, id);
            await updateDoc(docRef, updatedData);
            console.log(`Document with ID ${id} updated.`);
        } catch (e) {
            throw new Error("Error updating document: " + e);
        }
    }


    public async authenticate(req : any, res : any, next : any) {
        
        try {
            console.log(req);
            console.log(res);
            const apikey = req.headers.apikey;
            if (!apikey) {
                return res.status(401).json({ message: 'API key is required.' });
            }
    
            // Query Firestore to check if the API key exists
            const keysRef = collection(this.db, AUTHENTICATION_COLLECTION); 
            const q = query(keysRef, where('apiKey', '==', apikey));
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