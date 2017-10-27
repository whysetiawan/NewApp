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
      key: data.key,
      name: data.name,
      address: data.address,
      cost: data.cost,
      description: data.description
    })
  }

  Edit(){
    const data = this.state
    firebase.database().ref('Studio').child(`${this.state.user.uid}/${this.state.key}`).update({
      name: data.name,
      address: data.address,
      cost: data.cost,
      description: data.description
    })
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    console.log(this.state.user)
    return(
      <View>
        <Header
          backgroundColor='#222'
          centerComponent={{ text: 'Edit Studio', style:{ fontSize:20, fontWeight:'bold', color:'#fff'}}}
        />
          <View style={{ marginTop: 80 }}>
          <ScrollView>
            <FormLabel>Studio Name</FormLabel>
                <FormInput 
                  onChangeText={(name) => this.setState({name})}
                  placeholder='Please Enter Your Studio Name'
                  style={styles.formInput}
                  value={this.state.name}
                />

            <FormLabel>Address</FormLabel>
                <FormInput 
                  onChangeText={(address) => this.setState({address})}
                  placeholder='Address'
                  value={this.state.address}
                  style={styles.formInput}
                />

              <FormLabel>Cost per Hour</FormLabel>
                <FormInput 
                  onChangeText={(cost) => this.setState({cost})}
                  placeholder='Cost'
                  value={this.state.cost}
                  style={styles.formInput}
                />

              <FormLabel>Description</FormLabel>
                <FormInput 
                  onChangeText={(description) => this.setState({description})}
                  placeholder='Describe your studio'
                  value={this.state.description}
                  style={styles.multiFormInput}
                  multiline={true}
                  numberOfLines={10}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.Edit.bind(this)}
                >
                <Text style={styles.buttonText}> {this.state.uploading ? 'Processing..' : 'Save'} </Text>
              </TouchableOpacity>
          </ScrollView>
          </View>
      </View>
    )
  }
}