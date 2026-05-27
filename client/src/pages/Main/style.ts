import { styled, Box, Button } from "@mui/material";

export const Container = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.background.default,

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    }
))

export const ContentContainer = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        padding: theme.spacing(10, 5),
        gap: theme.spacing(5),

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    }
))


export const ItemsContainer = styled(ContentContainer)(() => ({
    height: '10vh',
    background: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '40px',
    justifyContent: 'space-around',
    padding: 0
}))

export const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: '400px',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: theme.spacing(4),
    }
}));

export const FontImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
}))
