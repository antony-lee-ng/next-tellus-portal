import {
  chakra,
  Flex,
  Box,
  useColorMode,
  useColorModeValue,
  IconButton,
  Image,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, QuestionIcon } from "@chakra-ui/icons";
import { InfoModal } from "../Modal/InfoModal";
import { useEffect } from "react";

export default function Header() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose,
  } = useDisclosure();
  const {
    isOpen: isPopoverOpen,
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
    onToggle: onPopoverToggle,
  } = useDisclosure();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = text === "dark" ? MoonIcon : SunIcon;
  const logo =
    text === "dark" ? "Region Stockholm_svart.png" : "Region Stockholm_vit.png";

  const bg = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    setTimeout(() => {
      onPopoverOpen();
      setTimeout(onPopoverClose, 5000);
    }, 5000);
  }, []);

  return (
    <Box pos="relative">
      <chakra.header
        shadow={"sm"}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        py={1}
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex align="center" h="40px" w="250px">
              <Image src={`/${logo}`} objectFit="cover" />
            </Flex>

            <Flex
              justify="flex-end"
              w="full"
              align="center"
              color="gray.400"
              gap="2"
            >
              <Popover
                isOpen={isPopoverOpen}
                placement="bottom"
                autoFocus={false}
              >
                <PopoverTrigger>
                  <IconButton
                    size="md"
                    fontSize="lg"
                    aria-label={`Switch to ${text} mode`}
                    variant={"outline"}
                    colorScheme="blue"
                    ml={{ base: "0", md: "3" }}
                    icon={<QuestionIcon />}
                    onClick={onInfoModalOpen}
                    onMouseEnter={onPopoverOpen}
                    onMouseLeave={onPopoverClose}
                  />
                </PopoverTrigger>

                <PopoverContent color={useColorModeValue("black", "white")}>
                  <PopoverArrow />
                  <PopoverBody>Ser det inte ut som du är van vid?</PopoverBody>
                </PopoverContent>
              </Popover>

              <InfoModal isOpen={isInfoModalOpen} onClose={onInfoModalClose} />

              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant={"outline"}
                colorScheme="green"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </Box>
  );
}
