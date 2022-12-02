
import { Flex, Heading, HStack, Icon, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { AiFillFolderOpen } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { Folder, HomePageProps } from "../model/model";
import Card from "./Card";
import apiClient from "../clients/apiClient";


const mock: HomePageProps = {
    folders: ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
        const folder: Folder = {
            id: number,
            name: `Folder ${number}`,
            notes: [
                {
                    title: `Complete homework #${number}`,
                    description: `Finish up homework #${number}`,
                    lastEdit: new Date()
                }
            ]
        }
        return folder;
    }))
}

const HomePage = () => {
    const [props, setProps] = useState<HomePageProps>(mock);

    // Async fetch all folders from database.
    // React.useEffect(() => {
    //     let buildsJSON = apiClient.getAllFolders().then((folders) => {
    //         setProps((prevState) => {
    //             return ({
    //                 folders: folders
    //             })
    //         })
    //     })
    //         .catch(e => alert(`Getting data failed: ${e.message}`))
    // }, []);

    return (
        <VStack alignItems='left' margin={10} >
            <Heading>Folders</Heading>
            <Input
                placeholder="Search"
                size="md"
                type="search"
            />
            <Flex>&nbsp;</Flex>
            <VStack
                alignItems='left'
                margin={10}
                overflowY="scroll"
            >
                {
                    props.folders.map(folder => {
                        return <>
                            <Link to={`/folder/${folder.id}`}>
                                <Card>
                                    <HStack>
                                        <Icon as={AiFillFolderOpen} />
                                        <Text>{folder.name}</Text>
                                    </HStack>
                                </Card>
                            </Link>
                        </>
                    })
                }
            </VStack>
        </VStack>
    )
}

export default HomePage;

function toggleColorMode(): void {
    throw new Error("Function not implemented.");
}
