import React, { Component } from 'react';
import {Text, View,FlatList,StyleSheet,RefreshControl,} from 'react-native';
import{Button,ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class MainMenu extends Component{
 
  static navigationOptions = {  
    header: null
  }
  constructor(props){
    super(props);
    this.state = {
      user_id : '',
      saldo :''
    }
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
logout = async() => {
  await AsyncStorage.clear();
  this.props.navigation.navigate("Login");
}
Topup(){
  this.props.navigation.navigate('TopUp');
}
PLN(){
  this.props.navigation.navigate('Pln');
}
Pulsa(){
  this.props.navigation.navigate('Pulsa');
}
Kuota(){
  this.props.navigation.navigate('Kuota');
}

  render(){
    
    return(
     <View style ={styles.container}>

     <View style={styles.header}>
     <Text style ={styles.title}>Cash On</Text>
     <Button type="solid" title="Logout" style={styles.logout} onPress={this.logout.bind(this)}/>
     </View>
    
     <View style={styles.menu}>
      <Text style={styles.saldo}>
        Saldo
      </Text>
      <Text style={styles.nominal}>
        Rp. 
        <Text>{this.state.saldo}    
      </Text>
      </Text>
      <Button title="Top Up" buttonStyle={styles.topup}
         onPress={this.Topup.bind(this)}/>

      
     </View>

      <View style={styles.row}>
      <Button title="Token PLN" type="outline" onPress={this.PLN.bind(this)} buttonStyle={styles.listbtn}/>
      <Button title="Pulsa" type="outline" onPress={this.Pulsa.bind(this)} buttonStyle={styles.listbtn}/>
      <Button title="Pembelian Kuota" type="outline"  onPress={this.Kuota.bind(this)} buttonStyle={styles.listbtn}/>
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
    backgroundColor: '#F5FCFF',
  },

  header:{
    top:0,
    left:0,
    right:0,
    bottom:20, 
    backgroundColor:'#12a699',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  title:{
    margin:7,
    fontSize:30,
    color:'#ffffff',
  },
  menu:{
    marginTop:1,
    backgroundColor:'#12a699',
    height:150,
  },
  saldo:{
    marginTop:30,
    marginLeft:10,
    color:'#ffffff',
    fontSize:25,
  },
  nominal:{
    margin:5,
    fontSize:20,
    color:'#ffffff',
  },
  topup:{
    marginRight:10,
    alignSelf:"flex-end",
    width:75,
    height:40,
  },
  logout:{
    padding:10,
    alignItems:'center',
    alignSelf:"flex-end",
    backgroundColor:'#12a699',
  },
  listbtn:{
  alignSelf:"center",
  margin:5,
  width:110,
  height:100,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});