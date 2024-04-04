import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import {CONST} from '../../CONST';
import Data from '../../pages/Data';

const Stack = createNativeStackNavigator();

export default function PublicScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CONST.SCREEN.SIGNIN}
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={CONST.SCREEN.SIGNUP}
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={CONST.SCREEN.DATA}
        component={Data}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
