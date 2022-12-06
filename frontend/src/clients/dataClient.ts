import { Folder, Note } from "../model/model";

type DataClient = {
    dataToFolders(data: any): Folder[]

}
export const dataClient: DataClient = {
    dataToFolders(data: any): Folder[] {
        if (!Array.isArray(data)) { return []; }
        if (data.length == 0) { return []; }
        const converted = data.map((folder: any): Folder => {
            const notes: Note[] = folder.notes.map((note: any) => {
                return {
                    id: note.id,
                    title: note.title,
                    description: note.description,
                    lastEdit: note.lastEdit,
                    folderID: note.folderID,
                }
            });
            const folderF: Folder = {
                id: folder.id,
                name: folder.name,
                notes: notes
            };
            return folderF;
        });
        return converted;
    }
}