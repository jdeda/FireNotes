import { AddIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Editable, EditableInput, EditablePreview, Flex, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { CgChevronLeft } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import uuid from 'react-uuid';
import { AppContext, AppProps, UserContext } from "../App";
import { Folder, formatDate, Note } from "../model/model";
import AccountButton from "./AccountButton";
import Card from "./Card";

export type FolderPageProps = {
    folder: Folder
}

const initial: FolderPageProps = {
    folder: {
        id: uuid(),
        name: "",
        notes: [],
    }
}

const mock: FolderPageProps = {
    folder: {
        id: "0",
        name: "Homework",
        notes: ([1, 2, 3, 4].map(number => {
            return {
                folderID: `${0}`,
                id: `${number}`,
                title: `Complete homework #${number}`,
                description: `Finish up homework #${number}`,
                lastEdit: new Date()
            }
        }))
    }
}

const FolderPage = () => {
    const [appProps, setAppProps] = useContext(AppContext);
    const [props, setProps] = useState<FolderPageProps>(initial);
    const [backupProps, setBackupProps] = useState<FolderPageProps>(initial);
    const [userProps, setUserProps] = useContext(UserContext);
    const [searchResults, setSearchResults] = useState<Note[]>([]);
    const searchBar = useRef<HTMLInputElement>(null);
    const routeParams = useParams();
    const folderId = ((): string => {
        const route = window.location.pathname.split("/");
        const id = route[route.length - 1];
        return id;
    })();

    // Init state w/ app context.
    React.useEffect(() => {
        if (appProps) {
            const folder = appProps.folders.find(folder => folder.id === folderId);
            if (folder) {
                setProps({ folder: folder });
                setBackupProps({ folder: folder });
            }
        }
    }, []);

    // async function runEffect() {
    //     const folderId = "1";
    //     let folder = await apiClient.getFolder(folderId);
    //     const notes = await apiClient.getNotesByFolder(folderId);
    //     folder.notes = notes;
    //     setProps((prevState) => {
    //         return ({
    //             folder: folder
    //         })
    //     });
    // }
    // // Fetch all notes for this folder from database.
    // React.useEffect(() => {
    //     runEffect();
    // }, []);

    function saveState() {
        if (!appProps) { return; }
        const idx = appProps.folders.findIndex(folder => folder.id === props.folder.id);
        if (idx === -1) { return; }
        const newState: AppProps = structuredClone(appProps);
        newState.folders[idx] = props.folder;
        setAppProps(newState);
    }

    function deleteNote(noteId: string) {
        let newState: FolderPageProps = structuredClone(props);
        newState.folder.notes = newState.folder.notes.filter(note => note.id != noteId);
        setProps(newState);
        setBackupProps(newState);
    }

    function addNewNote() {
        const newFolder: Note = {
            id: uuid(),
            title: "Untitled",
            description: "",
            lastEdit: new Date(),
            folderID: props.folder.id
        }
        let newState: FolderPageProps = structuredClone(props);
        newState.folder.notes.push(newFolder);
        setProps(newState);
        setBackupProps(newState);
    }


    function performSearch() {
        if (searchBar.current === null) { return; }
        const searchVal = searchBar.current.value.toLowerCase();
        if (searchVal === "") {
            setProps(backupProps);
            return;
        }
        const matches = props.folder.notes.filter(note => {
            const nameLC = note.title.toLowerCase();
            return nameLC.includes(searchVal)
        });

        let newProps = structuredClone(props);
        newProps.folder.notes = matches;
        setProps(newProps);
    };

    const updateFolderName = (newName: string) => {
        console.log(newName);
        let newState = structuredClone(props);
        newState.folder.name = newName == "" ? "Untitled" : newName;
        setProps(newState);
    };

    return (
        <VStack alignItems='left' margin={10} >
            <Link to={`/home`} onClick={saveState}>
                <Button leftIcon={<CgChevronLeft />}>
                    Back
                </Button>
            </Link >
            <HStack>
                <Heading>
                    <Editable
                        defaultValue={props.folder.name}
                        placeholder={props.folder.name}
                        onChange={updateFolderName}
                    >
                        <EditablePreview minWidth="100%" />
                        <EditableInput />
                    </Editable>
                </Heading>
                <Spacer />
                <AccountButton />
            </HStack>
            <HStack paddingTop={4}>
                <InputGroup width="50vw">
                    <Input
                        ref={searchBar}
                        pr='4.5rem'
                        placeholder="Search by name"
                    >
                    </Input>
                    <InputRightElement
                        padding={1}
                        width='6rem'
                        children={
                            <Button size='sm' onClick={performSearch} leftIcon={<SearchIcon />}>
                                Search
                            </Button>
                        }
                    />
                </InputGroup>

                <Spacer />
                <IconButton
                    aria-label='Add a folder'
                    size='md'
                    icon={<AddIcon />}
                    onClick={addNewNote}
                />
            </HStack>
            <Flex>&nbsp;</Flex>
            <VStack
                alignItems='left'
                margin={10}
                overflowY="auto"
            >{props.folder.notes.map(note => (
                <Box key={note.id}>
                    <Card>
                        <Link to={`/note/${note.id}`} onClick={saveState}>
                            <VStack spacing={1} alignItems="left">
                                <Text as="b">{note.title}</Text>
                                <Text>{formatDate(note.lastEdit)}</Text>
                            </VStack>
                        </Link>
                        <Spacer />
                        <IconButton
                            variant="solid"
                            aria-label='Delete note'
                            size='sm'
                            icon={<DeleteIcon />}
                            onClick={() => deleteNote(note.id)}
                        />
                    </Card>
                </Box>
            ))}</VStack>
        </VStack>
    )

}

export default FolderPage;