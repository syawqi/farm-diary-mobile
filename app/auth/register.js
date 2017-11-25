import React, { Component } from 'react';
import {BackHandler, Dimensions} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Text, Content, Header, Container, View, Thumbnail, Item, Input, Form, Button, Grid, Col, Left, Body, Title, Icon, Right, Spinner } from 'native-base';
var {height, width} = Dimensions.get('window');
import { api } from '../service/service'

export default class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
   header : null
  });
  constructor(props){
    super(props)

    this.state = {
      name : '',
      username : '',
      email : '',
      password : '',
      password_confirmation : '',
      phone : '',
      isLoading : false,
      loginstatus : ''
    }
  }
  onButtonSubmit() {
    this.setState({
      isLoading : true
    })
    fetch(api + 'auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        email : this.state.email,
        password: this.state.password,
        password_confirmation : this.state.password_confirmation,
        phone : this.state.phone,
        name : this.state.name
      })
    }).then((respone)=>respone.json())
    .then((response)=>{
      console.log('respone', response);
      if (response.success) {
        fetch('https://api.mainapi.net/smsnotification/1.0.0' + '/messages', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer 351503c313df4eda061925d4a12e9a83'
          },
          body: JSON.stringify({
            msisdn : this.state.phone,
            content : 'Selamat Sdr/i ' + this.state.name + ' Telah Terdaftar Di Farm Diary, Semoga Hari Anda Menyenangkan'
          })
        }).then((response)=> response.json())
        .then((response)=> {
          if (response.status == "SUCCESS") {
            this.setState({
                isLoading : false,
                loginstatus : ''
            })
            this.props.navigation.goBack()
          }
          else {
            this.setState({
                isLoading : false,
                loginstatus : 'Gagal Mengirim Pesan, Tapi Anda Telah Terdaftar'
            })
          }
        })
      }
      else {
        this.setState({
            isLoading : false,
            loginstatus : 'Registrasi gagal!'
        })
      }
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{
           flex: 1,
           flexDirection: 'column',
           justifyContent: 'center',
           alignItems: 'center',
          }}>
          <Spinner color="green" />
        </View>
      )
    }
    return (
      <Container>
          <Header androidStatusBarColor="#258452" style={{backgroundColor:'#32a96f', shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,elevation: 0}}>
            <Left style={{flex: 1}}>
              <Button onPress={()=> this.props.navigation.goBack() } transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
          </Header>
          <View style={{backgroundColor : '#32a96f',    flex: 1,
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',}}>

              <Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>SIGN UP</Text>
              <View style={{
                 flex: 1,
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                }}>
                <Text style={{color:'red'}}>{this.state.loginstatus}</Text>

                 <Form style={{marginTop:10, width : width / 1.2}}>
                 <Item regular style={{backgroundColor:'#fff'}}>
                   <Input onChangeText={(text)=>{
                       this.setState({
                         name : text
                       })
                     }} placeholder='Name' />
                 </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5}}>
                     <Input onChangeText={(text)=>{
                         this.setState({
                           username : text
                         })
                       }} placeholder='Username' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5}}>
                     <Input onChangeText={(text)=>{
                         this.setState({
                           email : text
                         })
                       }} placeholder='email@email.com' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input secureTextEntry = {true} onChangeText={(text)=>{
                         this.setState({
                           password : text
                         })
                       }} placeholder='Password' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input secureTextEntry = {true} onChangeText={(text)=>{
                         this.setState({
                           password_confirmation : text
                         })
                       }} placeholder='Password Confirmation' />
                   </Item>

                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input onChangeText={(text)=>{
                         this.setState({
                           phone : text
                         })
                       }} placeholder='Phone' />
                   </Item>
                   <Button onPress = {this.onButtonSubmit.bind(this)} block style={{backgroundColor:'#ffeb3b', marginTop: 10 }}>
                      <Text style={{color:'#33ac71', fontWeight:'bold'}}>
                        SIGN IN
                      </Text>
                   </Button>
                 </Form>
              </View>
          </View>
      </Container>
    );
  }
}
