import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GoogleMap from './GoogleMap';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Lottie from 'lottie-react';
import ContactUs from './contact_us.json';
import { useAlert } from 'react-alert';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function Contact() {

  const alert = useAlert();
    
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const submitHandler = async () => {
    console.log('contact form', name, email, message);

    const templateParams = {
      name: name,
      email: email,
      message: message
    };

    const serviceId = await axios.get('api/getServiceId');
    const tempId = await axios.get('api/getTempId');
    const publicId = await axios.get('api/getPublicId');

    console.log(
      'ids : ',
      serviceId.data.key,
      tempId.data.key,
      publicId.data.key
    );

    emailjs
      .send(
        serviceId.data.key,
        tempId.data.key,
        templateParams,
        publicId.data.key
      )
      .then(
        result => {
          if (result.status === 200) {
            alert.success('Your Message Send Successfully!!');
          }
          console.log('SUCCESS!', result.status, result.text);
        },
        error => {
          alert.error('Something error to send.please try again!!');
          console.log(error.text);
        }
      );
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <p>contact us image</p> */}
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
          <Typography
            variant='body1'
            style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 40 }}
          >
            If you have any questions or concerns, please don't hesitate to
            contact us. You can reach our customer support team by email or
            phone. We're always happy to help!
          </Typography>

          <h2 style={{ fontSize: 18, lineHeight: 1.5, marginBottom: 40 }}>
            Contact Us
          </h2>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            fullWidth
            margin='dense'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin='dense'
            id='outlined-basic'
            label='Email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin='dense'
            type='text'
            id='outlined-basic'
            label='Message'
            variant='outlined'
            multiline='true'
            rows='6'
            fullWidth
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={submitHandler}
            size='large'
            endIcon={<SendIcon />}
            sx={{
              marginTop: 10,
              backgroundColor: 'tomato',
              minWidth: 150,
              minHeight: 40,
              alignItems: 'center'
            }}
          >
            Send
          </Button>
          {/* </Item> */}
        </Grid>
        <Grid item xs={6}>
          <Lottie
            loop={true}
            autoplay={true}
            animationData={ContactUs}
            style={{
              width: '100%',
              height: '80%'
            }}
          />
        </Grid>
        {/* <Grid
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
          <GoogleMap />
        </Grid> */}

        <Grid item xs container direction='row'>
          <Grid item xs={6}>
            <GoogleMap />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              marginTop: 2,
              justifyContent: 'center',
              alignContent: 'center',
              textAlign: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant='h2' component='h1'>
              Contact Details
            </Typography>

            <Box sx={{ margin: 6 }}>
              <Typography variant='h5' component='h4'>
                Customer Service Hours
              </Typography>
              <Typography>Monday to Friday: 9:00am - 5:00pm IST</Typography>
              <Typography variant='h5' component='h4'>
                Email Address
              </Typography>
              <Typography>support@yum.market.com</Typography>
              <Typography variant='h5' component='h4'>
                Phone Number
              </Typography>
              <Typography>+91-9876463489</Typography>
              <Typography variant='h5' component='h4'>
                Mailing Address
              </Typography>
              <Typography>Rajkot - 360020, Gujart, India</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
