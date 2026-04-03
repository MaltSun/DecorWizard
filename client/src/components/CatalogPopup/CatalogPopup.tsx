import { Button, Paper, Table, Typography } from '@mui/material';
import React from 'react';
import { CatalogPopupProps } from './type';
import { ButtonStack, Container, Description, Popup } from './style';
import { useTranslation } from 'react-i18next';
import CartButton from '../CartButton/CartButton';
import { useCatalogStore } from '../../store/catalogSlice';
import { useStore } from '../../store/cartSlice';

const CatalogPopup: React.FC<CatalogPopupProps> = ({
  id,
  name,
  price,
  description,
  image,
  kkal,
  carbs,
  proteins,
  fats,
  composition,
  onClose,
}) => {
  const { t } = useTranslation(['common', 'catalog']);

  const addToCart = useStore(state => state.add);
  const updateQuantity = useStore(state => state.update);
  const removeFromCart = useStore(state => state.remove);
  const getItemQuantity = useStore(state => state.getItemQuantity);

  const handleAddToCart = (itemId: string) => addToCart(itemId);
  const handleUpdateQuantity = (itemId: string, q: number) => updateQuantity(itemId, q);
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId);

  return (
    <Container>
      <Popup elevation={3}>
        <Description>
          <img src={image} alt="Product" style={{ maxWidth: '300px' }} />
          <div style={{ textAlign: 'justify' }}>
            <Typography variant="h5">{name}</Typography>

            <Typography variant="body1">{description}</Typography>

            <Typography variant="body2" style={{ marginTop: '10px' }}>
              {t('catalog.common.composition')}: {composition}
            </Typography>

            <Table size="small" style={{ marginTop: '10px' }}></Table>
            <Typography variant="body2">
              {t('catalog.common.calories')}: {kkal} kcal
            </Typography>
            <Typography variant="body2">
              {t('catalog.common.carbs')}: {carbs} g
            </Typography>
            <Typography variant="body2">
              {t('catalog.common.proteins')}: {proteins} g
            </Typography>
            <Typography variant="body2">
              {t('catalog.common.fats')}: {fats} g
            </Typography>
          </div>
        </Description>
        <ButtonStack>
          <CartButton
            itemId={id}
            quantity={getItemQuantity(id)}
            onAdd={handleAddToCart}
            onUpdate={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            style={{ marginLeft: '10px' }}
          >
            {t('catalogPopup.closeButton')}
          </Button>
        </ButtonStack>
      </Popup>
    </Container>
  );
};

export default CatalogPopup;
