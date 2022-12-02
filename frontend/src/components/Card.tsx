import { HStack, useColorModeValue } from "@chakra-ui/react";

type CardProps = {
    children: any
}

const Card = (props: CardProps) => {
    const borderColor = useColorModeValue("whiteAlpha.300", "gray.600");
    const color = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
    const hoverColor = useColorModeValue("blackAlpha.200", "whiteAlpha.100");

    return (
        <HStack
            padding={4}
            spacing={4}
            rounded="lg"
            borderWidth="1px"
            borderColor={borderColor}
            background={color}
            _hover={{ bg: hoverColor }}
        >
            {props.children}
        </HStack>
    );
};

export default Card;