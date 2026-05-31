import { Box, styled } from "@mui/material";

export const GenerateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: '16px',
  boxShadow: theme.shadows[1],
  maxWidth: '800px',
  margin: '0 auto'
}));

export const GenerateContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
//   [theme.breakpoints.up('md')]: {
//     flexDirection: 'row',
//     alignItems: 'flex-start'
//   }
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
//   [theme.breakpoints.up('md')]: {
//     width: '250px',
//     flexShrink: 0
//   }
}));

// Дополнительные стили
export const HistoryPreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  justifyContent: 'center'
}));

export const HistoryItem = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  border: active ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.background.paper}`,
  opacity: active ? 1 : 0.7,
  transition: 'all 0.2s ease',
  '&:hover': {
    opacity: 1,
    borderColor: theme.palette.primary.light,
    transform: 'scale(1.05)'
  }
}));