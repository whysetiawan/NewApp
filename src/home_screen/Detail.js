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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { 
  Card,
  ListItem,
  Button,
  Header,
  FormInput } from 'react-native-elements'

export default class Detail extends Component<{}> {
  constructor(){
    super();
    this.state = {
      data:{},
      user: [],
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      }
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
    this.setState({
      data: data,
      region: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        latitudeDelta: data.location.latitudeDelta,
        longitudeDelta: data.location.longitudeDelta,
      }
    })
  }
  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const items = this.state.data;
    return(
      <ScrollView>
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
          <Card>
            <View style={styles.map}>
              <MapView
                provider={ PROVIDER_GOOGLE }
                style={ styles.container }
                showsUserLocation={ true }
                region={ this.state.region }
              >
              <MapView.Marker
                coordinate={ this.state.region }
              />
              </MapView>
            </View>
          </Card>
            <View style={{flexDirection:'row', paddingTop:10}}>
              <Text style={styles.normalText} > Number of Hours </Text>
              <FormInput
              />
            </View>
              <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Book')}
              >
              <Text style={styles.buttonText}> Book Studio </Text>
            </TouchableOpacity>
        </Card>
      </View>
      </ScrollView>
    )
  }
}