// import React from 'react';
// import './Header.css';

// const Head = () => {
//   return (
//     <>
//       <section className='head'>
//         <div className='container d_flex'>
//           <div className='left row'>
//             {/* <i className='fa fa-phone'></i> */}
//             <label> +91-9889768956</label>
//             {/* <i className='fa fa-envelope'></i> */}
//             <label> support@yum.market.com</label>
//           </div>
//           <div className='right row RText'>
//             <label>Theme FAQ"s</label>
//             <label>Need Help?</label>
//             <span>🏳️‍⚧️</span>
//             <label>EN</label>
//             <span>🏳️‍⚧️</span>
//             <label>USD</label>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Head;


import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';



export default function Head() {
  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: '#020348' }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid
            item
            xs={6}
            md={8}
            sx={{
              margin: 'auto',
              marginTop: 2,
              p: 2,
              alignItems: 'center',
              color: 'white',
              textAlign:'center',
              justifyContent: 'space-between'
            }}
          >
            <label> Phone Number : +91-9889768956 </label>
            <label> Email Address : support@yum.market.com</label>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              margin: 'auto',
              marginTop: 2,
              p: 2,
              alignItems: 'center',
              color: 'white',
              justifyContent: 'space-between'
            }}
          >
             <label>Theme FAQ"s</label>
            <label>Need Help?</label>
             {/* <span>🏳️‍⚧️</span> */}
            <label>EN</label>
            {/* <span>🏳️‍⚧️</span> */}
             <label>IN</label>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

