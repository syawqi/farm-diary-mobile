/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import { VictoryPie } from "victory-native";
import {SVG} from 'react-native-svg';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, View,Picker, Item  } from 'native-base';
import {api} from '../service/service'
export default class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    header : null
  });
  constructor(props){
    super(props)

    this.state={
      longitude : null,
      latitude : null,
      temp : '',
      location : '',
      wheater : '',
      pengeluaran : 0,
      pemasukan : 0,
      selected2 : "key0",
      pemasukanDetail : [],
      pengeluaranDetail :[]
    }
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  componentDidMount(){
    this.getLocationWheather()
    this.getBalance()
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
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
          pemasukan : response.pendapatan,
          pengeluaran : response.pengeluaran,
          pemasukanDetail : response.farm.pendapatan,
          pengeluaranDetail : response.farm.pengeluaran,
        })
      })
    });

  }
  getLocationWheather(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ this.state.latitude +'&lon='+ this.state.longitude +'&cnt=10&units=metric&appid=584a325fdfde860f2d4b37fd8d367df2', {
          method : "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response)=> response.json())
        .then((response)=>{
          this.setState({
            temp : response.list[0].main.temp,
            wheater : response.list[0].weather[0].main,
            location : response.city.name
          })
        })
      },(error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
  }
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={
          <Container style={{backgroundColor : '#fff'}}>
            <Content>
                  <ImageBackground source={{uri: 'https://img00.deviantart.net/487a/i/2011/039/8/2/morning_vector_by_aleksparx-d3935ul.png'}} style={{height: 160, width: null, flex: 1, flexDirection:'column',justifyContent: 'center',
          alignItems: 'flex-start'}}>
                    <View  style={{marginLeft : 20}}>
                      <Text style={{fontSize:60}}>{this.state.temp}<Text style={{fontSize:20}}>o</Text><Text style={{fontSize:30}}>C</Text></Text>
                      <Text style={{fontSize:20}}>{this.state.wheater}</Text>
                      <Text style={{fontSize:14}}>{this.state.location}</Text>
                    </View>
                  </ImageBackground>
                  <Button onPress={()=>this.props.navigation.navigate('Pemasukan')}block transparent>
                    <Text>Pendapatan</Text>
                  </Button>
                  <Button onPress={()=>this.props.navigation.navigate('Pengeluaran')} block transparent>
                    <Text>Penjualan</Text>
                  </Button>
                  <Button onPress={()=>this.props.navigation.navigate('Rencana')} block transparent>
                    <Text>Rencana Penanaman</Text>
                  </Button>
                  <Button onPress={()=>this.props.navigation.navigate('Realisasi')} block transparent>
                    <Text>Realisasi Penanaman</Text>
                  </Button>
                  <Button block transparent onPress={()=>this.props.navigation.navigate('Profile')}>
                    <Text>Profile</Text>
                  </Button>
                  <Button block transparent onPress={()=>{
                      AsyncStorage.clear()
                      this.props.navigation.navigate('Login')
                    }}>
                    <Text>Logout</Text>
                  </Button>
            </Content>
          </Container>
        }
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header androidStatusBarColor="#258452" style={{backgroundColor:'#32a96f'}}>
            <Left>
              <Button onPress={this.openDrawer.bind(this)} transparent>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title> Farm Diary </Title>
            </Body>
          </Header>
          <Content>
            <Picker
              style={{backgroundColor:'#fff'}}
              mode="dropdown"
              placeholder="Select One"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="Balance" value="key0" />
              <Item label="Pendapatan Detail" value="key1" />
              <Item label="Pemasukan Detail" value="key2" />

            </Picker>

            {
              this.state.selected2 == "key0"
              ?
              <Card>
                <CardItem>
                  <Text header style={{fontWeight:'bold'}}>
                    Pendapatan (In)
                  </Text>
                </CardItem>
                <CardItem>
                  <Text style={{marginLeft:10}}>
                    Rp {this.state.pemasukan}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text header style={{fontWeight:'bold'}}>
                    Pengeluaran (Out)
                  </Text>
                </CardItem>
                <CardItem>
                  <Text style={{marginLeft:10}}>
                    Rp {this.state.pengeluaran}
                  </Text>
                </CardItem>

                <CardItem>
                  <VictoryPie
                    width={350}
                    colorScale={["tomato", "orange"]}
                    data={[
                      { x: "In", y: this.state.pemasukan },
                      { x: "Out", y: this.state.pengeluaran }
                    ]}
                  />
                </CardItem>
              </Card>
              :
              this.state.selected2 == "key1"
              ?

              this.state.pemasukanDetail.map((result, index)=>(
                <Card key={index}>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Sumber
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.sumber}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Total
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.total}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Unit
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.unit}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Pendapatan
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.pendapatan}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Tanggal
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.date}
                    </Text>
                  </CardItem>
                </Card>

              ))
              :
              this.state.selected2 == "key2"
              ?
              this.state.pengeluaranDetail.map((result, index)=>(
                <Card key={index}>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Peruntukan
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.sumber}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Total
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.total}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Unit
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.unit}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Pengeluaran
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.pengeluaran}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text header style={{fontWeight:'bold'}}>
                      Tanggal
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{marginLeft:10}}>
                       {result.date}
                    </Text>
                  </CardItem>
                </Card>

              ))
              :
              null
            }

          </Content>
        </Container>
      </Drawer>

    );
  }
}
