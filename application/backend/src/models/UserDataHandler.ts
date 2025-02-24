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

    async fetchAllNonUserData(uid: string) {
        try {
            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION);
            const querySnapshot = await getDocs(usersRef);
            let ret: UserInfo[] = [];
            querySnapshot.forEach((docSnapshot: DocumentData) => {
                const user = docSnapshot.data() as UserInfo;
                if (user.uid !== uid) {
                    ret.push(user);
                }
            });
            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    async fetchAllNonUserFriendsData(uid: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }

            const friends = data.friends;
            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION);
            const querySnapshot = await getDocs(usersRef);
            let ret: UserInfo[] = [];
            querySnapshot.forEach((docSnapshot: DocumentData) => {
                const user = docSnapshot.data() as UserInfo;
                if (!friends.includes(user.uid.toString()) && user.uid !== uid) {
                    ret.push(user);
                }
            });
            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    async fetchUserFriendsData(uid: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }

            const friends = data.friends;

            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION);
            const querySnapshot = await getDocs(usersRef);
            let ret: UserInfo[] = [];
            querySnapshot.forEach((docSnapshot: DocumentData) => {
                const user = docSnapshot.data() as UserInfo;
                if (friends.includes(user.uid.toString()) && user.uid !== uid) {
                    ret.push(user);
                }
            });
            return ret;
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }


    // READ
    async fetchUserDataByUID(uid: string) {
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

    async fetchUserDataByCreatorIds(creatorIds: string[]) {
        try {
            const usersRef = collection(this.db, AUTHENTICATION_COLLECTION);
            const q = query(usersRef, where('uid', 'in', creatorIds));
            const querySnapshot = await getDocs(q);
            let ret: UserInfo[] = [];
            querySnapshot.forEach((docSnapshot: DocumentData) => {
                const user = docSnapshot.data() as UserInfo;
                ret.push(user);
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
        } catch (e) {
            throw new Error("Error updating document: " + e);
        }
    }
}