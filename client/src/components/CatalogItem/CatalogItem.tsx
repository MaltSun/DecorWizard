import React from 'react';
import { Typography } from '@mui/material';
import { CatalogItemProps } from './type';
import { Container } from './style';
const CatalogItem: React.FC<CatalogItemProps> = ({ name, price, image, id }) => {
    return (
        <Container>
            <img src={image} alt={name} />
            <Typography variant="h6">{name}</Typography>
            <Typography variant="h5">{price}</Typography>
        </Container>
    );
};

export default CatalogItem;
