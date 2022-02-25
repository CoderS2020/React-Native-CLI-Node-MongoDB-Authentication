import React, {useState} from 'react';

import {
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Button, TextInput} from 'react-native-paper';

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendCred = async () => {
    fetch('http://10.0.2.2:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        //console.log(data);
        try {
          await AsyncStorage.setItem('token', data.token);
        } catch (error) {
          console.log('error', error);
        }
      });
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar animated={true} backgroundColor="#61dafb" />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 70,
            color: 'grey',
            marginTop: 15,
          }}>
          React Native Authentication
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 100,
            marginTop: 10,
            marginBottom: 10,
          }}>
          Create New Account
        </Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <TextInput
          value={password}
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={{
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            marginBottom: 10,
          }}
        />

        <Button
          mode="contained"
          onPress={() => sendCred(props)}
          style={{
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            marginBottom: 10,
          }}>
          Sign Up
        </Button>
        <TouchableOpacity
          style={{
            marginLeft: 30,
            marginRight: 25,
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={() => props.navigation.navigate('login')}>
          <Text>Already have an account?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
