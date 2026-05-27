import {  Button, styled } from "@mui/material";

export const SwitchButton = styled(Button)(({ theme }) => ({
  width: '60px',
  border: '2px solid',
  fontWeight: 'bold',
  fontSize: '27px',
  color: theme.palette.primary.main,
}));

