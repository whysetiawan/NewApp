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
  Card,
  ListItem,
  Button,
  Header } from 'react-native-elements'

export default class MyStudio extends Component<{}> {
  constructor(){
    super();
    this.state = {
      user: {},
      data: [],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('user').then((data) => {
      let userData = JSON.parse(data)
      this.setState({ user: userData })
      firebase.database().ref('Studio').child(userData.uid).on('value', (snap) => {
        snap.forEach((data) => {
          console.log(data.val().address)
          this.state.data.push({
            key: data.key,
            name: data.val().name,
            address: data.val().address,
            images: data.val().images,
            description: data.val().description,
            cost: data.val().cost
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.data)
          })
        });
      });
    });
  }

  renderRow(data){
    console.log(data.images)
    return (
        <Card
          title={data.name}
          image={{ uri : data.images[0]}}
          imageStyle= {{ width: 400, height: 200 }}
          >
          <View key={data.key}>
            <Button
              onPress={() => this.props.navigation.navigate('EditStudio', {data})}
              icon={{name: 'code'}}
              backgroundColor='#222'
              fontFamily='Lato'
              buttonStyle={{borderRadius: 0, marginTop:10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='EDIT STUDIO' />

            <Button
              onPress={() => this.props.navigation.navigate('Schedule', {data})}
              icon={{name: 'code'}}
              backgroundColor='#222'
              fontFamily='Lato'
              buttonStyle={{borderRadius: 0, marginTop:10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='UPDATE SCHEDULE' />

            </View>
          </Card>
      )
  }

  render(){
    console.log(this.state.dataSource)
    return(
      <View>
        <Header
          backgroundColor='#222'
          centerComponent={{ text: 'My Studio', style:{ fontSize:20, fontWeight:'bold', color:'#fff'}}}
        />
          <View style={{ marginTop: 80 }}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}
              />
          </View>
      </View>
    )
  }
}