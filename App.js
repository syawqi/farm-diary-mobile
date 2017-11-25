/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,Dimensions } from 'react';
import { BackHandler, Alert } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Content, Header, Container, View, Thumbnail,Spinner } from 'native-base';
import { url } from './app/service/service'
import LoginScreen from './app/auth/login'
import RegisterScreen from './app/auth/register'
class Splashscreen extends Component {
  static navigationOptions = ({ navigation }) => ({
   header : null
  });
  constructor(props){
    super(props)
  }
  componentWillMount(){
     fetch(url , {
        method: 'GET'
     }).then((response)=>{
      console.log(response.status);
        if (response.status == 200) {
          this.props.navigation.navigate('Login')
        }else {
          Alert.alert(
            'Gagal Menyambungkan Jaringan!',
            'Aplikasi sedang mengalami gangguan!',
            [
              {text: 'OK', onPress: () => {
                  BackHandler.exitApp()
              }},
            ],
            { cancelable: false }
          )
        }
     });
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
                <Thumbnail style={{marginBottom : 10}} large source={require('./resource/logo.png')} />
                <Spinner color='white' />
              </View>
          </View>
      </Container>
    );
  }
}

const App = StackNavigator({
  Splash: {
    screen: Splashscreen,
  },
  Login : {
    screen : LoginScreen,
  },
  Register : {
    screen : RegisterScreen,
  }
},{
  mode : 'card'
});

export default App;
