/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductCard({ product }) {
  const { name, imageURL, stock, price, sku, description } = product;
  return (
    <div>
      {' '}
      <Grid item xs={12}>
        <Card
          sx={{ maxWidth: 250, minHeight: 400, maxHeight: 400, margin: '5%' }}
        >
          <CardHeader
            sx={{ overflow: 'hidden', maxHeight: 50 }}
            subheader={name + ' ' + ',' + `${stock} pcs`}
          />
          <CardMedia component="img" height="194" image={imageURL} alt={sku} />
          <CardContent sx={{ maxHeight: '40px' }}>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              color="text.secondary"
            >
              {description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography aria-label="add to favorites">
              MRP {''}RS.{price}
            </Typography>
            <Button>Buy Now</Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

export default ProductCard;
