import React from 'react';
import Header from '../../components/Header/Header';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import {
  ButtonContainer,
  Container,
  ContentContainer,
  FontImage,
  HorizontContentContainer,
  ItemsContainer,
} from './style';
import { AnswerOption } from '../../models/type';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import Slider from '../../components/Slider/Slider';
import { useSlidesData } from './slider.data';
import Footer from '../../components/Footer/Footer';

const Main = () => {
  const [t] = useTranslation(['common', 'aboutUs', 'steps']);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(AppRoutes.Questions);
  };

  const slides = useSlidesData();

  return (
    <Container>
      <Header active={'main'} />
      <ContentContainer>
        <Typography
          variant="h1"
          sx={theme => ({
            fontWeight: 'bold',
            textAlign: 'center',
          })}
        >
          {t('welcome_message')}
        </Typography>


        <Typography variant="h2">{t('start_building')}</Typography>

        <ButtonContainer>
          {[AnswerOption.YES, AnswerOption.MAYBE, AnswerOption.NO, AnswerOption.IDK].map(a => (
            <Button
              variant="contained"
              key={a}
              onClick={handleNavigate}
            >
              {a.toUpperCase()}
            </Button>
          ))}
        </ButtonContainer>
      </ContentContainer>

      <FontImage  src="../public/images/font.png" alt="font" />

      <HorizontContentContainer>
        <Slider content={slides} />
      </HorizontContentContainer>
      <Footer />
    </Container>
  );
};

export default Main;
