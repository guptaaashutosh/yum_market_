import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#bfbebd';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bfbebd',
    borderBottomWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold'
  },
  description: {
    width: '85%',
    textAlign: 'right',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8
  },
  total: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 10
  }
});

const InvoiceTableFooter = ({ items }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>TAX</Text>
        <Text style={styles.total}>{items.tax.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>{items.total.toFixed(2)}</Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
