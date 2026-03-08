import { StepsContainer } from './../Main/style';
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

// export const ContentContainer = styled(Box)(({ theme }) => (
//     {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '80%',
//         padding: theme.spacing(20),
//         gap: theme.spacing(10),
//         background: theme.palette.background.default,
//         borderRadius: '15px',
//     }
// ))

export const CatalogBlock = styled(Box)(({ theme }) => (
    {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
       
        padding: theme.spacing(5),
        gap: theme.spacing(10),
    }
))