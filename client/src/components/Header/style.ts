import { Box, Drawer, styled, Switch, Typography } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100px',
    background: theme.palette.background.paper,
    padding: theme.spacing(2, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    boxSizing: 'border-box',
    zIndex: 1000,
    position: 'sticky',
    top: 0,
}));

export const NavContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    flex: 1,
    justifyContent: 'center',
}));

export const NavActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const StyledButton = styled('button')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '17px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
}));

export const StyledActiveButton = styled(StyledButton)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    textShadow: `0 0 5px ${theme.palette.common.black}`,
}));

export const LogoName = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontFamily: 'Katibeh',
}));

export const BurgerButton = styled('div')(({ theme }) => ({
    color: theme.palette.primary.main
}));

export const BurgerDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.background.paper,
        minWidth: 240,
    },
}));

export const BurgerNavContent = styled(Box)(({ theme }) => ({
    p: 2, display: 'flex', justifyContent: 'flex-end'
}));

export const BurgerItem = styled(Box)(({ theme, active, key }) => ({
    fontSize: '1.25rem',
    textTransform: 'uppercase',
    color: active === key ? theme.palette.text.primary : theme.palette.text.secondary,
}));