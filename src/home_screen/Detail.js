import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ListView,
  ActivityIndicator
} from 'react-native';
import styles from '../../components/assets/style';
import firebase from '../../components/assets/Firebase';
import { 
  Card,
  ListItem,
  Button,
  Header } from 'react-native-elements'

export default class Detail extends Component<{}> {
  constructor(){
    super();
    this.state = {
      data:{},
      user: []
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('user').then((data) => {
        let userData = JSON.parse(data)
        this.setState({
            user: userData,
        })
    })
    let { params } = this.props.navigation.state;
    const data = params.data;
    console.log(data)
    this.setState({
      data: data
    })
  }
  render(){
    const items = this.state.data
    return(
      <View>
        <Card
          title={items.name}
          >
          <Image
            style={{width:400, height:200,marginBottom:10}}
            source={{uri:items.images[0]}} 
          />
          <View style={{flexDirection: 'row' ,justifyContent: 'space-between'}}>
          <Text style={styles.normalText}> At {items.address} </Text>
          <Text style={styles.normalText}> RP. {items.cost}/Hour </Text>
          </View>
          <Card>
            <Text style={styles.normalText}> {items.description} </Text>
          </Card>
        </Card>
      </View>
    )
  }
}