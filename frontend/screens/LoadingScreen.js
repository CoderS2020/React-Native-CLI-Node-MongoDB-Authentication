import React, {useEffect, useState} from 'react';

import {ActivityIndicator, View, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const Loading = props => {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      props.navigation.navigate('home');
    } else {
      props.navigation.navigate('login');
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
