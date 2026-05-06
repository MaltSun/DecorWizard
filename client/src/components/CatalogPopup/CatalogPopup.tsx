import { Button, Paper, Table, Typography } from '@mui/material';
import React from 'react';
import { CatalogPopupProps } from './type';
import { ButtonStack, Container, Description, Popup } from './style';
import { useTranslation } from 'react-i18next';
import CartButton from '../CartButton/CartButton';
import { useCatalogStore } from '../../store/catalogSlice';
import { cartStore } from '../../store/cartSlice';

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
  const { t } = useTranslation([ 'catalog']);

  const addToCart = cartStore(state => state.add);
  const updateQuantity = cartStore(state => state.update);
  const removeFromCart = cartStore(state => state.remove);
  const getItemQuantity = cartStore(state => state.getItemQuantity);

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
              {t('common.composition')}: {composition}
            </Typography>

            <Table size="small" style={{ marginTop: '10px' }}></Table>
            <Typography variant="body2">
              {t('common.calories')}: {kkal} {t('common.kcal')}
            </Typography>
            <Typography variant="body2">
              {t('common.carbs')}: {carbs} {t('common.gramms')}
            </Typography>
            <Typography variant="body2">
              {t('common.proteins')}: {proteins} {t('common.gramms')}
            </Typography>
            <Typography variant="body2">
              {t('common.fats')}: {fats} {t('common.gramms')}
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
