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
      name: '',
      address: '',
      cost: '',
      description: '',
      date: '',

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
      name: data.name,
      address: data.address,
      cost: data.cost,
      description: data.description
    })
  }

  Update(){

  }

  render(){
    console.log(this.state.user)
    return(
      <View>
        <Header
          backgroundColor='#222'
          centerComponent={{ text: 'Edit Studio', style:{ fontSize:20, fontWeight:'bold', color:'#fff'}}}
        />
          <View style={{ marginTop: 80 }}>
          <FormLabel> Date </FormLabel>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="date"
                  placeholder="SELECT DATE"
                  format="YYYY-MM-DD"
                  minDate="2017-01-01"
                  maxDate="2017-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />

          </View>
      </View>
    )
  }
}