/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';

export default function ReactSlick(props) {
  const { children } = props;

  const settings = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
