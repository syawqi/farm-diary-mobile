/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  Content,
  Container,
  Card,
  CardItem,
  Text,
  Button,
  Icon
} from 'native-base'
import {api} from '../service/service'

export default class Index extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Rencana Penanaman',
    headerStyle:{ backgroundColor: '#32a96f'},
    headerTintColor : '#fff',
    headerRight: (
      <Button onPress={() => navigation.navigate('Rencanaform')} transparent>
        <Icon name="add" style={{color:'#fff'}}/>
      </Button>
    ),
  });
  constructor(){
    super();
    this.state={
      rencana : []
    }
  }
  componentDidMount(){
    this.getRealisasi()
  }
  getRealisasi(){
    AsyncStorage.getItem('loginkey', (err, result) => {
      // console.log();
      let id = JSON.parse(result)
      console.log(id.id);
      fetch(api + 'farm/monev/rencana', {
        method : "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + id.api_token
        },
        body: JSON.stringify({
          id: id.id,
        })
      }).then((response)=> response.json())
      .then((response)=>{
        console.log(response);
        this.setState({
          rencana : response,
        })
      })
    });

  }
  render() {
    return (
      <Container>
          <Content>
            {
              this.state.rencana.map((result, index)=>(
                <Card key={index}>
                  <CardItem>
                    <Text style={{fontWeight:'bold'}}>
                      {result.name}
                    </Text>
                  </CardItem>

                  <CardItem>
                    <Text>
                      Total : {result.total}
                    </Text>
                  </CardItem>

                  <CardItem>
                    <Text>
                      Metode : {result.metode}
                    </Text>
                  </CardItem>

                  <CardItem footer transparent>
                    <Button danger>
                      <Text>Delete</Text>
                    </Button>
                  </CardItem>
                </Card>

              ))
            }
          </Content>
      </Container>
    );
  }
}
