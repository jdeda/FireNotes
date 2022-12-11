import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

const ToggleColorModeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const buttonHoverBackground = useColorModeValue("gray.50", "#202837");

    return (
        <Button
            onClick={toggleColorMode}
            as={Button}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
            boxSize='40px'
            boxSizing="border-box"
            padding="5px"
            bg="none"
            colorScheme={"orange"}
            // color={buttonColor}
            // backgroundColor={buttonBackground}
            _hover={{ bg: buttonHoverBackground }}
        >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
};

export default ToggleColorModeButton;