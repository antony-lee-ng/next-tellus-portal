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
  Text,
  Grid,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React from "react";

interface IPhoneNumberBoxProps {
  name: string;
  number: string;
}

const PhoneNumberBox: React.FC<IPhoneNumberBoxProps> = (props) => (
  <LinkBox
    borderWidth="1px"
    rounded="md"
    transition="all"
    transitionDuration="0.3s"
    borderBottomColor={"twitter.700"}
  >
    <LinkOverlay href="tel:082">
      <Center py="2" px="3" flexDir={"column"}>
        <Text>{props.name}</Text>
        <Text>{props.number}</Text>
      </Center>
    </LinkOverlay>
  </LinkBox>
);

export const PhoneModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const phoneNumbers: IPhoneNumberBoxProps[] = [
    { name: "Danderyds Sjukhus", number: "08 123 556 00" },
    { name: "Hälso- och sjukvårdsförvaltningen", number: "08 123 177 77" },
    { name: "Karolinska Universitetssjukhuset", number: "08 123 777 77" },
    { name: "Regionledningskontoret", number: "08 123 177 77" },
    { name: "Reservkort", number: "08 123 700 20" },
    { name: "Serviceförvaltningen", number: "08 123 177 77" },
    { name: "Södersjukhuset AB", number: "08 616 13 00" },
    { name: "Södertälje sjukhus", number: "08 123 177 77" },
    {
      name: "Vårdaktörer med vårdavtal samt studenter",
      number: "08 123 145 10",
    },
  ];
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
            {phoneNumbers.map((phoneInfo) => (
              <PhoneNumberBox key={phoneInfo.name} {...phoneInfo} />
            ))}
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
