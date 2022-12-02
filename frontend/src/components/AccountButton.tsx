import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { HiLogout } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export type AccountButtonProps = {

}

const AccountButton = () => {
    const [userProps, setUserProps] = useContext(UserContext);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const signOut = () => {
        setUserProps(() => undefined);
        navigate("/login");
        // apiClient.signout().then(success => {
        //     setUserProps(() => undefined);
        //     navigate("/login");
        // }).catch(err => {
        //     console.log("needs more protein");
        //     console.log(err);
        //     setError(() => err);
        // });
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
            // boxSize='40px'
            // boxSizing="border-box"
            // padding="5px"
            // _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
            // backgroundColor={{ bg: colorMode !== 'light' ? 'gray.200' : 'gray.700' }}
            >
                <Avatar bg="teal.500" />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <Center>
                    <Text>{userProps ? userProps.username : ""}</Text>
                </Center>
                <MenuDivider />
                <MenuItem icon={<HiLogout />} onClick={() => signOut()}>
                    Sign-Out
                </MenuItem>
            </MenuList>
        </Menu >
    )
}

export default AccountButton;