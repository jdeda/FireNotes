import { Folder, Note, UserProps } from "../model/model"
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp, firebaseDB } from "../config/config"
import { getFirestore, getDocs, setDoc, addDoc, updateDoc, deleteDoc, collection, doc, getDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import uuid from "react-uuid";
import { dataClient } from "./dataClient";

function getCurrentAuthUser(app?: FirebaseApp | undefined): User {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (user === null) { throw new Error(`no user currrently authorized`); }
    return user;
}

type APIClient = {
    // AUTH.
    signup(email: string, password: string): Promise<UserProps>,
    signin(email: string, password: string): Promise<UserProps>,
    signout(): Promise<boolean>,

    // FOLDER.
    getAllFolders(): Promise<Folder[]>,
    createFolder(): Promise<boolean>,
    deleteFolder(folderID: string): Promise<boolean>,
    // getFolder(folderID: string): Promise<Folder>,
    // updateFolder(folderID: string, folder: Folder): Promise<boolean>,

    // NOTE.
    // getNote(noteID: string): Promise<Note>,
    // updateNote(folderID: string, noteID: string, note: Note): Promise<boolean>,
    // createNote(folderID: string): Promise<boolean>,
    // deleteNote(folderID: string, noteId: string): Promise<boolean>
}

const apiClient: APIClient = {
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
            const data = dataClient.dataToFolders(docSnap.data() as any);
            return data;
        } else {
            await setDoc(doc(firebaseDB, user.uid, "folders"), []);
            return [];
        }
    },

    // Creates a new folder for the currently auth'd user.
    createFolder: function (): Promise<boolean> {
        const user = getCurrentAuthUser(firebaseApp);
        throw new Error("Function not implemented.");
    },

    // Creates a new folder for the currently auth'd user.
    deleteFolder: function (folderID: string): Promise<boolean> {
        const user = getCurrentAuthUser(firebaseApp);
        throw new Error("Function not implemented.");
    }
}

export default apiClient;