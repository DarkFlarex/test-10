import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6">
                    <StyledLink to="/">News</StyledLink>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
