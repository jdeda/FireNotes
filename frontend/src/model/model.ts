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

export type User = {
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    avatar: string,
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