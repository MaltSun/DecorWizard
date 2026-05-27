import React, { useState } from 'react';
import { ModalStyle, StyledButton } from './style';
import { Box, CircularProgress, Modal, Rating, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReviewModalProps } from './type';
import { toast } from 'react-toastify';

export const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, orderId, onSuccess }) => {
    const [mark, setMark] = useState<number | null>(5);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('reviews');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/reviews/create', {
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
                toast.success(t('submitSuccess'), { position: "top-right", autoClose: 5000 });
            }
        } catch (err) {
            toast.error(t('submitError'), { position: "top-right", autoClose: 5000 });
            console.error("Ошибка при отправке отзыва", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={ModalStyle}>
                <Typography variant="h5" sx={{ fontFamily: '"Kurale", serif', mb: 2 }}>
                    {t('leaveReview')}
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                    {t('yourRating')}
                </Typography>
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
                    placeholder={t('shareImpressions')}
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
                    {loading ? <CircularProgress size={24} /> : t('submitReview')}
                </StyledButton>
            </Box>
        </Modal>
    );
};


export default ReviewModal;