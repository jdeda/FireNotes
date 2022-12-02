import { HStack, useColorModeValue } from "@chakra-ui/react";

type CardProps = {
    children: any
}

const Card = (props: CardProps) => {
    // const borderColor = useColorModeValue("gray.200", "gray.600");
    // const color = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
    // const hoverColor = useColorModeValue("blackAlpha.200", "whiteAlpha.100");

    const borderColor = useColorModeValue("gray.200", "gray.600");
    const color = useColorModeValue("gray.100", "whiteAlpha.100");
    const hoverColor = useColorModeValue("gray.200", "whiteAlpha.200");

    return (
        <HStack
            padding={4}
            spacing={4}
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
            background={color}
            _hover={{ bg: hoverColor }}
            transitionDuration="200ms"
        >
            {props.children}
        </HStack>
    );
};

export default Card;