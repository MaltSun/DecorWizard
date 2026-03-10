import React from 'react';
import { Button, Box, IconButton, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartButton = ({ itemId, quantity, onAdd, onUpdate, onRemove }) => {
  if (quantity === 0) {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCartIcon />}
        onClick={() => onAdd(itemId)}
        fullWidth
      >
        В корзину
      </Button>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        size="small"
        onClick={() => onUpdate(itemId, quantity - 1)}
        color="primary"
      >
        <RemoveIcon />
      </IconButton>
      
      <TextField
        type="number"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          onUpdate(itemId, value);
        }}
        inputProps={{
          min: 0,
          style: { textAlign: 'center', width: '60px' }
        }}
        size="small"
        variant="outlined"
      />
      
      <IconButton
        size="small"
        onClick={() => onUpdate(itemId, quantity + 1)}
        color="primary"
      >
        <AddIcon />
      </IconButton>
      
      <IconButton
        size="small"
        onClick={() => onRemove(itemId)}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartButton;