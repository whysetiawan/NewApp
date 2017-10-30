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
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  Avatar,
  Card,
  Divider
  } from 'react-native-elements'

export default class MyStudio extends Component<{}> {
  constructor(){
    super();
    this.state = {
      user: {},
      userData: {},
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('user').then((data) => {
      let userData = JSON.parse(data)
      this.setState({ user: userData })
      firebase.database().ref('users').child(userData.uid).on('value', (snap) => {
          this.setState({
            userData: snap.val()
          })
        });
      });
    }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    console.log(this.state.userData)
    const user = this.state.userData;
    const img = this.state.userData.profileimg;
    const avatar = "http://www.nowseethis.org/avatars/default/missing.gif";
    return(
      <View style={styles.container}>
        <Card
        >
          <View style={styles.containerCenter}>
            <Avatar
              xlarge
              rounded
              source={{uri: this.state.userData.profileimg === '' ? avatar : img}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>

            <View style={styles.profileDivider}>
              <Text style={styles.normalText}> Name </Text>
              <Text style={styles.normalText}> {user.name} </Text>
            </View>
          <Divider style={{ height:0.4, backgroundColor: '#222' }} />

          <View style={styles.profileDivider}>
              <Text style={styles.normalText}> Email </Text>
              <Text style={styles.normalText}> {user.email} </Text>
            </View>
          <Divider style={{ height:0.4, backgroundColor: '#222' }} />
        </Card>
      </View>
    )
  }
}