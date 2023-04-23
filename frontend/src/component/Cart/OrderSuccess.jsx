import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Lottie from 'lottie-react';
import SuccessAnimation from './successfully-done.json';
import { useNavigate } from 'react-router-dom';

function OrderSuccess({launchValue}) {
  console.log("launch value : ", launchValue);

  const navigate = useNavigate();
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    // setShow(false);
    //console.log("show in handleClose : ", show);
    navigate('/orders');  //after payment successfull it will navigate to /orders
  } 
  //const handleShow = () => setShow(launchValue);

  useEffect(() => {
    setShow(launchValue)
  }, [launchValue]);
  
  

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Successfull</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Lottie
            loop={true}
            autoplay={true}
            animationData={SuccessAnimation}
            style={{
              width: '100%',
              height: '200px',
              marginBottom: 15,
              marginLeft: 0
            }}
          />
          
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant='success' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}


export default OrderSuccess;
