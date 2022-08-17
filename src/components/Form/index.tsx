import {
  ArrowForwardIcon,
  AttachmentIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  Link,
  Select,
  Spacer,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { convertFileToBase64 } from "src/lib/file/convertFileToBase64";
import { formSchema, FormValues } from "src/lib/schema";
import { IServices } from "src/lib/TellusAPI";
import { FormField } from "./FormField";

export const FormLayout = () => {
  const [services, setServices] = useState<IServices>();
  const attachmentRef = useRef(null);
  const { isOpen: isFormSubmitted, onOpen: showFormSubmitted } =
    useDisclosure();

  const {
    isOpen: isSumbitError,
    onOpen: showSubmitError,
    onClose: hideSubmitError,
  } = useDisclosure();

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await axios.get<IServices>("/api/services");
      setServices(data);
    };
    fetchServices();
  }, []);
  // If you want to change required fields, change the formSchema instead, src/lib/schema, try to use it as a single source
  return (
    <Formik<FormValues>
      initialValues={{
        caller: "",
        user_name: "",
        u_place_of_work: "",
        u_alternativ_kontaktvag: "",
        u_additional_e_mail_address: "",
        call_type: "sc_request",
        u_business_application: "",
        short_description: "",
        description: "",
        u_confidential_information: "",
        files: [],
        incident_date: "",
        incident_other_computer: "",
        incident_other_people: "",
        incident_other_system: "",
        other: "false",
        u_opened_for: "",
        user_name_2: "",
        u_place_of_work_2: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const { statusText } = await axios.post("/api", values);
        if (statusText === "OK") {
          showFormSubmitted();
          hideSubmitError();
          resetForm();
        } else {
          showSubmitError();
        }

        setSubmitting(false);
      }}
    >
      {(props) => {
        return (
          <Form>
            {isFormSubmitted && (
              <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
                pb="4"
              >
                <Alert status="success">
                  <AlertIcon />
                  <AlertDescription>Tack för ditt ärende!</AlertDescription>
                </Alert>
              </GridItem>
            )}

            {isSumbitError && (
              <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
                pb="4"
              >
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>
                    Något gick fel försök igen senare
                  </AlertDescription>
                </Alert>
              </GridItem>
            )}

            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap={4}
            >
              {/* <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
              >
                <Text fontSize={"lg"}>Kontaktuppgifter</Text>

                <hr />
              </GridItem> */}
              <GridItem>
                <FormField
                  name="caller"
                  label="Namn"
                  placeholder="Adam Maritz"
                  as={Input}
                />
              </GridItem>
              <GridItem>
                <FormField
                  name="user_name"
                  label="HSA-ID"
                  placeholder="C8SG"
                  as={Input}
                />
              </GridItem>
              <GridItem>
                <FormField
                  name="u_place_of_work"
                  label="Arbetsplats"
                  placeholder="TellUs Förvaltningen"
                  as={Input}
                />
              </GridItem>
              <GridItem>
                <FormField
                  name="u_alternativ_kontaktvag"
                  label="Telefonnummer"
                  placeholder="07613371337"
                  as={Input}
                />
              </GridItem>
              <GridItem>
                <FormField
                  name="u_additional_e_mail_address"
                  label="E-post"
                  placeholder="adam.maritz@sll.se"
                  as={Input}
                />
              </GridItem>
              <Spacer />
              <GridItem>
                <FormField
                  label="Beställer du åt någon annan?"
                  name="other"
                  as={Select}
                >
                  <option value="false">Nej</option>
                  <option value="true">Ja</option>
                </FormField>
              </GridItem>
              <Spacer />
              {props.values.other === "true" && (
                <>
                  <GridItem>
                    <FormField
                      name="u_opened_for"
                      label="Namn"
                      placeholder="Adde"
                      as={Input}
                    />
                  </GridItem>
                  <GridItem>
                    <FormField
                      name="user_name_2"
                      label="HSA-ID"
                      placeholder="Padde"
                      as={Input}
                    />
                  </GridItem>
                  <GridItem>
                    <FormField
                      name="u_place_of_work_2"
                      label="Arbetsplats"
                      placeholder="PellUs"
                      as={Input}
                    />
                  </GridItem>
                </>
              )}
              <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
              >
                {/* <Text fontSize={"lg"}>Ärendeinformation</Text> */}
                <hr />
              </GridItem>

              <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
                display={
                  props.values.call_type === "incident" ? "initial" : "none"
                }
              >
                <Collapse in={props.values.call_type === "incident"}>
                  <Link href="tel:08-123-177-77 ">
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>
                        Om ditt ärende är brådskande ber vid dig att kontakta
                        oss via telefon 08 123 177 77
                      </AlertDescription>
                    </Alert>
                  </Link>
                </Collapse>
              </GridItem>

              <GridItem>
                <FormField label="Typ av ärende" name="call_type" as={Select}>
                  <option value="sc_request">Fråga / Beställning</option>
                  <option value="incident">Felanmälan</option>
                </FormField>
              </GridItem>
              <GridItem>
                <FormField
                  name="u_business_application"
                  as={Select}
                  label="Vilket system?"
                >
                  <option disabled value="">
                    Välj ett system
                  </option>
                  {services &&
                    services.result.map(({ name, sys_id }) => (
                      <option key={sys_id} value={sys_id}>
                        {name}
                      </option>
                    ))}
                </FormField>
              </GridItem>
              <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
              >
                <FormField name="short_description" label="Rubrik" as={Input} />
              </GridItem>
              <GridItem
                colSpan={{
                  base: 1,
                  md: 2,
                }}
              >
                <FormField
                  name="description"
                  label="Beskrivning"
                  as={Textarea}
                />
              </GridItem>
              {props.values.call_type === "incident" && (
                <>
                  <GridItem>
                    <FormField
                      name="incident_date"
                      label="När fungerade det senast"
                      type="date"
                      as={Input}
                    />
                  </GridItem>
                  <GridItem>
                    <FormField
                      name="incident_other_people"
                      label="Har andra samma fel?"
                      as={Input}
                    />
                  </GridItem>
                  <GridItem>
                    <FormField
                      name="incident_other_computer"
                      label="Fungerar det på en annan dator/enhet?"
                      as={Input}
                    />
                  </GridItem>
                  <GridItem>
                    <FormField
                      name="incident_other_system"
                      label="Har du samtidigt fel i andra system/tjänster?"
                      as={Input}
                    />
                  </GridItem>
                </>
              )}

              <GridItem
                display={"flex"}
                flexDir="column"
                colSpan={{
                  base: 1,
                  md: 2,
                }}
                gap="4"
              >
                <input
                  ref={attachmentRef}
                  name="files"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={async (e) => {
                    const map = await Promise.all(
                      Array.from(e.target.files).map(async (file) => ({
                        name: file.name,
                        type: file.type,
                        data: (await convertFileToBase64(file))
                          .split(";base64,")
                          .pop(),
                      }))
                    );
                    props.setFieldValue("files", map);
                    e.target.value = "";
                  }}
                />

                <Flex justify={"space-between"}>
                  <Button
                    w="40"
                    leftIcon={<AttachmentIcon />}
                    variant="outline"
                    onClick={() => attachmentRef.current.click()}
                  >
                    Bifoga
                  </Button>
                  <Button
                    w="40"
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
                    type="submit"
                    onClick={(e) => {
                      console.log(e);
                      if (props.values.other === "true") {
                        console.log("are we even here?");
                        // here we need to swap places for the users fields, because reasons...
                        let temp = { ...props.values };

                        temp.u_opened_for = props.values.caller;
                        temp.user_name_2 = props.values.user_name;
                        temp.u_place_of_work_2 = props.values.u_place_of_work;

                        temp.caller = props.values.u_opened_for;
                        temp.user_name = props.values.user_name_2;
                        temp.u_place_of_work = props.values.u_place_of_work_2;

                        props.setValues(temp);
                      } else {
                        // Clear other fields for saftey
                        props.setFieldValue("u_opened_for", "");
                        props.setFieldValue("user_name_2", "");
                        props.setFieldValue("u_place_of_work_2", "");
                      }
                      props.handleSubmit();
                    }}
                  >
                    Skicka
                  </Button>
                </Flex>

                {props.values.files.length > 0 && (
                  <VStack
                    border="1px"
                    borderColor="inherit"
                    rounded="lg"
                    divider={<StackDivider borderColor="inherit" />}
                  >
                    {props.values.files.map((file) => (
                      <Flex
                        justify="space-between"
                        align="center"
                        w="full"
                        py="4"
                        px="6"
                        key={file.name}
                      >
                        <Flex align="center" gap="4">
                          <AttachmentIcon w={5} h={5} />
                          {file.name}
                        </Flex>

                        <IconButton
                          aria-label={`remove attachment ${file.name}`}
                          colorScheme={"red"}
                          icon={<SmallCloseIcon />}
                          onClick={() => {
                            props.setFieldValue(
                              "files",
                              props.values.files.filter(
                                ({ name }) => name !== file.name
                              )
                            );
                          }}
                        />
                      </Flex>
                    ))}
                  </VStack>
                )}
              </GridItem>
            </Grid>
            <Text
              display={{
                base: "none",
                md: "initial",
              }}
              as="pre"
            >
              {JSON.stringify(props.values, null, 2)}
            </Text>
            <Text
              display={{
                base: "none",
                md: "initial",
              }}
              as="pre"
            >
              {JSON.stringify(props.errors, null, 2)}
            </Text>
            {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(props.errors, null, 2)}</pre> */}
          </Form>
        );
      }}
    </Formik>
  );
};
