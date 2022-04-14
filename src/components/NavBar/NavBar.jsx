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
import Logo1 from '../../static/logo_2x.png';
import Cart from '../../static/cart.svg';
import './NavBar.style.css';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../server/firebase.service';
import categoriesData from '../../server/categories/index.get.json';

const pages = [
  { label: 'Home', to: '/' },
  {
    label: 'Products',
    to: `/products/${categoriesData.sort((a, b) => a.order - b.order)[0].key}/${
      categoriesData.sort((a, b) => a.order - b.order)[1].id
    }`,
  },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatchModalState = useDispatch();
  const cartState = useSelector((state) => state);
  const history = useHistory();
  const isAuthenticated = localStorage.getItem('auth');

  const onClickRedirect = (to) => {
    history.push(to);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onLogOut = async () => {
    logout();
    localStorage.clear();
    dispatchModalState({ type: 'EMETY_CART' });
    alert('successfully Log Out');
    history.push('/login');
  };

  return (
    <div>
      {' '}
      <AppBar position="static">
        <Container
          sx={{ display: 'flex', justifyContent: 'center' }}
          maxWidth="xl"
        >
          <Toolbar
            sx={{
              minWidth: '80vw',
              padding: '0px',
              margin: '0px',
              justifyContent: { xs: 'space-between' },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <img src={Logo} className="logo_img" />
            </Typography>

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
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
              sx={{
                flexGrow: 0,
                display: { xs: 'flex', md: 'none' },
                width: { xs: '50%' },
                justifyContent: { xs: 'center' },
              }}
            >
              <img src={Logo1} className="logo_img" />
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

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: { xs: '30%', lg: '20%' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                }}
              >
                {!isAuthenticated && (
                  <IconButton
                    component={Link}
                    to="/login"
                    sx={{
                      p: 0,
                      margin: '0px 10px',
                      fontSize: { xs: '16px', lg: '20px' },
                    }}
                  >
                    SignIn
                  </IconButton>
                )}
                {!isAuthenticated && (
                  <IconButton
                    component={Link}
                    to="/signup"
                    sx={{
                      p: 0,
                      margin: '0px 10px',
                      fontSize: { xs: '16px', lg: '20px' },
                    }}
                  >
                    Register
                  </IconButton>
                )}
                {isAuthenticated && (
                  <IconButton
                    onClick={onLogOut}
                    sx={{ p: 0, fontSize: { xs: '16px', lg: '20px' } }}
                  >
                    LogOut
                  </IconButton>
                )}
              </Box>
              <Tooltip title="Open Cart">
                <Box
                  sx={{
                    backgroundColor: '#dcdcdc',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (isAuthenticated) {
                      dispatchModalState({
                        payload: { state: true },
                        type: 'CART_MODAL_STATE',
                      });
                    } else {
                      history.push('/login');
                    }
                  }}
                >
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={Cart} />
                  </IconButton>

                  <Typography color="black">
                    {cartState.cartData.length} Items
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
