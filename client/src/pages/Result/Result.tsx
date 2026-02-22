import { Container } from "@mui/material";
import React from "react";
import Header from "../../components/Header/Header";
import { ContentContainer } from "./style";

const Result = () => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <Result />
      </ContentContainer>
    </Container>
  );
};

export default Result;
