import React, { Component } from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Input,Button,Image, } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      security_code: ''
    };
  }

  Login = () => {
     fetch('https://cashonkwu.000webhostapp.com/api/v1/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number : this.state.phonenumber,
          security_code : this.state.securitycode,      
        })
  
        }).then((response) => response.json())
          .then(async (responseJson) => {
            // console.log(responseJson.serve.id);
            if(responseJson.serve != null){
              try{
                await AsyncStorage.setItem('userid', responseJson.serve.phone_number);
                this.props.navigation.navigate('Home');
              } catch (e) {
                
              }
              this.props.navigation.navigate('Home');
            }else{
              
              alert("Login gagal");
            }
          }).catch((error) => {
            console.log(error);
          });
  }
  Signup = () =>{
    this.props.navigation.navigate('Register')
  }

  render(){
    return(
       <View style={styles.container}>
       <Image  source={require('../img/cotitle.jpg')} style={styles.img}/>
          <View style={styles.form}>
            <Input
              containerStyle={styles.usernamefieldcontainer}
              label = 'Phone Number'
              placeholder='e.g 08xxxxxxxx' keyboardType={'numeric'} 
              onChangeText={(phonenumber) => this.setState({phonenumber})}
            />
            <Input
              containerStyle={styles.passwordfieldcontainer}
              label = 'Security Code'
              secureTextEntry={true}
              placeholder='Security Code' keyboardType={'numeric'} 
              onChangeText={(securitycode) => this.setState({securitycode})}
              maxLength = {8}
            />

            <Button
            
              buttonStyle={styles.loginbutton}
              onPress={this.Login.bind(this)}
              title="Login"
            />
             <Button
              buttonStyle={styles.signupbutton}
              type="outline"
              onPress={this.Signup.bind(this)}
              title="Sign Up"
            />
          </View>
          
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  usernamefieldcontainer:{
    marginTop:20,
    paddingBottom: 50 
  },
  passwordfieldcontainer:{
    paddingBottom: 50 
  },
  form:{
    width: 250,
    height: 400,
  },
  loginbutton:{
    borderRadius: 250,
    borderWidth: 1,
    marginBottom:10    
  },
  signupbutton:{
    borderRadius: 20,
    borderWidth: 1,
    marginTop:20
  },
  textregister:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  img:{
      width: 150,
      height: 200,
      resizeMode: 'contain'
  }
});
