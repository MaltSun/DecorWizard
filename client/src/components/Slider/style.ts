import { Box, styled } from '@mui/material';
import { ContentContainer } from '../../pages/Main/style';
import theme from '../../../theme/theme';

export const SliderCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: theme.spacing(5),
  }
}));

export const ArticleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '45%',
    padding: theme.spacing(0, 2),
  },
}));

export const ContainerBox = styled(Box)(({ theme }) => ({
  width: '90%',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  gap: theme.spacing(4),
  padding: theme.spacing(5, 10),

  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '100% ',
    padding: theme.spacing(0, 2),
    gap: 0,
  },
}));
