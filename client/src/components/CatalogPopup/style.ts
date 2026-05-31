import { Box, Paper, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: theme.spacing(5),
        padding: theme.spacing(7),
        gap: theme.spacing(5),
        zIndex: 1000,
        position: 'fixed',
    }
))

export const Popup = styled(Paper)(({theme}) => ({
    width: '60%',
    maxWidth: '800px',
    height: 'auto',
    minHeight: '400px',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(7),
    elevation: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    gap: theme.spacing(5),
}))

export const Description = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(5),
}))

export const ButtonStack = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'space-between',
    width: '100%',
}))
