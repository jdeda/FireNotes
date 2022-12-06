import { Folder, Note, UserProps } from "../model/model"
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp, firebaseDB } from "../config/config"
import { getFirestore, getDocs, addDoc, updateDoc, deleteDoc, collection, doc, getDoc } from "firebase/firestore";

type APIClient = {
    // AUTH.
    signup(email: string, password: string): Promise<UserProps>,
    signin(email: string, password: string): Promise<UserProps>,
    signout(): Promise<boolean>,

    // FOLDER.
    getAllFolders(): Promise<Folder[]>,
    getFolder(folderID: number): Promise<Folder>,
    updateFolder(folderID: number, folder: Folder): Promise<boolean>,
    createFolder(): Promise<boolean>,
    deleteFolder(folderID: number): Promise<boolean>,

    // NOTE.
    getNote(noteID: number): Promise<Note>,
    updateNote(folderID: number, noteID: number, note: Note): Promise<boolean>,
    createNote(folderID: number): Promise<boolean>,
    deleteNote(folderID: number, noteId: number): Promise<boolean>
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
                }
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
                }
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
    async getAllFolders(): Promise<Folder[]> {
        // Get user and check.
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        if (user === null) { return []; }

        // Get user data.
        const docRef = doc(firebaseDB, user.uid, "folders");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Document data:", data);
          } else {
            console.log("No such document!");
          }
        throw new Error("Function not implemented.")
    },
    async getFolder(folderID: number): Promise<Folder> {
        throw new Error("Function not implemented.")
    },
    async getNote(noteID: number): Promise<Note> {
        throw new Error("Function not implemented.")
    },
    async updateFolder(folderID: number, folder: Folder): Promise<boolean> {
        // firebase.database().ref('users/' + user.uid).set(user).catch(error => {
        //     console.log(error.message)
        // });

        throw new Error("Function not implemented.")
    },
    async updateNote(folderID: number, noteID: number, note: Note): Promise<boolean> {
        throw new Error("Function not implemented.")
    },
    async createFolder(): Promise<boolean> {
        throw new Error("Function not implemented.")
    },
    async createNote(folderID: number): Promise<boolean> {
        throw new Error("Function not implemented.")
    },
    async deleteFolder(folderID: number): Promise<boolean> {
        throw new Error("Function not implemented.")
    },
    async deleteNote(folderID: number, noteId: number): Promise<boolean> {
        throw new Error("Function not implemented.")
    }
}

export default apiClient;