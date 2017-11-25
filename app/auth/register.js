import React, { Component } from 'react';
import {BackHandler, Dimensions} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Text, Content, Header, Container, View, Thumbnail, Item, Input, Form, Button, Grid, Col, Left, Body, Title, Icon, Right } from 'native-base';
var {height, width} = Dimensions.get('window');
export default class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
   header : null
  });
  constructor(props){
    super(props)
  }
  render() {
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
                 <Form style={{marginTop:10, width : width / 1.2}}>
                 <Item regular style={{backgroundColor:'#fff'}}>
                   <Input placeholder='Name' />
                 </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5}}>
                     <Input placeholder='Username' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5}}>
                     <Input placeholder='email@email.com' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input placeholder='Password' />
                   </Item>
                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input placeholder='Password Confirmation' />
                   </Item>

                   <Item regular style={{backgroundColor:'#fff', marginTop: 5 }}>
                     <Input placeholder='Phone' />
                   </Item>
                   <Button block style={{backgroundColor:'#ffeb3b', marginTop: 10 }}>
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
