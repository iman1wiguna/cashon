import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import {Button,Input} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';


  
export default class Pulsa extends Component {
  constructor(props){
    super(props)
    this.state={
      url:'https://cashonkwu.000webhostapp.com/api/v1/buy_pulsa',
      user_id : '',
      saldo :'',
      id_layanan:'',
    }
    
  }
  
  Submit = () => {
    fetch(this.state.url, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         phone_number : this.state.phonenumber,
         id_service : this.state.id_layanan,
         total : this.state.total,   
       })
 
       })
       .then((response) => response.json())
         .then((responseJson) => {
       console.log(responseJson);
           if(responseJson.message == "Success"){
             console.log(responseJson.serve)
              this.props.navigation.navigate('Home');
           }else{
             alert(responseJson.message)
           }
         }).catch((error) => {
           console.error(error);
         });
  
 }

    static navigationOptions = {
        header: null
      }
      
     

  componentDidMount(){
    this.getdatasaldo();
  }

  async getdatasaldo(){
    const user_id = await AsyncStorage.getItem('userid');

    fetch('https://cashonkwu.000webhostapp.com/api/v1/getsaldo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number : user_id,
        })
  
        }).then((response) => response.json())
          .then(async (responseJson) => {
            console.log(responseJson.serve[0].saldo)
           this.setState({saldo:responseJson.serve[0].saldo})
          }).catch((error) => {
            console.log(error);
          });
  }

  cekHarga = (value) => {
    if(value === 'TRI 5000' || value === 'Tsel 5000' || value ==='XL 5000' || value === ' AXIS 5000'){
      if(value ==='TRI 5000'){
        this.setState({id_layanan:64})
      } else if(value ==='Tsel 5000'){
        this.setState({id_layanan:41})
      }else if(value ==='XL 5000'){
        this.setState({id_layanan:69})
      }else{
        this.setState({id_layanan:1})
      }
      this.setState({total:7000})
    } 
  }


    render() {
        let data = [{
            value: 'TRI 5000',
          }, {
            value: 'Tsel 5000',
          }, {
            value: 'XL 5000',
          },{
            value:'AXIS 5000'
          }];
       
        return (
            <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Pembelian Pulsa</Text>
        </View>
        <View style={styles.menu}>
            <Text style={styles.saldo}>
                Saldo mu Rp.<Text>{this.state.saldo}</Text>
            </Text>
        </View>

        <View style={styles.form}>
       
        <Input style={styles.input} keyboardType={'numeric'}   placeholder='Your Number Phone'
            onChangeText={(phonenumber) => this.setState({phonenumber})}
        />

        <Dropdown label='Layanan' data={data} 
            onChangeText={value => this.cekHarga(value)}
        />
        <Text style={styles.saldo}>
          Total Harga Rp.<Text>{this.state.total}</Text>
        </Text>

          <Button  type='solid' title='Submit' onPress={this.Submit.bind(this)} buttonStyle={styles.btnsubmit}
          onPress={this.Submit.bind(this)}
          />
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
RadioButton:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
input:{
    
    paddingBottom:20,

},
menu:{
    height: 120,
    alignSelf:"center",
  },
  form:{
    width: 275,
    height: 250,
    alignSelf:"center",
  },
  btnsubmit:{
    top:40,
  },
})

