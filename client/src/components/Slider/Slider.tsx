import ReactSlidy from 'react-slidy';
import React, { useState } from 'react';
import { SliderProps } from './type.js';
import { Box, Typography, useTheme } from '@mui/material';
import { ArticleContainer, ContainerBox } from './style.js';
import 'react-slidy/lib/styles.css';

const Slider: React.FC<SliderProps> = ({ content }) => {
  const theme = useTheme();
  const [actualSlide, setActualSlide] = useState(0);

  const updateSlide = ({ currentSlide }) => {
    setActualSlide(currentSlide);
  };

  const createStyles = (isActive: boolean) => ({
    background: 'transparent',
    border: 0,
    color: isActive ? theme.palette.text.primary : theme.palette.text.disabled,
    cursor: 'pointer',
    fontSize: '32px',
  });

  return (
    <ContainerBox>
      <ReactSlidy
        doAfterSlide={updateSlide}
        slide={actualSlide}
        keyboardNavigation
      >
        {content.map(item => (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img style={{ width: '50%', borderRadius: '10px' }} alt={item.title} src={item.img} />
            <ArticleContainer>
              <Typography variant="h2">{item.title}</Typography>
              <Typography style={{ lineBreak: 'anywhere' }} variant="body1">
                {item.description}
              </Typography>
            </ArticleContainer>
          </Box>
        ))}
      </ReactSlidy>
      <div className="Dots">
        {content.map((_, index) => {
          return (
            <button
              type="button"
              key={index}
              style={createStyles(index === actualSlide)}
              onClick={() => updateSlide({ currentSlide: index })}
            >
              &bull;
            </button>
          );
        })}
      </div>
    </ContainerBox>
  );
};

export default Slider;
