import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Link,
  Grid,
  Center,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React from "react";

export const PhoneModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="inherit">
          Serviceförvaltningens Servicedesk
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gap="4">
            <LinkBox
              borderWidth="1px"
              rounded="md"
              transition="all"
              transitionDuration="0.3s"
            >
              <LinkOverlay href="tel:082">
                <Center py="2" px="3" flexDir={"column"}>
                  <Text>Danderyds Sjukhus</Text>
                  <Text>08 123 556 00</Text>
                </Center>
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              borderWidth="1px"
              rounded="md"
              transition="all"
              transitionDuration="0.3s"
            >
              <LinkOverlay href="tel:082">
                <Center py="2" px="3" flexDir={"column"}>
                  <Text>Hälso- och sjukvårdsförvaltningen</Text>
                  <Text>08 123 177 77</Text>
                </Center>
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              borderWidth="1px"
              rounded="md"
              transition="all"
              transitionDuration="0.3s"
            >
              <LinkOverlay href="tel:082">
                <Center py="2" px="3" flexDir={"column"}>
                  <Text>Danderyds Sjukhus</Text>
                  <Text>08 123 556 00</Text>
                </Center>
              </LinkOverlay>
            </LinkBox>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Stäng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
