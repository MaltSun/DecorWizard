import React from "react";
import { useTranslation } from "react-i18next";
import { Container, ContentContainer } from "./style";
import Header from "../../components/Header/Header";
import { HistoryCardProps } from "../../components/HistoryCard/type";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { Typography } from "@mui/material";

const History = () => {
  const { t } = useTranslation(["common"]);
  const data: HistoryCardProps[] = sessionStorage.getItem("history")
    ? JSON.parse(sessionStorage.getItem("history") || "[]")
    : [];
  return (
    <Container>
      <Header active={"catalog"} />
      <ContentContainer>
        {data.length > 0 ? (
          data.map((card, index) => <HistoryCard key={index} {...card} />)
        ) : (
          <Typography variant="body1">{t("noHistory")}</Typography>
        )}
      </ContentContainer>
    </Container>
  );
};

export default History;
