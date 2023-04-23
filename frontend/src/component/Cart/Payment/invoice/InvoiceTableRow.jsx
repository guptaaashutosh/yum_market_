import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const borderColor = '#bfbebd';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bfbebd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
    textAlign: 'center',
    flexGrow: 1
  },
  img: {
    width: '20%',
    height: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  description: {
    width: '40%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  rate: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  amount: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 10
  }
});

const InvoiceTableRow = ({ items }) => {
    console.log("items in invoice table row : ", items);
  const rows = items.map(item => (
    <View style={styles.row} key={item.product}>
      <Image
        style={styles.img}
        src={item.image}
      />
      <Text style={styles.description}>{item.name}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>{item.price}</Text>
      <Text style={styles.amount}>{(item.quantity * item.price).toFixed(2)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
