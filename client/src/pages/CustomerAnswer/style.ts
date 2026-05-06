import { Box, Paper, styled } from "@mui/material";

export const OwnerAnswer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  marginLeft: theme.spacing(2),
}));

export const ReviewSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff',
  border: '1px solid #f0f0f0',
}));
