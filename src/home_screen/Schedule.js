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
  ScrollView,
  ActivityIndicator
} from 'react-native';
import styles from '../../components/assets/style';
import firebase from '../../components/assets/Firebase';
import DatePicker from 'react-native-datepicker'
import { 
  Card,
  ListItem,
  Button,
  Header,
  FormLabel,
  FormInput } from 'react-native-elements'

export default class EditStudio extends Component<{}> {
  constructor(){
    super();
    this.state = {
      user: {},
      key: '',
      name: '',
      address: '',
      cost: '',
      description: '',
      date: '',
      time: '',

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
    console.log(data.key)
    this.setState({
    	key: data.key,
      name: data.name,
      address: data.address,
      cost: data.cost,
      description: data.description
    })
  }

  Update(){
  	const date = new Date(this.state.data)
  	firebase.database().ref('Studio').child(`${this.state.user.uid}/${this.state.key}/`).update({
  		schedule: date
  	})
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <View>
        <Header
          backgroundColor='#222'
          centerComponent={{ text: 'Update Schedule', style:{ fontSize:20, fontWeight:'bold', color:'#fff'}}}
        />
          <View style={{ marginTop: 80 }}>
				      <View style={{flexDirection:'row'}}>
		          	<DatePicker
				          style={{width: 150, margin:10}}
				          date={this.state.date}
				          mode="date"
				          placeholder="Select Date"
				          format="YYYY/MM/DD"
				          minDate="2017-01-01"
				          maxDate="2018-12-31"
				          onDateChange={(date) => {this.setState({date: date});}}
				        />
				        
				        </View>
				        <Text>
				        	{this.state.time}
				        </Text>
				        <Text>
				        	{this.state.date}
				        </Text>
				        <TouchableOpacity
                  style={styles.button}
                  onPress={this.Update.bind(this)}
                >
                <Text style={styles.buttonText}> Update </Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
}