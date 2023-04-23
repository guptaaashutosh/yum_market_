import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import axios from 'axios';
import emailjs from '@emailjs/browser';
import Lottie from 'lottie-react';
import AboutUs from './aboutUs.json';
import './about.css';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function About() {
  

  return (
    <Box sx={{ flexGrow: 1, margin: 6 }}>
      <Grid container spacing={2} className='about'>
        <Grid item xs={12}>
          <Typography variant='h4' component='h1'>
            About Yum Market
          </Typography>

          <Typography variant='body1' component='p'>
            Welcome to Yum Market, your one-stop-shop for all your food and
            grocery needs.
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          container
          direction='column'
          sx={{
            margin: 'auto',
            flexFlow: 1,
            marginTop: 2,
            p: 2,
            minWidth: 300,
            alignItems: 'center'
          }}
        >
          <Typography variant='h5' component='h2'>
            Our Story
          </Typography>
          <Typography variant='body1' component='p'>
            Yum Market was founded in 2023,with the lack of options for online
            grocery shopping. we wanted to create a platform that offered a wide
            variety of products at affordable prices, while still maintaining a
            personal touch. Today, Yum Market has grown into a thriving
            business, with a team of dedicated professionals who are committed
            to delivering the best possible shopping experience.
          </Typography>

          <Typography variant='h5' component='h2'>
            Our Mission
          </Typography>

          <Typography variant='body1' component='p'>
            Our mission at Yum Market is simple: to provide our customers with
            the best possible shopping experience. We're committed to offering a
            wide variety of products, exceptional customer service, and fast,
            reliable shipping. We believe that shopping for food and groceries
            should be convenient, affordable, and fun!
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Lottie
            loop={true}
            autoplay={true}
            animationData={AboutUs}
            style={{
              width: '100%',
              height: '80%'
            }}
          />
        </Grid>
        <Grid
          item
          xs
          container
          direction='column'
          sx={{
            margin: 'auto',
            flexFlow: 1,
            marginTop: 2,
            p: 2,
            minWidth: 300,
            alignItems: 'center'
          }}
        >
          <Typography variant='h5' component='h2'>
            Our Values
          </Typography>

          <Typography variant='body1' component='p'>
            At Yum Market, we believe in transparency, quality, and customer
            satisfaction. We're committed to sourcing the highest quality
            products from the best suppliers, and we're always looking for ways
            to improve our processes and services. We value our customers'
            feedback and strive to use it to improve our business.
          </Typography>
        </Grid>
       
        <Grid item xs={12}>
        
          <Typography variant='h5' component='h2'>
            Our Team
          </Typography>
          
          <Typography variant='body1' component='p'>
            At Yum Market, we have a team of dedicated professionals who are
            passionate about fashion and customer service. From our product
            specialists to our customer support team, we're all committed to
            delivering the best possible experience for our customers. We're
            always available to answer your questions and provide support
            whenever you need it.
          </Typography>
          
        </Grid>
      </Grid>
    </Box>
  );
}


// import React from "react";
// import { Grid, Typography } from "@mui/material";
// import "./about.css";

// function About() {
//   return (
//     <Grid container spacing={2} className="about">
//       <Grid item xs={12}>
//         <Typography variant="h4" component="h1">About Yum Market</Typography>
//         <Typography variant="body1" component="p">Welcome to Yum Market, your one-stop-shop for all your food and grocery needs.</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" component="h2">Our Story</Typography>
//         <Typography variant="body1" component="p">Yum Market was founded in 2023,with the lack of options for online grocery shopping. we wanted to create a platform that offered a wide variety of products at affordable prices, while still maintaining a personal touch. Today, Yum Market has grown into a thriving business, with a team of dedicated professionals who are committed to delivering the best possible shopping experience.</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" component="h2">Our Mission</Typography>
//         <Typography variant="body1" component="p">Our mission at Yum Market is simple: to provide our customers with the best possible shopping experience. We're committed to offering a wide variety of products, exceptional customer service, and fast, reliable shipping. We believe that shopping for food and groceries should be convenient, affordable, and fun!</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" component="h2">Our Team</Typography>
//         <Typography variant="body1" component="p">At Yum Market, we have a team of dedicated professionals who are passionate about food and customer service. From our product specialists to our customer support team, we're all committed to delivering the best possible experience for our customers. We're always available to answer your questions and provide support whenever you need it.</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" component="h2">Our Values</Typography>
//         <Typography variant="body1" component="p">At Yum Market, we believe in transparency, quality, and customer satisfaction. We're committed to sourcing the highest quality products from the best suppliers, and we're always looking for ways to improve our processes and services. We value our customers' feedback and strive to use it to improve our business.</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" component="h2">Contact Us</Typography>
//         <Typography variant="body1" component="p">If you have any questions or concerns, please don't hesitate to contact us. You can reach our customer support team by email, phone, or live chat. We're always happy to help!</Typography>
//       </Grid>
//     </Grid>
//   );
// }

// export default About;


