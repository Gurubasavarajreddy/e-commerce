/* eslint-disable no-undef */
import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ReactSlick from '../../components/React.Slick/React.Slick';
import bannerData from '../../server/banners/index.get.json';
import categoriesData from '../../server/categories/index.get.json';
import BannerComponent from '../../components/Banner/BannerComponent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
function Home() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Grid item>
          <ReactSlick list={bannerData}>
            {bannerData.map(({ bannerImageUrl, bannerImageAlt, id }) => (
              <div key={id}>
                <img
                  src={bannerImageUrl}
                  alt={bannerImageAlt}
                  className="logo_img"
                />
              </div>
            ))}
          </ReactSlick>
        </Grid>
        <Grid item>
          {categoriesData
            .sort((a, b) => a.order - b.order)
            .map((banner) => (
              <div key={banner.id}>
                <BannerComponent {...banner} />
              </div>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
