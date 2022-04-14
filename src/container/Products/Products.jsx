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
import useMediaQuery from '@mui/material/useMediaQuery';

import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Products() {
  // const [selectedCat, setSelectedCat] = React.useState({});
  const isMobile = useMediaQuery('(max-width:800px)');

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <NavBar />
      <Grid container sx={{ display: 'flex', '&>*': { margin: '0px 0.1%' } }}>
        <Grid item lg={2} xs={12} sx={{ minHeight: '0vh' }}>
          {!isMobile && (
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
          )}
          {isMobile && (
            <List>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary="Category" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
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
              </Collapse>
            </List>
          )}
        </Grid>
        <Grid item lg={10} xs={12}>
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
