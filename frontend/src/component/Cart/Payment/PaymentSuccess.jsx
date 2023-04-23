import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createOrder } from '../../../actions/orderAction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Lottie from 'lottie-react';
import ThankyouAnimation from './thankyou.json';
import Grid from '@mui/material/Grid';

//for invoice
import { PDFViewer } from '@react-pdf/renderer';
//modal
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button as Button1
} from '@chakra-ui/react';
import PaymentInvoice from './invoice/PaymentInvoice';

const PaymentSuccess = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qrData, setQrData] = useState(``);
  const navigate = useNavigate();

  const searchQuery = useSearchParams()[0];
  console.log(searchQuery.get('reference'));
  const ref = searchQuery.get('reference');

  const dispatch = useDispatch();
  const [call, setCall] = useState(false);

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const { cartItems, shippingInfo } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.users);

  // let userdetails = {};
  // if (user) {
  //   userdetails = user.user;
  // }
  // //console.log(shippingInfo.address);
  //console.log('user in payment success :', user);

  // console.log('orderInfo in payment success : ', orderInfo);
  // console.log('cartItems in payment success :', cartItems);

  //testing
  const order = {
    totalPrice: Math.round(orderInfo.totalPrice * 100),
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    orderItems: cartItems,
    shippingInfo,
    paymentInfo: {
      id: ref,
      status: 'succeeded'
    }
  };

  console.log('order details in payment success:', order);

  //  Payment By  : ${user.user && user.user.name}
  const qrValue = `
     Paid Amount : ${order && order.totalPrice / 100}
     Payment ID  : ${order && order.paymentInfo.id}
     ThankYou
  `;
  const qrRef = useRef();
  const downloadQRCode = e => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector('canvas');
    let image = canvas.toDataURL('image/png');
    let anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = `${order && order.paymentInfo.id}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const Details = {
    order: order,
    user: user
  };

  console.log('details : ', Details);

  useEffect(() => {
    if (ref) {
      dispatch(createOrder(order));
    }
    setQrData(qrValue);
  }, [ref, dispatch, qrValue, call]);

  const qrcode = (
    <QRCodeCanvas id='qrCode' value={qrData} size={300} level={'H'} />
  );

  return (
    <>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Invoice</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PDFViewer width='100%' height='600' className='app'>
                <PaymentInvoice Details={Details} />
              </PDFViewer>
            </ModalBody>

            <ModalFooter>
              <Button1 colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button1>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

      {/* <Grid sx={{ flexGrow: 1 }} container spacing={2}></Grid> */}

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        <Paper
          elevation={8}
          sx={{
            marginTop: 12,
            marginLeft: 16,
            marginBottom: 12,
            width: 800,
            height: 600,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          <Box
            sx={{
              width: 800,
              height: 100,
              alignContent: 'center',
              justifyContent: 'center',
              color: '#05ad21',
              backgroundColor: 'white',
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            <Stack direction='row' spacing={2}>
              <h1 style={{ fontSize: '3vw' }}>Payment Successfull</h1>
              <CheckCircleIcon />
            </Stack>
          </Box>

          <Box
            sx={{
              width: 800,
              height: 400,
              margin: 2,
              backgroundColor: 'white',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: 320,
                height: 400,
                margin: 2,
                padding: 4,
                backgroundColor: 'white',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row'
              }}
            >
              <Stack direction='column' spacing={2}>
                <h1 style={{ alignContent: 'center' }}>Payment Details </h1>
                <div>
                  <h5>Reference No: {ref}</h5>
                  <h6>Payment Status : {order && order.paymentInfo.status}</h6>
                  <h6>Paid Amount : Rs.{order && order.totalPrice / 100}</h6>
                </div>
                <Button variant='contained' onClick={() => navigate('/')}>
                  Back to Home
                </Button>

                <Button variant='contained' onClick={() => navigate('/orders')}>
                  My Orders
                </Button>

                {/* to generate invoice  */}
                <Button onClick={onOpen} endIcon={<CloudDownloadIcon />}>
                  DOWNLOAD INVOICE
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                width: 320,
                height: 400,
                margin: 2,
                backgroundColor: 'white',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  margin: 2,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <div ref={qrRef}>{qrcode}</div>
              </Box>

              <Box
                sx={{
                  marginLeft: 10,
                  alignItems: 'center'
                }}
              >
                <Button onClick={downloadQRCode} endIcon={<FileDownloadIcon />}>
                  Download QR Code
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* success full design from lottie -- here */}
        <Box
          sx={{
            width: 500,
            height: 400,
            margin: 2,
            alignItems: 'center'
          }}
        >
          <Lottie
            loop={true}
            autoplay={true}
            animationData={ThankyouAnimation}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PaymentSuccess;
