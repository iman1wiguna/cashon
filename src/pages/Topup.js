import React, { Component } from 'react';
import {Text,View, StyleSheet} from 'react-native';
import {Button,ListItem,Image,Icon,} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';


const list = [
    {
      name: 'Step 1',
      avatar_url: '../img/indomaret.png',
      item_id:'Masukan Nominal TopUp'
    },
    {
      name: 'Step 2',
      avatar_url: '../img/indomaret.png',
      item_id:'Transfer Uang Ke Nomor Rekening BNI 0485596543'
      
    },
    {
        name: 'Step 3',
        avatar_url: '../img/indomaret.png',
        item_id:'Kirimkan Bukti Transfer ke nomor 0896-9942-8222'
      },
      {
        name: 'Step 4',
        avatar_url: '../img/indomaret.png',
        item_id:'Topup akan diproses oleh admin'
      },
      
      {
        name: 'Perhatian',
        avatar_url: '../img/indomaret.png',
        item_id:'Jam Operasional Admin pada jam 08.00 - 18.00'
      },
  ]


export default class Topup extends Component {
  static navigationOptions = {
   title:'TopUp'
  }

  
Submit = () => {
  fetch('https://cashonkwu.000webhostapp.com/api/v1/permintaan_topup', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       phonenumber : this.state.phone_number,
       nominal : this.state.nominal,
       total : this.state.total,   
       user_id :this.state.user_id,
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
  cekHarga = (value) => {
    if(value === '10000'){
      this.setState({total:10000})
     
    } 
    else if(value === '20000'){
      this.setState({total:20000})
    
      } 
      else if(value === '50000'){
        this.setState({total:50000})
        }
        else if(value === '100000'){
          this.setState({total:100000})
          }
  }

    render() {
      let data = [{
        value: '10000',
      }, {
        value: '20000',
      }, {
        value: '50000',
      },{
        value:'100000'
      }];
        return (
            <View style={styles.container}>
            <View>
            <Text style={styles.text}>
              Saldo Mu Rp.
              <Text>{this.state.saldo}  
              </Text>
            </Text>
            </View>
  {
    list.map((l, i) => (
      <ListItem style={styles.list}
        key={i}
        //  leftAvatar={{ source: {uri: l.avatar_url } }}
        title={l.name}
        subtitle={l.item_id}
        bottomDivider
      />
    ))
  }
  <View style={styles.form}>
  <Dropdown label='Nominal' data={data} 
            onChangeText={value => this.cekHarga(value)}
  
        />
         <Text style={styles.saldo}>
          Total Harga Rp.<Text>{this.state.total}</Text>
        </Text>
            <Button  type='solid' title='Submit' buttonStyle={styles.btnsubmit}
              onPress={this.Submit.bind(this)}
            />
            </View>
</View>
        )
    }
}
const styles = StyleSheet.create({
  container:{
    position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: '#F5FCFF',
      },
  text:{
    top:20,
    fontSize:30,
    justifyContent:'center',
  },
  list:{
    marginBottom:5,
    top:30,
  },
  form:{
    top:40,
    width: 280,
    height: 250,
    alignSelf:"center",
  },
  btnsubmit:{
    marginBottom:10,
    marginTop:50,

  },
  saldo:{
  top:40,
  left:10,

  },
})
