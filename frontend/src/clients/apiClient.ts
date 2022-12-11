import { FirebaseApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseApp, firebaseDB } from "../config/config";
import { Folder, UserProps } from "../model/model";
import { dataClient } from "./dataClient";

function getCurrentAuthUser(app?: FirebaseApp | undefined): User {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (user === null) { throw new Error(`no user currrently authorized`); }
    return user;
}

type APIClient = {
    signup(email: string, password: string): Promise<UserProps>,
    signin(email: string, password: string): Promise<UserProps>,
    signout(): Promise<boolean>,
    saveAll(folders: Folder[]): Promise<boolean>,
    getAllFolders(): Promise<Folder[]>,
}

const apiClient: APIClient = {
    async saveAll(folders: Folder[]): Promise<boolean> {
        const user = getCurrentAuthUser(firebaseApp);
        const docRef = doc(firebaseDB, user.uid, "folders");
        if (folders.length == 0) {
            await updateDoc(docRef, {
                folders: "[]"
            });
        }
        else {
            await updateDoc(docRef, {
                folders: JSON.stringify(folders)
            });
        }
        return true;
    },

    async signup(email: string, password: string): Promise<UserProps> {
        const auth = getAuth(firebaseApp);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userProps: UserProps = {
                    username: user.displayName ? user.displayName : "",
                    email: email,
                    user: user
                };
                return userProps;
            })
            .catch(error => {
                throw new Error(error);
            });
    },
    async signin(email: string, password: string): Promise<UserProps> {
        const auth = getAuth(firebaseApp);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userProps: UserProps = {
                    username: user.displayName ? user.displayName : "",
                    email: email,
                    user: user
                };
                return userProps;
            })
            .catch(error => {
                throw new Error(error);
            });

    },
    async signout(): Promise<boolean> {
        const auth = getAuth(firebaseApp);
        return signOut(auth).then(() => {
            return true;
        }).catch(error => {
            throw new Error(error);
        });
    },
    /**
     * Fetches all folders belonging to currently auth'd user.
     * Creates an empty folder collection for the user if 
     * the user has no folder.
     */
    async getAllFolders(): Promise<Folder[]> {
        const user = getCurrentAuthUser(firebaseApp);
        const docRef = doc(firebaseDB, user.uid, "folders");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = dataClient.dataToFolders(docSnap.data());
            return data;
        } else {
            await setDoc(doc(firebaseDB, user.uid, "folders"), []);
            return [];
        }
    }
}

export default apiClient;