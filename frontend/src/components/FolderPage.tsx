import { Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FolderPageProps, formatDate } from "../model/model";
import Card from "./Card";

const mock: FolderPageProps = {
    folder: {
        id: 0,
        name: "Homework",
        notes: ([1, 2, 3, 4].map(number => {
            return {
                title: `Complete homework #${number}`,
                description: `Finish up homework #${number}`,
                lastEdit: new Date()
            }
        }))
    }
}

const FolderPage = () => {
    const [props, setProps] = useState<FolderPageProps>(mock);

    return (
        <VStack alignItems='left' margin={10} >
            <Heading>Notes</Heading>
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
                    props.folder.notes.map(note => {
                        return <>
                            <Card>
                                <VStack spacing={1} alignItems="left">
                                    <Text as="b">{note.title}</Text>
                                    <Text>{formatDate(note.lastEdit)}</Text>
                                </VStack>
                            </Card>
                        </>
                    })
                }
            </VStack>
        </VStack>
    )

}

export default FolderPage;