import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import styles from '../../components/assets/style';
import firebase from '../../components/assets/Firebase'

export default class App extends Component<{}> {

  componentWillMount(){
    AsyncStorage.getItem('user').then((data) => {
      let userData = JSON.parse(data)
      console.log(userData)
    })
  }

  render() {
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const { navigate } = this.props.navigation
    return (
          <View style={styles.mainIndex}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Add')}
            >
              <Text style={styles.buttonText}> Register Your Studio Here </Text>
            </TouchableOpacity>
          </View>
    );
  }
}