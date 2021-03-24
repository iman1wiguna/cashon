import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import {Button,Input,} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';



export default class Pln extends Component {
constructor(props){
  super(props)
  this.state={
  
    url:'https://cashonkwu.000webhostapp.com/api/v1/buy_token',
    user_id : '',
    saldo :''
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
       notoken : this.state.notoken,
       nominal : this.state.nominal,
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
    if(value === 'Voucher PLN 20000'){
      this.setState({total:23000})
      this.setState({id_layanan:1})
    } 
    else if(value === 'Voucher PLN 50000'){
      this.setState({total:53000})
      this.setState({id_layanan:2})
      } 
      else if(value === 'Voucher PLN 100000'){
        this.setState({total:103000})
        this.setState({id_layanan:3})
        }
  }
    render() {

        let data = [{
            value: 'Voucher PLN 20000',
          }, {
            value: 'Voucher PLN 50000',
          }, {
            value: 'Voucher PLN 100000',
          }];
       
        return (
            <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Pembelian Voucher Token PLN</Text>
        </View>
        <View style={styles.menu}>
            <Text style={styles.saldo}>
                Saldo mu Rp.<Text>{this.state.saldo}</Text>
            </Text>
        </View>

        <View style={styles.form}>
        <Input style={styles.input} keyboardType={'numeric'}   placeholder='No Handphone'
                onChangeText={(phone_number) => this.setState({phone_number})}
            />
          <Input style={styles.input} keyboardType={'numeric'}   placeholder='No. Token'
                onChangeText={(notoken) => this.setState({notoken})}/>


       <Dropdown label='Layanan' data={data} 
           onChangeText={value => this.cekHarga(value)}
        />
        <Text style={styles.saldo}>
          Total Harga Rp.<Text>{this.state.total}</Text>
        </Text>
        
        <Button  type='solid' title='Submit' onPress={this.Submit.bind(this)} buttonStyle={styles.btnsubmit}/>
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
    paddingBottom:50,
    alignSelf:"center",
    paddingLeft:10,
    paddingRight:10,
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
  RadioButton:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

