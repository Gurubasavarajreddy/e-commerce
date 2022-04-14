/* eslint-disable react/prop-types */
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function SimpleDialog() {
  const cartState = useSelector((state) => state);

  const fullScreen = useMediaQuery('(max-width:500px)');

  const dispatchModalState = useDispatch();
  const handleClose = () => {
    dispatchModalState({
      payload: { state: false },
      type: 'CART_MODAL_STATE',
    });
  };

  return (
    <BootstrapDialog
      fullWidth={fullScreen}
      onClose={handleClose}
      open={cartState.modalState}
      aria-labelledby="customized-dialog-title"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        My Cart Item({cartState.cartData.length}Items)
      </BootstrapDialogTitle>
      <DialogContent sx={{ minHeight: '50vh' }} dividers>
        {cartState.cartData.length > 0 ? (
          cartState.cartData.map((data, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', lg: 'row' },
              }}
            >
              {' '}
              <Box sx={{ width: '20%' }}>
                <img src={data.imageURL} className="logo_img" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: { xs: '100%' },
                  '&>*': {
                    margin: '0px 1%',
                  },
                }}
              >
                <Box>{data.name}</Box>
                <Box
                  sx={{
                    display: 'flex',
                    '&>*': {
                      margin: '1%',
                    },
                  }}
                >
                  <RemoveIcon
                    sx={{
                      background: 'red',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      dispatchModalState({
                        payload: { ...data, ops: 'decrement' },
                        type: 'UPDATE_CART',
                      });
                    }}
                  />
                  <Typography>{data.qty}</Typography>
                  <AddIcon
                    sx={{
                      background: 'red',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      dispatchModalState({
                        payload: { ...data, ops: 'increment' },
                        type: 'UPDATE_CART',
                      });
                    }}
                  />{' '}
                  <ClearIcon /> <Typography>Rs.{data.price}</Typography>
                </Box>
              </Box>
              <Box sx={{ alignSelf: { xs: 'flex-start', lg: 'center' } }}>
                <Typography>Rs.{data.qty * data.price}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: '800' }}>
              No Items in Your Cart
            </Typography>
            <Typography>Your favourite items are just click away</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus sx={{ width: '100%', backgroundColor: 'red' }}>
          <Typography>Proceed to Checkout</Typography>
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
