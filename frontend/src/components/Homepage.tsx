
import { AddIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, HStack, Icon, IconButton, Input, InputGroup, InputRightElement, Spacer, Text, VStack } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { AiFillFolderOpen } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { Folder } from "../model/model";
import AccountButton from "./AccountButton";
import Card from "./Card";
import uuid from 'react-uuid';
import { AppContext, AppProps } from "../App";
import React from "react";
import apiClient from "../clients/apiClient";



export type HomePageProps = {
    folders: Folder[]
}

const mock: HomePageProps = {
    folders: ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
        const folder: Folder = {
            id: `${number}`,
            name: `Folder ${number}`,
            notes: [
                {
                    folderID: `${number}`,
                    id: `${number}`,
                    title: `Complete homework #${number}`,
                    description: `Finish up homework #${number}`,
                    lastEdit: new Date()
                }
            ]
        }
        return folder;
    }))
};

const initial: HomePageProps = {
    folders: []
};

const HomePage = () => {
    const [appProps, setAppProps] = useContext(AppContext);
    const [props, setProps] = useState<HomePageProps>(initial);
    const [backupProps, setBackupProps] = useState<HomePageProps>(initial);
    const searchBar = useRef<HTMLInputElement>(null);


    // Fetch all folders from database.
    React.useEffect(() => {
        let buildsJSON = apiClient.getAllFolders().then((folders) => {
            setProps((prevState) => {
                return ({
                    folders: folders
                })
            });
        })
            .catch(e => alert(`Homepage init failed: ${e.message}`))

    }, []);

    function saveState() {
        if (appProps === undefined) {
            return;
        }
        const newState: AppProps = structuredClone(appProps);
        newState.folders = structuredClone(props.folders);
        setAppProps(newState);
    }

    function deleteFolder(folderId: string) {
        let newState: HomePageProps = structuredClone(props);
        newState.folders = newState.folders.filter(folder => folder.id != folderId);
        setProps(newState);
        setBackupProps(newState);
    }

    function addNewFolder() {
        const newFolder: Folder = {
            id: uuid(),
            name: "Untitled",
            notes: []
        }
        let newState: HomePageProps = structuredClone(props);
        newState.folders.push(newFolder);
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
        const matches = props.folders.filter(folder => {
            const nameLC = folder.name.toLowerCase();
            return nameLC.includes(searchVal)
        });

        setProps({ folders: matches });
    };


    return (
        <VStack alignItems='left' margin={10} >
            <HStack>
                <Heading>Folders</Heading>
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
                    onClick={addNewFolder}
                />
            </HStack>
            <Flex>&nbsp;</Flex>
            <VStack
                alignItems='left'
                margin={10}
                overflowY="auto"
            >{props.folders.map(folder => (
                <Box key={folder.id}>
                    <Card>
                        <Link to={`/folder/${folder.id}`} onClick={saveState}>
                            <HStack>
                                <Icon as={AiFillFolderOpen} />
                                <Text>{folder.name}</Text>
                            </HStack>
                        </Link>

                        <Spacer />
                        <IconButton
                            variant="solid"
                            aria-label='Delete folder'
                            size='sm'
                            icon={<DeleteIcon />}
                            onClick={() => deleteFolder(folder.id)}
                        />
                    </Card>
                </Box>
            ))}</VStack>
        </VStack >
    )
}

export default HomePage;