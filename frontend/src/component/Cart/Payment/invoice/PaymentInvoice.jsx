import React from 'react';
//for invoice
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import Title from './Title';
import InvoiceNo from './InvoiceNo';
import BillTo from './BillTo';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import { useSelector } from 'react-redux';
import InvoiceItemsTable from './InvoiceItemsTable';
//
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column'
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const PaymentInvoice = ({ Details }) => {
  const order = Details.order;
  const user = Details.user.user;

  // console.log('user in payment invoice : ', user.name);
  // console.log('order in payment invoice : ', Details.order);
  // console.log('Details in payment invoice : ', Details);

  const userDetails = {
    name: user.name,
    email: user.email
  };

  return (
    <>
      <Document>
        <Page size='A4' style={styles.page}>
          <Image
            style={styles.logo}
            src='https://res.cloudinary.com/dibyofcwi/image/upload/v1676139442/avatars/wwuk5qj7nhrlhb07q3f8.jpg'
          />
          <Title title='YUM MARKET' />
          <InvoiceNo invoiceNo={order.paymentInfo.id} />
          <BillTo userDetails={userDetails} order={order} />
          <InvoiceItemsTable orderItems={order} />
          <InvoiceThankYouMsg />
        </Page>
      </Document>
    </>
  );
};

export default PaymentInvoice;
