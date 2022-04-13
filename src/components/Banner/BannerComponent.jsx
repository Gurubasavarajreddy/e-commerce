/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import './BannerComponent.style.css';
function BannerComponent({ name, description, imageUrl }) {
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
          width: '50%',
          '>*': {
            margin: '1%',
          },
        }}
      >
        <Typography>{name}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </Grid>
  );
}

export default BannerComponent;
