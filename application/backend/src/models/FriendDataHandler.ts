import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Firestore, deleteDoc, doc, getDoc, updateDoc, query, where, DocumentData, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseConstants";
import { AUTHENTICATION_COLLECTION } from "../constants/firebaseConstants";
import { UserInfo } from "interfaces/IUserInfo";

export class FriendDataHandler {
    app: FirebaseApp | undefined;
    db: Firestore;
    constructor() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        this.db = getFirestore(app);
    }

    // send request
    async sendRequest(uid: string, friendId: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, friendId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }
            const friendRequests = data.friendRequests || [];
            friendRequests.push(uid);
            await updateDoc(docRef, { friendRequests: friendRequests });
        } catch (e) {
            console.error("Error sending request: ", e);
        }
    }

    // accept request
    async acceptRequest(uid: string, friendId: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, friendId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }
            const friends = data.friends || [];
            friends.push(uid);
            
            await updateDoc(docRef, { friends: friends });

            const docRef2 = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap2 = await getDoc(docRef2);
            const data2 = docSnap2.data();
            if (!data2) {
                throw new Error("Document not found.");
            }

            const friendRequests = data2.friendRequests || [];
            const index = friendRequests.indexOf(friendId);
            friendRequests.splice(index, 1);

            const friends2 = data2.friends || [];
            friends2.push(friendId);
            await updateDoc(docRef2, { friends: friends2, friendRequests: friendRequests });
        } catch (e) {
            console.error("Error accepting request: ", e);
        }
    }

    async rejectRequest(uid: string, friendId: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }
            const friendRequests = data.friendRequests || [];
            const index = friendRequests.indexOf(friendId);
            friendRequests.splice(index, 1);
            await updateDoc(docRef, { friendRequests: friendRequests });
        } catch (e) {
            console.error("Error rejecting request: ", e);
        }
    }

    async removeFriend(uid: string, friendId: string) {
        try {
            const docRef = doc(this.db, AUTHENTICATION_COLLECTION, friendId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (!data) {
                throw new Error("Document not found.");
            }
            const friends = data.friends || [];
            const index = friends.indexOf(uid);
            friends.splice(index, 1);
            await updateDoc(docRef, { friends: friends });

            const docRef2 = doc(this.db, AUTHENTICATION_COLLECTION, uid);
            const docSnap2 = await getDoc(docRef2);
            const data2 = docSnap2.data();
            if (!data2) {
                throw new Error("Document not found.");
            }
            const friends2 = data2.friends || [];
            const index2 = friends2.indexOf(friendId);
            friends2.splice(index2, 1);
            await updateDoc(docRef2, { friends: friends2 });
        } catch (e) {
            console.error("Error removing friend: ", e);
        }
    }
    // rejest request
    // rescind request
    // remove friend
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