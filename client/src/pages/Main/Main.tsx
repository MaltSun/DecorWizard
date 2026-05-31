import React, { Suspense } from 'react';
import Header from '../../components/Header/Header';
import { useTranslation } from 'react-i18next';
import { Button, Typography, useMediaQuery } from '@mui/material';
import {
  ButtonContainer,
  Container,
  ContentContainer,
  FontImage,
} from './style';
import { AnswerOption } from '../../models/type';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useSlidesData } from './slider.data';
import Footer from '../../components/Footer/Footer';
// import ReviewSlider from '../../components/ReviewSlider/ReviewSlider';
import theme from '../../../theme/theme';

const Slider = React.lazy(() => import('../../components/Slider/Slider'));

const TABLET_BREAKPOINT = 1100;
const MOBILE_BREAKPOINT = 700;

const Main = () => {

  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));
  const isTablet = useMediaQuery(theme.breakpoints.down(TABLET_BREAKPOINT));


  const [t] = useTranslation(['common', 'aboutUs', 'steps', 'treeSurvey']);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(AppRoutes.Questions);
  };

  const slides = useSlidesData();

  return (
    <Container>
      <Header active={'main'} />
      <ContentContainer>
        {!isMobile && (
          <Typography
            variant={isTablet ? 'h3' : 'h1'}
            sx={theme => ({
              fontWeight: 'bold',
              textAlign: 'center',
            })}
          >
            {t('welcome_message')}
          </Typography>
        )}



        <Typography variant={isTablet || isMobile ? 'h4' : 'h2'} sx={theme => ({
          fontWeight: 'bold',
          textAlign: 'center',
        })}>{t('start_building')}</Typography>

        <ButtonContainer>
          {[AnswerOption.YES, AnswerOption.MAYBE, AnswerOption.NO, AnswerOption.IDK].map(a => (
            <Button
              variant="contained"
              key={a}
              onClick={handleNavigate}
            >
              {t('treeSurvey:' + a.toUpperCase())}
            </Button>
          ))}
        </ButtonContainer>
      </ContentContainer>

      {
        !(isMobile || isTablet) && (
          <FontImage src="../public/images/font.png" alt="font" />
        )
      }

      <Suspense fallback="Loading...">
        <Slider content={slides} />
      </Suspense>

      {/* <ReviewSlider /> */}

      <Footer />
    </Container>
  );
};

export default Main;
