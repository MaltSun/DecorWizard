import { Modal, Box, Typography, TextField, Button, Rating, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(({ theme }) => ({
    fontFamily: '"Kurale", serif',
    borderRadius: '8px',
    marginTop: theme.spacing(2),
}));

export const ModalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
};

export const ModalContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));