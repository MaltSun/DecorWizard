import React from "react";
import { CardContainer, InfoContainer } from "./style";
import { HistoryCardProps } from "./type";
import { Typography } from "@mui/material";

const HistoryCard: React.FC<HistoryCardProps> = ({
  imageSrc,
  title,
  prompt,
}) => {
  return (
    <CardContainer>
      <img
        style={{ height: "187px", borderRadius: "20px", objectFit: "contain" }}
        src={imageSrc}
        alt={title}
      />
      <InfoContainer>
        <Typography variant="body1">{title}</Typography>

        <Typography variant="body2">{prompt}</Typography>
      </InfoContainer>
    </CardContainer>
  );
};

export default HistoryCard;
