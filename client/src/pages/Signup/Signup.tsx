import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SignupForm from '../../modules/SignupForm/SignupForm';
import { Typography } from '@mui/material';
import { Container, MainPart } from './style';

const Signup = () => {
  const { t } = useTranslation('auth');

  return (
    <Container>
      <AuthHeader active={'signup'} />
      <MainPart>
        <Typography variant="h1">{t('auth:createAccount')}</Typography>
        
        <SignupForm />
      </MainPart>
    </Container>
  );
};

export default Signup;
