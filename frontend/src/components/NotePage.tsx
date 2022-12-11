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
import apiClient from "../clients/apiClient";

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

const NotePage = () => {
    const [appProps, setAppProps] = useContext(AppContext);
    const [props, setProps] = useState<NoteProps>(initial);
    const noteId = ((): string => {
        const route = window.location.pathname.split("/");
        const id = route[route.length - 1];
        return id;
    })();

    // Init state w/ app context.
    React.useEffect(() => {
        const folderIdx = appProps.folders.findIndex(folder => {
            return folder.notes.find(note => note.id === noteId);
        });
        if (folderIdx === -1) { return; }
        const noteIdx = appProps.folders[folderIdx].notes.findIndex(note => note.id === noteId);
        if (noteIdx === -1) { return; }
        setProps({ note: appProps.folders[folderIdx].notes[noteIdx] });
    }, []);

    function saveState(newState: NoteProps) {
        if (appProps === undefined) { return; }
        const folderIdx = appProps.folders.findIndex(folder => {
            return folder.notes.find(note => note.id === noteId);
        });
        if (folderIdx === -1) { return; }
        const noteIdx = appProps.folders[folderIdx].notes.findIndex(note => note.id === noteId);
        if (noteIdx === -1) { return; }

        const newAppState: AppProps = structuredClone(appProps);
        newAppState.folders[folderIdx].notes[noteIdx] = props.note;
        setAppProps(newAppState);
        apiClient.saveAll(newAppState.folders);
    }

    // Updates title. If its blank, set it as "Untitled".
    const updateNoteTitle = (newTitle: string) => {
        let newState: NoteProps = structuredClone(props);
        newState.note.title = newTitle == "" ? "Untitled" : newTitle;
        newState.note.lastEdit = new Date();
        setProps(newState);
        saveState(newState);
    };

    // Updates title. If its blank, that's fine.
    const updateNoteDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value
        let newState: NoteProps = structuredClone(props);
        newState.note.description = newDescription;
        newState.note.lastEdit = new Date();
        setProps(newState);
        saveState(newState);
    };

    return (
        <VStack alignItems='left' margin={10} >
            <HStack>
                <Link to={`/folder/${props.note.folderID}`}>
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
            </VStack>
        </VStack>
    )
}

export default NotePage;
