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
import { useLocation } from 'react-router-dom';

export type HomePageProps = {
    folders: Folder[]
}

const initial: HomePageProps = {
    folders: []
};

const HomePage = () => {
    const [appProps, setAppProps] = useContext(AppContext);
    const [props, setProps] = useState<HomePageProps>(initial);
    const [backupProps, setBackupProps] = useState<HomePageProps>(initial);
    const searchBar = useRef<HTMLInputElement>(null);
    const location = useLocation();

    // Fetch all folders from database.
    React.useEffect(() => {
        apiClient.getAllFolders().then((folders) => {
            console.log("gottem");
            console.log(folders);
            setProps(() => {
                return ({
                    folders: folders
                })
            });
        })
            .catch(e => alert(`Homepage init failed: ${e.message}`));
    }, []);

    // React.useEffect(() => {
    //     console.log('handle route change here', location);
    //     saveState();
    // }, [location]);

    function saveState(newState: AppProps) {
        // if (appProps === undefined) { return; }
        // console.log("saving state");
        // const newState: AppProps = structuredClone(appProps);
        // newState.folders = structuredClone(props.folders);
        setAppProps(newState);
        apiClient.saveAll(newState.folders);
    }

    function deleteFolder(folderId: string) {
        let newState: HomePageProps = structuredClone(props);
        newState.folders = newState.folders.filter(folder => folder.id != folderId);
        setProps(newState);
        setBackupProps(newState);
        saveState(newState);
    }

    function addNewFolder() {
        let newState: HomePageProps = structuredClone(props);
        const newFolder: Folder = {
            id: uuid(),
            name: "Untitled",
            notes: []
        }
        newState.folders.push(newFolder);
        setProps(newState);
        setBackupProps(newState);
        saveState(newState);
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

        // Bad, this should be another prop...
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
                        <Link to={`/folder/${folder.id}`} onClick={() => saveState(appProps)}>
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