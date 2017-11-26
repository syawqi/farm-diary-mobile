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
    title: 'Pengeluaran',
    headerStyle:{ backgroundColor: '#32a96f'},
    headerTintColor : '#fff',
    headerRight: (
      <Button onPress={() => navigation.navigate('Pengeluaranform')} transparent>
        <Icon name="add" style={{color:'#fff'}}/>
      </Button>
    ),
  });
  constructor(){
    super();
    this.state={
      pengeluaranDetail : []
    }
  }
  componentDidMount(){
    this.getBalance()
  }
  getBalance(){
    AsyncStorage.getItem('loginkey', (err, result) => {
      // console.log();
      let id = JSON.parse(result)
      console.log(id.id);
      fetch(api + 'balance/data', {
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
        // console.log(response);
        this.setState({
          pengeluaranDetail : response.farm.pengeluaran,
        })
      })
    });

  }
  render() {
    return (
      <Container>
          <Content>
            {
              this.state.pengeluaranDetail.map((result, index)=>(
                <Card key={index}>
                  <CardItem>
                    <Text style={{fontWeight:'bold'}}>
                      {result.sumber}
                    </Text>
                  </CardItem>

                  <CardItem>
                    <Text>
                      Total : {result.total}
                    </Text>
                  </CardItem>

                  <CardItem>
                    <Text>
                      Unit : {result.unit}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text>
                      Pengeluaran : {result.pengeluaran}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text>
                      Tanggal : {result.date}
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
