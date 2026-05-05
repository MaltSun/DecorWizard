import { Box, Divider, Link, styled } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => (
    {
        width: '100%',
        backgroundColor: '#f7e7ce',
        color: '#5C2A2A',
        gap: theme.spacing(4),
    }
))


export const FooterContent = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        textAlign: 'center',
        padding: theme.spacing(5, 4),
    }
))

export const FooterBottom = styled(FooterContent)(({ theme }) => ({
    gap: 2,
    opacity: 0.75,
    fontSize: '0.9rem',
    padding: theme.spacing(1, 2),
}))

export const FooterDivider = styled(Divider)(() => ({
    my: 4, borderColor: 'rgba(92, 42, 42, 0.15)'
}));

export const FooterLink = styled(Link)(() => ({
    color: '#5C2A2A',
    fontSize: '1.05rem',
    '&:hover': { color: '#80011F' },
}))  
