import React from "react";
import Header from "../../components/Header/Header";
import MainSurvey from "../../modules/MainSurvey/MainSurvey";
import { Container, ContentContainer } from "./style";

const Questions = () => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <MainSurvey />
      </ContentContainer>
    </Container>
  );
};

export default Questions;
