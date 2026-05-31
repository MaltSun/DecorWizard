import { Box, styled } from "@mui/material";

export const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(4)

}))

export const ContentContainer = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '50vh',
        padding: theme.spacing(2),
        gap: theme.spacing(10),
    }
))