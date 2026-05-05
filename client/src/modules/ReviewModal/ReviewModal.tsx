import React, { useState } from 'react';
import { ModalStyle, StyledButton } from './style';
import { Box, CircularProgress, Modal, Rating, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReviewModalProps } from './type';

export const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, orderId, onSuccess }) => {
    const [mark, setMark] = useState<number | null>(5);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('reviews');
    
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ orderId, mark, text }),
            });

            if (res.ok) {
                onSuccess();
                onClose();
            }
        } catch (err) {
            console.error("Ошибка при отправке отзыва", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={ModalStyle}>
                <Typography variant="h5" sx={{ fontFamily: '"Kurale", serif', mb: 2 }}>
                    Оставить отзыв
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>Ваша оценка:</Typography>
                <Rating
                    value={mark}
                    onChange={(_, newValue) => setMark(newValue)}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Поделитесь впечатлениями о тортике..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <StyledButton
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || !mark}
                >
                    {loading ? <CircularProgress size={24} /> : 'Отправить отзыв'}
                </StyledButton>
            </Box>
        </Modal>
    );
};


export default ReviewModal;