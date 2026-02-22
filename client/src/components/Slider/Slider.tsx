import ReactSlidy from 'react-slidy';
import React, { useState } from 'react';
import { SliderProps } from './type.js';
import { Typography } from '@mui/material';
import { ArticleContainer } from './style.js';

const Slider: React.FC<SliderProps> = ({ content }) => {
  const [actualSlide, setActualSlide] = useState(0);

  const updateSlide = ({ currentSlide }) => {
    setActualSlide(currentSlide);
  };

  const createStyles = isActive => ({
    background: 'transparent',
    border: 0,
    color: isActive ? '#333' : '#ccc',
    cursor: 'pointer',
    fontSize: '32px',
  });

  return (
    <>
      <ReactSlidy
        doAfterSlide={updateSlide}
        slide={actualSlide}
        sx={{
          background: 'red !default',
          width: '100%',
        }}
        keyboardNavigation
      >
        {content.map(item => {
          <div>
            <img src={item.img} />
            <ArticleContainer>
              <Typography variant="h3">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
            </ArticleContainer>
          </div>;
        })}
      </ReactSlidy>
      <div className="Dots">
        {content.map((_, index) => {
          return (
            <button
              key={index}
              style={createStyles(index === actualSlide)}
              onClick={() => updateSlide({ currentSlide: index })}
            >
              &bull;
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
