export type Note = {
    title: string
    description: string
    lastEdit: Date
}

export type Folder = {
    id: number
    name: string
    notes: Note[]
}

export type HomePageProps = {
    folders: Folder[]
}

export type FolderPageProps = {
    folder: Folder
}


export function formatDate(date: Date): string {
    const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', year: 'numeric', };
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
}