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

export default class Detail extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Realisasi Detail',
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
      realisasiDetail : []
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
      fetch(api + 'farm/monev/realisasi/'+this.props.navigation.state.params.id, {
        method : "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + id.api_token
        }
      }).then((response)=> response.json())
      .then((response)=>{
        // console.log(response);
        this.setState({
          realisasiDetail : response,
        })
      })
    });

  }
  render() {
    return (
      <Container>
          <Content>
            {
              this.state.realisasiDetail.map((result, index)=>(
                <Card key={index} onPress={()=>{

                  }}>
                  <CardItem>
                    <Text style={{fontWeight:'bold'}}>
                      Minggu ke - {result.week}
                    </Text>
                  </CardItem>

                  <CardItem>
                    <Text>
                      Tanggal : {result.date}
                    </Text>
                  </CardItem>

                  <CardItem>
                    <Text>
                      Value : {result.value}
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
