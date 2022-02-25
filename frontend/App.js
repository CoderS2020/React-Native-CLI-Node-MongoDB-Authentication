import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

//importing screens
import SignUp from './screens/SignUpScreen';
import Login from './screens/LoginScreen';
import Loading from './screens/LoadingScreen';
import Home from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLogged, setLogged] = useState(null);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLogged == null ? (
          <Stack.Screen name="loading" component={Loading} />
        ) : isLogged == true ? (
          <Stack.Screen name="home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

{
  /* <SignUp /> */
}
{
  /* <Login /> */
}
{
  /* <Loading /> */
}
{
  /* <Home /> */
}
export default App;
