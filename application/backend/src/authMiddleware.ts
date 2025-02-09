import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, updateDoc, query, where, DocumentData, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./constants/firebaseConstants";
import { AUTHENTICATION_COLLECTION } from "./constants/firebaseConstants";
import { UserInfo } from "interfaces/IUserInfo";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export async function authenticate(req: any, res: any, next: any) {
    try {
        const uid = req.headers['authorization'];

        if (!uid) {
            return res.status(400).json({ error: "Missing UID" });
        }

        const usersRef = collection(db, AUTHENTICATION_COLLECTION);
        const q = query(usersRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        else {
            next();
        }
    } catch (e) {
        console.error("Error fetching data: ", e);
        return res.status(500).json({ error: "Internal server error" });
    }
}