import React from 'react';

import Lottie from 'lottie-react';
import LoaderAnimation from './circle-loader.json';

function Loader() {
  return (
    <>
      <Lottie
        loop={true}
        autoplay={true}
        animationData={LoaderAnimation}
        style={{
          width: '100%',
          height: '200px',
          marginBottom: 15,
          marginLeft: 0
        }}
      />
    </>
  );
}

export default Loader;
