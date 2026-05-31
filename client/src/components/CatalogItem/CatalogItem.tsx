import React from 'react';
import { CatalogItemProps } from './type';
import { ProductName, Container, ImageWrapper, ProductImage, Price, Description } from './style';
import { Box, Typography } from '@mui/material';

const CatalogItem: React.FC<CatalogItemProps> = ({
  name,
  price,
  image,
  description,
}) => {
  return (
    <Container>
      <ImageWrapper>
        <ProductImage src={image} alt={name} />
      </ImageWrapper>

      <Box style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'start' }
      }>
        <Typography variant='h4'>
          {name}
        </Typography>
        <Typography variant='h4'>{price}Б</Typography>
      </Box >

      {description && (
        <Description variant="body2">{description}</Description>
      )}
    </Container >
  );
};

export default CatalogItem;