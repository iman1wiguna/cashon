
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainMenu from './pages/MainMenu';
import Auth from './pages/Auth';
import Pulsa from './pages/Pulsa';
import Topup from './pages/Topup';
import Kuota from './pages/Kuota';
import Pln from './pages/Pln';
import FormTopUp from './pages/FormTopUp';
const AppNavigator = createStackNavigator(
  {
  	Auth : Auth,
    Login: Login,
    Register: Signup,
    Home : MainMenu,
    TopUp : Topup,
    Pulsa : Pulsa,
    Pln : Pln,
    Kuota : Kuota,
    FormTopUp : FormTopUp,
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class Route extends Component{
	render() {
	    return (
	     <AppContainer />
	    );
    }
}

