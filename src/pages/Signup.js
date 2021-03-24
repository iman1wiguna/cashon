import React, { Component } from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Input,Button,Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Signup extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      username :'',
      phone_number: '',
      security_code: ''
    };
  }

  Login = () => {
     fetch('https://cashonkwu.000webhostapp.com/api/v1/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username : this.state.username,
          phone_number : this.state.phone_number,
          security_code : this.state.security_code,      
        })
  
      }).then((response) => response.json())
      .then(async (responseJson) => {
       console.log(responseJson);
        if(responseJson.serve != null){
          try{
            await AsyncStorage.setItem('userid', responseJson.serve.username);
            this.props.navigation.navigate('Home');
          } catch (e) {
            
          }
          this.props.navigation.navigate('Home');
        }else{
          alert("Register gagal");
        }
      }).catch((error) => {
        console.log(error);
      });
  }


  render(){
    return(
       <View style={styles.container}>
       <Image  source={require('../img/cotitle.jpg')} style={styles.img}/>
          <View style={styles.form}>
          <Input
              containerStyle={styles.usernamefieldcontainer}
              label = 'Username'
              placeholder='Your Name'
              onChangeText={(username) => this.setState({username})}
            />
            <Input
              containerStyle={styles.usernamefieldcontainer}
              label = 'Phone Number'
              placeholder='e.g 08xxxxxxxx' keyboardType={'numeric'} 
              onChangeText={(phone_number) => this.setState({phone_number})}
            />
            <Input
              containerStyle={styles.passwordfieldcontainer}
              label = 'Security Code'
              secureTextEntry={true}
              placeholder='Security Code' keyboardType={'numeric'} 
              onChangeText={(security_code) => this.setState({security_code})}
              maxLength={8  }
            />

            <Button
              buttonStyle={styles.loginbutton}
              onPress={this.Login.bind(this)}
              title="Signup"
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
    backgroundColor: '#fff',
  },
  usernamefieldcontainer:{
    paddingBottom: 25 
  },
  passwordfieldcontainer:{
    paddingBottom: 30 
  },
  form:{
    marginTop:20,
    width: 300,
    height: 400,
  },
  loginbutton:{
    borderRadius: 20,
    borderWidth: 1,
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
