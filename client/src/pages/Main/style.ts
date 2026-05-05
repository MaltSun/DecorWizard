import { styled, Box, Button } from "@mui/material";
import theme from "../../../theme/theme";

export const Container = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.background.default,
    }
))

export const ContentContainer = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: theme.spacing(15, 10),
        gap: theme.spacing(5),
    }
))

export const HorizontContentContainer = styled(ContentContainer)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: theme.spacing(5),
}))

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
    flexDirection: 'row',
    gap: theme.spacing(4)
}))

export const FontImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
}))
