import React, { Component } from 'react';
import {BackHandler, Dimensions, AsyncStorage} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Text, Content, Header, Container, View, Thumbnail, Item, Input, Form, Button, Grid, Col } from 'native-base';
var {height, width} = Dimensions.get('window');

import { api } from '../service/service'
export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
   header : null
  });
  constructor(props){
    BackHandler.addEventListener('hardwareBackPress', function() {
            BackHandler.exitApp()
            return true;
        });
    super(props)

    this.state = {
      username : 'administrator',
      password : 'secret'
    }
  }
  onButtonSubmit(){
    fetch(api + 'auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    }).then((response) => response.json())
    .then((response)=>{
      console.log('response', response);
      if (response.id) {
        AsyncStorage.setItem('loginkey', JSON.stringify(response));
        this.props.navigation.navigate('Dashboard')
      }
    })
  }
  render() {
    return (
      <Container>
          <Header androidStatusBarColor="#258452" style={{display:'none'}}/>
          <View style={{backgroundColor : '#32a96f',    flex: 1,
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',}}>
              <View style={{
                 flex: 1,
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                }}>
                <Thumbnail style={{marginBottom : 10}} large source={require('../../resource/logo.png')} />
                <Text style={{color :'#fff'}}>SIGN IN</Text>
                 <Form style={{marginTop:10, width : width / 1.2}}>
                   <Item regular style={{backgroundColor:'#fff'}}>
                     <Input value={this.state.username} onChangeText={(text)=>this.setState({
                         username : text
                       })} placeholder='Username' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input secureTextEntry = {true} value={this.state.password} onChangeText={(text)=>this.setState({
                         password : text
                       })} placeholder='Password' />
                   </Item>
                     <Grid style={{marginTop: 5 }}>
                      <Col><Text onPress={()=>
                          this.props.navigation.navigate('Register')} style={{color:'#fff', fontSize:14}}>Create new?</Text></Col>
                      <Col style={{alignItems: 'flex-end'}}><Text style={{color:'#fff', fontSize:14}}>Forgot Password?</Text></Col>
                    </Grid>
                   <Button onPress={this.onButtonSubmit.bind(this)} block style={{backgroundColor:'#ffeb3b', marginTop: height / 6 }}>
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
