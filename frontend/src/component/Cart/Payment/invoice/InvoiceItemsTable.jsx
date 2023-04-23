import { View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import InvoiceTableFooter from './InvoiceTableFooter';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';

// const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bfbebd'
  }
});

const InvoiceItemsTable = ({ orderItems }) => {
    console.log('order items in InvoiceItemsTable : ', orderItems);
    
    const taxAndTotal = {
      tax: orderItems.taxPrice,
      total: orderItems.totalPrice/100,
    };

  return (
    <>
      <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={orderItems.orderItems} />

              <InvoiceTableFooter items={taxAndTotal} />
              
      </View>
    </>
  );
};

export default InvoiceItemsTable;
