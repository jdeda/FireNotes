import { Folder, Note } from "../model/model";

type DataClient = {
    dataToFolders(data: any): Folder[]
}
export const dataClient: DataClient = {
    dataToFolders(dataRaw: any): Folder[] {
        console.log("dataToFolders");
        const data = JSON.parse(dataRaw.folders);
        console.log(dataRaw);
        console.log(data);
        if (!Array.isArray(data)) {
            console.log("NOOOOOOOOOOOOOOO");

            return [];
        }
        if (data.length == 0) {
            console.log("NOOOOOOOOOOOOOOO");
            return [];
        }
        console.log("yay!");
        const converted = data.map((folder: any): Folder => {
            const notes: Note[] = folder.notes.map((note: any): Note => {
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
        console.log(converted);
        return converted;
    }
    // dataToFolders(data: any): Folder[] {
    //     console.log("dataToFolders");
    //     console.log(data);
    //     if (!Array.isArray(data)) { return []; }
    //     if (data.length == 0) { return []; }
    //     const converted = data.map((folder: any): Folder => {
    //         const notes: Note[] = folder.notes.map((note: any) => {
    //             return {
    //                 id: note.id,
    //                 title: note.title,
    //                 description: note.description,
    //                 lastEdit: note.lastEdit,
    //                 folderID: note.folderID,
    //             }
    //         });
    //         const folderF: Folder = {
    //             id: folder.id,
    //             name: folder.name,
    //             notes: notes
    //         };
    //         return folderF;
    //     });
    //     return converted;
    // }
}