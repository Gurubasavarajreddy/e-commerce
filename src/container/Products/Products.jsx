import React from 'react';
// import Container from '@mui/material/Container';m
import Grid from '@mui/material/Grid';
import NavBar from '../../components/NavBar/NavBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductsData from '../../server/products/index.get.json';
import categoriesData from '../../server/categories/index.get.json';
import { Route, Link, useParams } from 'react-router-dom';

function Products() {
  // const [selectedCat, setSelectedCat] = React.useState({});

  return (
    <div>
      <NavBar />
      <Grid container sx={{ display: 'flex', '&>*': { margin: '0px 0.1%' } }}>
        <Grid item xs={2} sx={{ minHeight: '0vh' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {categoriesData
                .sort((a, b) => a.order - b.order)
                .map((banner) => (
                  <div key={banner.id}>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={`/products/${banner.key}/${banner.id}`}
                      >
                        <ListItemText primary={banner.name} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </List>
          </nav>
        </Grid>
        <Grid item xs={10}>
          <Route path="/products/:cat/:id">
            <ProductList />
          </Route>{' '}
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;

function ProductList() {
  const { id } = useParams();
  return (
    <>
      <Grid container>
        {ProductsData.filter((product) => product.category === id).map(
          (product, index) => (
            <ProductCard product={product} key={index} />
          )
        )}
      </Grid>
    </>
  );
}
