import { styled, Box, Button } from "@mui/material";

export const Container = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
    }
))

export const ContentContainer = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: theme.spacing(20),
        gap: theme.spacing(10),
        background: theme.palette.background.default,
        borderRadius: '15px',
    }
))

export const StepsContainer = styled(ContentContainer)(({theme}) => ({
    paddingTop: theme.spacing(5)}))

export const HorizontContentContainer = styled(ContentContainer)(() => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
}))

export const ArticleContainer = styled(ContentContainer)(() => ({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%',
    gap: '20px'
}))

export const BufferContainer = styled(Box)(() => ({
    height: '5vh'
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

// export const AnswerButton = styled(Button)(({ theme }) => ({
//     padding: theme.spacing(2, 4),
//     fontSize: '1.2rem',