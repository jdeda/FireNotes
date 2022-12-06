import { User } from "firebase/auth"


export type Note = {
    id: string
    title: string
    description: string
    lastEdit: Date
    folderID: string
}

export type Folder = {
    id: string
    name: string
    notes: Note[]
}

export function formatDate(date: Date): string {
    const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', year: 'numeric', };
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
}


export type UserProps = {
    username: string;
    email: string
    user: User
}
export type RoutingErrorProps = {

}

export enum RoutingError {
    AlreadyLoggedIn,
    NotLoggedIn,
    PageNotFound
}

export function RoutingErrorMessage(error: RoutingError): string {
    switch (error) {
        case RoutingError.AlreadyLoggedIn:
            return "Oops! Looks like you're logged in";
        case RoutingError.NotLoggedIn:
            return "Oops! Looks like you're not logged in";
        case RoutingError.PageNotFound:
            return "Oops! Page not found";
        default:
            return "";
    }
}