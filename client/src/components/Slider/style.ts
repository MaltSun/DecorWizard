import { Box, styled } from '@mui/material';
import { ContentContainer } from '../../pages/Main/style';

export const ArticleContainer = styled(ContentContainer)(() => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '50%',
  gap: '20px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'wrap',
}));

export const ContainerBox = styled(Box)(() => ({
  width: '100%',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  gap: '20px',
}));
