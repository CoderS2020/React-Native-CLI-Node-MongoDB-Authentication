import React, {useState, useEffect} from 'react';

import {Button} from 'react-native-paper';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Home = () => {
  const [email, setEmail] = useState('loading');
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://10.0.2.2:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setEmail(data.email);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);

  const logout = props => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.navigate('login');
    });
  };

  return (
    <>
      <Text style={{fontSize: 18}}>your email is {email}</Text>
      <Button
        mode="contained"
        style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
        onPress={() => logout(props)}>
        logout
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
