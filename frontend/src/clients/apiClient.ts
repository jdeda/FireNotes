import { Folder, Note } from "../model/model"

type APIClient = {
    getAllFolders(): Promise<Folder[]>,
    getFolder(folderID: number): Promise<Folder>,
    getNote(noteID: number): Promise<Note>,
    updateFolder(folderID: number, folder: Folder): Promise<boolean>,
    updateNote(folderID: number, noteID: number, note: Note): Promise<boolean>,
    createNestedFolder(folderID: number): Promise<boolean>,
    createFolder(): Promise<boolean>,
    createNote(folderID: number): Promise<boolean>,
    deleteFolder(folderID: number): Promise<boolean>,
    deleteNote(folderID: number, noteId: number): Promise<boolean>
}

// TODO: localhost port should be set here somehow...
const apiClient: APIClient = {
    async getAllFolders(): Promise<Folder[]> {
        throw new Error("Function not implemented.")
        const response = await fetch(`http://localhost:2000/api/folders`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            alert(message);
            return [];
        }
    },
    async getFolder(folderID: number): Promise<Folder> {
        throw new Error("Function not implemented.")
    },
    async getNote(noteID: number): Promise<Note> {
        throw new Error("Function not implemented.")
    },
    async updateFolder(folderID: number, folder: Folder): Promise<boolean> {
        throw new Error("Function not implemented.")
    },
    async updateNote(folderID: number, noteID: number, note: Note): Promise<boolean> {
        throw new Error("Function not implemented.")
    },
    async createNestedFolder(folderID: number): Promise<boolean> {
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