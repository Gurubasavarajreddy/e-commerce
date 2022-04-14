/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import './BannerComponent.style.css';
import { useHistory } from 'react-router-dom';

function BannerComponent({ name, description, imageUrl, key, id }) {
  const history = useHistory();
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 5px 17px rgba(0, 0, 0, 0.2)',
        margin: '1% 0',
      }}
    >
      {' '}
      <Box sx={{ width: '50%' }}>
        <Box sx={{ width: '100%' }}>
          <img src={imageUrl} alt={name} className="logo_img" />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '50%',
          '>*': {
            margin: '1%',
          },
        }}
      >
        <Typography>{name}</Typography>
        <Typography>{description}</Typography>
        <Button
          sx={{
            backgroundColor: '#800000',
            color: 'black',
            fontWeight: '800',
            width: '50%',
          }}
          onClick={() => {
            history.push(`/products/${key}/${id}`);
          }}
        >
          Explore {name}
        </Button>
      </Box>
    </Grid>
  );
}

export default BannerComponent;
