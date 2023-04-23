import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './Products.css';

const ProductLoader = () => {
    return (
      <>
        <div className='products'>
          
            <Stack spacing={1}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant='circular' width={40} height={40} />
              <Skeleton variant='rectangular' width={210} height={60} />
              <Skeleton variant='rounded' width={210} height={60} />
            </Stack>
         
        </div>
      </>
    );
}


export default ProductLoader;

