import React from 'react';
import Header from '../../components/Header/Header';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import {
  ArticleContainer,
  BufferContainer,
  ButtonContainer,
  Container,
  ContentContainer,
  HorizontContentContainer,
  ItemsContainer,
} from './style';
import { AnswerOption } from '../../models/type';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import CakeModel from '../../components/CakeModel/CakeModel';
import theme from '../../../theme/theme';
import Slider from '../../components/Slider/Slider';
import { useSlidesData } from './slider.data';
import StepCard from '../../components/StepCard/StepCard';

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

      <HorizontContentContainer>
        <Slider content={slides} />

        {/*       
        <ArticleContainer>
          <Typography variant="h2">A little bit about us</Typography>
          <Typography variant="body1">
            We are passionate about creating delicious and beautiful cakes for every occasion. Our
            team of expert bakers and decorators work tirelessly to ensure that each cake is a
            masterpiece that not only looks amazing but tastes incredible too. Whether you're
            celebrating a birthday, wedding, or any special event, we're here to make your day even
            sweeter with our custom cake designs.
          </Typography>
        </ArticleContainer> */}
      </HorizontContentContainer>
      <BufferContainer />
      <ContentContainer>
        <Typography
          variant="h1"
          sx={theme => ({
            color: theme.palette.text.primary,
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
              sx={{
                fontSize: '25px',
              }}
              key={a}
              onClick={handleNavigate}
            >
              {a.toUpperCase()}
            </Button>
          ))}
        </ButtonContainer>
      </ContentContainer>

      <BufferContainer />

      <ContentContainer>
        <Typography variant="h2">{t('how_we_work')}</Typography>
        <ItemsContainer>
          <StepCard title={t('steps:step1.title')} description={t('steps:step1.description')} />
          <StepCard title={t('steps:step2.title')} description={t('steps:step2.description')} />

          <StepCard title={t('steps:step3.title')} description={t('steps:step3.description')} />

          <StepCard title={t('steps:step4.title')} description={t('steps:step4.description')} />
        </ItemsContainer>
      </ContentContainer>
    </Container>
  );
};

export default Main;
