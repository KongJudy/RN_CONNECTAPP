import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Loading() {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size='large' color='#1ACA9E' />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#1ACA9E',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  }
});

export default Loading;
