import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, getDoc, updateDoc, query, where, DocumentData, setDoc } from "firebase/firestore";
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
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }
            return data as UserInfo
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
}