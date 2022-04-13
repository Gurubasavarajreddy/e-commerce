import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../static/logo.png';
import Cart from '../../static/cart.svg';
import './NavBar.style.css';
import { useHistory } from 'react-router-dom';

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/Products' },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const history = useHistory();
  const onClickRedirect = (to) => {
    history.push(to);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      {' '}
      <AppBar position="static">
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Toolbar sx={{ minWidth: '80vw' }} disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <img src={Logo} className="logo_img" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(({ label }) => (
                  <MenuItem key={label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <img src={Logo} className="logo_img" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(({ label, to }) => (
                <Button
                  key={label}
                  onClick={() => onClickRedirect(to)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', '>*': { margin: '2%' } }}>
                <IconButton sx={{ p: 0 }}>Sign Up</IconButton>
                <IconButton sx={{ p: 0 }}>Register</IconButton>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#dcdcdc',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Tooltip title="Open Cart">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={Cart} />
                  </IconButton>
                </Tooltip>
                <Typography color="black">0 Items</Typography>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
