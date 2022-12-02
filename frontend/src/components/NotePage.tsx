import {
    Button, Editable,
    EditableInput, EditablePreview, Heading, HStack, Textarea, VStack
} from "@chakra-ui/react";
import React from "react";
import { useContext, useState } from "react";
import { CgChevronLeft } from 'react-icons/cg';
import { Link } from "react-router-dom";
import { AppContext, AppProps, UserContext } from "../App";
import { Note } from "../model/model";
import uuid from 'react-uuid';

type NoteProps = {
    note: Note
}


const initial: NoteProps = {
    note: {
        id: uuid(),
        title: "",
        description: "",
        lastEdit: new Date(),
        folderID: ""
    }
}
// const mock: NoteProps = {
//     note: {
//         id: "",
//         title: "Thoughts on Dinner",
//         description: "Please describe the dish. Uh, salmon roasted on a plank of cedar. Executive chef? Executive chef. I think you're a plank. Sorry chef, not sure what that means. Plank means, idiot.",
//         // description: "\
//         // Please describe the dish. \
//         // Uh, salmon roasted on a plank of cedar. \
//         // Executive chef? \
//         // Executive chef. \
//         // I think you're a plank. \
//         // Sorry chef, not sure what that means. \
//         // Plank means, idiot. \
//         // ",

//         lastEdit: new Date(),
//         folderID: "1"
//     }
// }


const NotePage = () => {
    const [appProps, setAppProps] = useContext(AppContext);
    const [props, setProps] = useState<NoteProps>(initial);
    const [userProps, setUserProps] = useContext(UserContext);
    const noteId = ((): string => {
        const route = window.location.pathname.split("/");
        const id = route[route.length - 1];
        return id;
    })();

    // Init state w/ app context.
    React.useEffect(() => {
        if (appProps === undefined) { return; }
        const folderIdx = appProps.folders.findIndex(folder => {
            return folder.notes.find(note => note.id === noteId);
        });
        if (folderIdx === -1) { return; }
        const noteIdx = appProps.folders[folderIdx].notes.findIndex(note => note.id === noteId);
        if (noteIdx === -1) { return; }
        setProps({ note: appProps.folders[folderIdx].notes[noteIdx] });
    }, []);

    function saveState() {
        if (appProps === undefined) { return; }
        const folderIdx = appProps.folders.findIndex(folder => {
            return folder.notes.find(note => note.id === noteId);
        });
        if (folderIdx === -1) { return; }
        const noteIdx = appProps.folders[folderIdx].notes.findIndex(note => note.id === noteId);
        if (noteIdx === -1) { return; }

        const newState: AppProps = structuredClone(appProps);
        newState.folders[folderIdx].notes[noteIdx] = props.note;
        setAppProps(newState);
    }


    // Updates title. If its blank, set it as "Untitled".
    const updateNoteTitle = (newTitle: string) => {
        let newState = structuredClone(props);
        newState.note.title = newTitle == "" ? "Untitled" : newTitle;
        newState.note.lastEdit = new Date();
        setProps(newState);
    };

    // Updates title. If its blank, that's fine.
    const updateNoteDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value
        let newState = structuredClone(props);
        newState.note.description = newDescription;
        newState.note.lastEdit = new Date();
        setProps(newState);
    };

    return (
        <VStack alignItems='left' margin={10} >
            <HStack>
                <Link to={`/folder/${props.note.folderID}`} onClick={saveState}>
                    <Button leftIcon={<CgChevronLeft />}>
                        Back
                    </Button>
                </Link >
            </HStack>
            <Heading>
                <Editable
                    defaultValue={props.note.title}
                    placeholder={props.note.title}
                    onChange={updateNoteTitle}
                >
                    <EditablePreview minWidth="100%" />
                    <EditableInput />
                </Editable>
            </Heading>
            <VStack
                alignItems='left'
                margin={10}
            >


                <Textarea
                    value={props.note.description}
                    onChange={updateNoteDescription}
                    border={"none"}
                    height="80vh"
                    sx={{ resize: "none" }}

                />
                {/* <Editable
                    defaultValue={props.note.description}
                    placeholder={props.note.description}
                    onChange={updateNoteDescription}
                >
                    <EditablePreview minWidth="100%" height="90vh" />
                    <EditableInput height="90vh" />
                </Editable> */}
            </VStack>
        </VStack>
    )
}

export default NotePage;
