/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  Content,
  Container,
  Header,
  Card,
  CardItem,
  Body,
  Text,
  Item,
  Input,
  Button
} from 'native-base'
import { api } from '../service/service'
export default class Index extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle:{ backgroundColor: '#32a96f'},
    headerTintColor : '#fff'
  }
  constructor(){
    super()

    this.state = {
      name : '',
      email : '',
      username : '',
      phone : '',

      farmName : '',
      lenght : 0,
      wide : 0
    }
  }
  componentDidMount(){
    this.getProfile()
  }
  getProfile(){
    AsyncStorage.getItem('loginkey', (err, result) => {
      let id  = JSON.parse(result)
      fetch(api + 'profile' , {
        method : "POST",
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + id.api_token
        },
        body : JSON.stringify({
          id : id.id
        })
      }).then((response)=> response.json())
      .then((response)=>{
        // console.log(response);
        this.setState({
          name : response.user.name,
          email : response.user.email,
          username : response.user.username,
          phone : response.user.phone,

          farmName : response.farm.name,
          lenght : response.farm.lenght,
          wide : response.farm.wide
        })
      })
    })

  }

  onButtonSubmit(){
    AsyncStorage.getItem('loginkey', (err, result) => {
      let id  = JSON.parse(result)
      fetch(api + 'profile/'+id.id , {
        method : "POST",
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + id.api_token
        },
        body : JSON.stringify({
          name : this.state.name,
          email : this.state.email,
          phone : this.state.phone,
          username : this.state.username,
          farName : this.state.farmName,
          lenght : this.state.lenght,
          wide : this.state.wide
        })
      }).then((response)=> response.json())
      .then((response)=>{
          this.props.navigation.goBack()
      })
    })
  }
  render() {
    return (
      <Container>
          <Content>
            <Card>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Nama
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input placeholder='Nama' onChangeText={(text) => this.setState({
                      name : text
                    })} value={this.state.name} />
                </Item>
              </CardItem>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Username
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input onChangeText={(text) => this.setState({
                      username : text
                    })} disabled placeholder='username' value={this.state.username}/>
                </Item>
              </CardItem>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Email
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input disabled onChangeText={(text) => this.setState({
                      email : text
                    })} placeholder='Email' value={this.state.email}/>
                </Item>
              </CardItem>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Nomor Telepon
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input onChangeText={(text) => this.setState({
                      phone : text
                    })} placeholder='Nomor Telepon' value={this.state.phone} />
                </Item>
              </CardItem>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Nama Perkebunan
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input onChangeText={(text) => this.setState({
                      farName : text
                    })} placeholder='Nama Perkebunan'  value ={this.state.farmName}/>
                </Item>
              </CardItem>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Panjang
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input onChangeText={(text) => this.setState({
                      lenght : text
                    })} placeholder='100' value={this.state.lenght.toString()} />
                </Item>
              </CardItem>
              <CardItem>
                <Text header style={{fontWeight:'bold'}}>
                  Lebar
                </Text>
              </CardItem>
              <CardItem>
                <Item regular>
                  <Input onChangeText={(text) => this.setState({
                      wide : text
                    })} placeholder='100' value={this.state.wide.toString()}/>
                </Item>
              </CardItem>
              <CardItem>
                <Button onPress={this.onButtonSubmit.bind(this)} block>
                  <Text>
                    Simpan
                  </Text>
                </Button>
              </CardItem>
            </Card>


          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
