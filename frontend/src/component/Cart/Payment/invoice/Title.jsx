import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  titleContainer: {
    // flexDirection: 'row',
    marginTop: 24
  },
  reportTitle: {
    color: '#FF6347',
    letterSpacing: 2,
    fontSize: 25,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

const Title = ({title}) => {
  return (
    <>
      <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>{title}</Text>
      </View>
    </>
  );
}

export default Title
