/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';

export default class MyComponent extends Component {
  static navigationOptions = ({ navigation }) => ({
    header : null
  });

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={
          <Container style={{backgroundColor : '#fff'}}>

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
            <Text>
              This is Content Section
            </Text>
          </Content>
        </Container>
      </Drawer>

    );
  }
}
