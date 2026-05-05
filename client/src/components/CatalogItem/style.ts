import { Box, styled, Typography } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '260px',
    height: '340px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    boxShadow: '0 4px 15px rgba(128, 1, 31, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',

    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 25px rgba(128, 1, 31, 0.15)',
    },
}));

export const ImageWrapper = styled(Box)({
    width: '100%',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '12px',
    backgroundColor: '#fff',
});

export const ProductImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    transition: 'transform 0.4s ease',

    '&:hover': {
        transform: 'scale(1.08)',
    },
});

export const ProductName = styled(Typography)(({ theme }) => ({

    color: theme.palette.text.primary,
    textAlign: 'start',
    marginBottom: theme.spacing(0.5),
}));

export const Price = styled(Typography)(({ theme }) => ({
    fontSize: '1.35rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

export const Description = styled(Typography)(({ theme }) => ({
    fontSize: '0.95rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}));