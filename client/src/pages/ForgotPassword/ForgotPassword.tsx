import { Container, MainPart } from './style';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ForgotForm from '../../modules/ForgotForm/ForgotForm';

const ForgotPassword = () => {
  const { t } = useTranslation(['auth']);
  return (
    <Container>
      <MainPart>
        <Typography variant="h1">{t('auth:forgotPassword')}</Typography>
        {/* <Typography variant="body1">{t('auth:instruction')}</Typography> */}
        <ForgotForm />
      </MainPart>
    </Container>
  );
};

export default ForgotPassword;
