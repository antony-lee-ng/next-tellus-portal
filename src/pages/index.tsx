import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { FormLayout } from "src/components/Form";
import Header from "src/components/Header";

const Index = () => {
  return (
    <>
      <Header />
      <Head>
        <title>Kontaktformulär</title>
      </Head>
      <Container
        shadow={"lg"}
        my={{
          base: "0",
          md: "6",
        }}
        maxW="container.md"
        p="6"
        borderWidth={{
          base: "none",
          md: "1px",
        }}
      >
        <FormLayout />
      </Container>
    </>
  );
};

export default Index;
