import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Center>
            <VStack>
                <Heading color="orange.400"> Oops! An error occured.</Heading>
                <Button
                    borderRadius={5}
                    variant="solid"
                    bg="orange.400"
                    colorScheme="orange"
                    width="full"
                    onClick={() => navigate("/signin")}
                >
                    Go back to login page
                </Button>
            </VStack>
        </Center >
    )
};

export default ErrorPage;