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
  ActivityIndicator,
  ScrollView
} from 'react-native';
import styles from '../../components/assets/style';
import firebase from '../../components/assets/Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { 
  Card,
  ListItem,
  Button,
  Header } from 'react-native-elements'

export default class Menu extends Component<{}> {
  constructor(){
    super();
    this.state= {
      user: {},
      loading: true,
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('user').then((data) => {
      let userData = JSON.parse(data)
      this.setState({
        user: userData,
        loading: false
      })
    })
    this.fetchData();
  }

  componentWillUnmount(){
    firebase.database().ref('Studio').off('child_added')
    console.log('unmounted')
  }

  fetchData() {
    var items = []
    firebase.database().ref('Studio').on('child_added', (snap) => {
      snap.forEach((data) => {
        items.push({
          key: data.key,
          name: data.val().name,
          address: data.val().address,
          description: data.val().description,
          cost: data.val().cost,
          images: data.val().images,
          location: data.val().location,
        })
      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loading: false
      })
    })
  }

  renderRow(data){
    return (
        <Card
          title={data.name}
          image={{ uri : data.images[0]}}
          imageStyle= {{ width: 400, height: 200 }}
          >
          <Icon name='md-pricetag' size={14} color='#000000'> <Text style={styles.normalText}> At {data.address} </Text> </Icon>
          <Icon name='md-locate' size={14} color='#000000'> <Text style={styles.normalText}> RP. {data.cost}/Hour </Text> </Icon>
          
          <View key={data.key}>
            <Button
              onPress={() => this.props.navigation.navigate('Detail', {data})}
              icon={{name: 'code'}}
              backgroundColor='#222'
              fontFamily='Lato'
              buttonStyle={{borderRadius: 0, marginTop:10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='DETAIL' />
            </View>
          </Card>
      )
  }

  render() {
    if(this.state.loading){
      return <ActivityIndicator size="large" />
    }
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const { navigate } = this.props.navigation
    return (
        <View>
          <ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Add')}
            >
              <Text style={styles.buttonText}> Register Your Studio Here </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('MyStudio')}
            >
              <Text style={styles.buttonText}> My Studio </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('MyProfile')}
            >
              <Text style={styles.buttonText}> My Profile </Text>
            </TouchableOpacity>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}
              />
          </ScrollView>
        </View>
    );
  }
}