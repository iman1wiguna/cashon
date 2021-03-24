import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import {Button,Input,} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

  
export default class FormTopUp extends Component {

  Submit = () => {
     fetch('http://192.168.0.1:8000/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number : this.state.notoken,
          security_code : this.state.securitycode,      
        })
  
        }).then((response) => response.json())
          .then((responseJson) => {
        
            if(responseJson.message == "Berhasil"){
              this.setUser(responseJson.token)
            }else{
              alert(responseJson.message)
            }
          }).catch((error) => {
            console.error(error);
          });
    this.props.navigation.navigate('Home');
  }
    static navigationOptions = {
        header: null
      }
      
    render() {

       
       
        return (
            <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Penambahan Saldo</Text>
        </View>

        <View style={styles.form}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
          <Input style={styles.input} keyboardType={'numeric'}   placeholder='Nominal Topup'
                onChangeText={(saldo) => this.setState({saldo})}/>
        
        <Button  type='solid' title='Submit' onPress={this.Submit.bind(this)} buttonStyle={styles.btnsubmit} disabled={true}/>
        </View>

        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: '#F5FCFF',
      },
header:{
    top:0,
    left:0,
    right:0,
    bottom:20, 
    backgroundColor:'#12a699',
    height:60,
},
title:{
    fontSize:20,
    color:"#ffffff",
    top:15,
    left:10,
    right:0,
    bottom:0, 
},
saldo:{
    fontSize:20,
    textAlign:"center",
    top:10,
    
},
input:{
    
    paddingBottom:20,

},
menu:{
    height: 120,
    alignSelf:"center",
  },
  form:{
    marginTop:100,
    width: 275,
    height: 400,
    alignSelf:"center",
  },
  btnsubmit:{
    top:40,
  },
  RadioButton:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

