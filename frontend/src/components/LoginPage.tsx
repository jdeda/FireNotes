import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Box, Button, chakra, Flex, FormControl, Heading, IconButton,
    Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useColorModeValue
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { User } from "../model/model";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

type LoginPageProps = {
    email: string,
    password: string,
    loginReady: boolean
}

const initialProps: LoginPageProps = {
    email: "",
    password: "",
    loginReady: false
}

const LoginPage = () => {
    const [props, setProps] = useState<LoginPageProps>(initialProps);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>("");
    const [userProps, setUserProps] = useContext(UserContext);
    const buttonColor = useColorModeValue("gray.300", "gray.600");
    const buttonHoverColor = useColorModeValue("gray.400", "gray.500");

    const navigate = useNavigate();

    const handleLogin = async () => {
        const user: User = {
            id: "1",
            first_name: "jesse",
            last_name: "deda",
            username: "jdeda",
            avatar: "foobar",
        }
        setUserProps(() => user);
        navigate("/home");

        // const testing = await apiClient.test();
        // console.log(testing);
        // return;

        // console.log("react -- signing in")
        // apiClient.signin(props.email, props.password).then(userProps => {
        //     console.log(userProps);
        //     setUserProps(() => userProps);
        //     navigate("/home");

        // }).catch(err => {
        //     console.log("needs more protein");
        //     console.log(err);
        //     setError(() => err);
        // });
    }

    function updateLoginReady(): void {
        const loginReady = (props.email !== "" && props.password !== "");
        setProps((prevState) => {
            return {
                email: prevState.email,
                password: prevState.password,
                loginReady: loginReady
            }
        });
    }

    function updateEmail(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        const newEmail: string = e.target.value.trim();
        setProps((prevState) => {
            return {
                email: newEmail,
                password: prevState.password,
                loginReady: prevState.loginReady
            }
        });
        updateLoginReady();
    }

    function updatePassword(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        const newPassword: string = e.target.value.trim();
        setProps((prevState) => {
            return {
                email: prevState.email,
                password: newPassword,
                loginReady: prevState.loginReady
            }
        });
        updateLoginReady();
    }
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            justifyContent="top"
            alignItems="center"
            padding={"10%"}
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >

                <Image src="logo_00.png" width="20" alt="Oops!" />
                <Heading color="teal.400">Welcome to Noteify!</Heading>
                <Box minW={{ base: "60%", md: "400px" }}>
                    <Stack
                        spacing={4}
                        p="1rem"
                    >
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<CFaUserAlt color={buttonColor} />}
                                />
                                <Input
                                    value={props.email}
                                    onChange={updateEmail}

                                    focusBorderColor='teal.400'
                                    type="email"
                                    placeholder="Email"
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<CFaLock color={buttonColor} />}
                                />
                                <Input
                                    value={props.password}
                                    onChange={updatePassword}
                                    focusBorderColor='teal.400'
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                />
                                <InputRightElement width="4.5rem">
                                    <IconButton
                                        variant={"unstyled"}
                                        color={buttonColor}
                                        _hover={{ color: buttonHoverColor }}
                                        // color="gray.600"
                                        // _hover={{ color: "gray.300" }}
                                        aria-label='Search database'
                                        icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button
                            isDisabled={!props.loginReady}
                            borderRadius={5}
                            variant="solid"
                            bg="teal.400"
                            colorScheme="teal"
                            width="full"
                            onClick={handleLogin}
                        >Login</Button>
                        <Link to="/signup">
                            <Button
                                borderRadius={5}
                                variant="link"
                                color="teal.400"
                                colorScheme="teal"
                                width="full"
                            >Not Regisitered? Sign Up</Button>
                        </Link>
                        {/* <Button colorScheme='teal' variant='link'>
                            Not Regisitered? Sign Up
                        </Button> */}

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginPage;


