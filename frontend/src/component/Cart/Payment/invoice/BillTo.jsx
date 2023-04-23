import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique'
  }
});



const BillTo = ({ userDetails, order }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{userDetails.name}</Text>
    <Text>{userDetails.email}</Text>
    <Text>
      {order.shippingInfo.address},{order.shippingInfo.city},
      {order.shippingInfo.state},{order.shippingInfo.pinCode}
    </Text>
    <Text>{order.shippingInfo.phoneNo}</Text>
  </View>
);

export default BillTo;
