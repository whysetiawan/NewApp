/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import styles from '../../components/assets/style';
import { FormLabel, FormInput} from 'react-native-elements';
import firebase from '../../components/assets/Firebase';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AddStudio extends Component<{}> {
	constructor(){
		super();
		this.state = {
			name: '',
			address: '',
			password: '',
		}
	}

	Register(){
		const auth = firebase.auth();
		const database = firebase.database();
	}

  render() {
		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
    return (
     <View style={styles.container}>
	  			<Text style={styles.textTitle}> Register Studio </Text>
	  			<View>
	  			<FormLabel>Studio Name</FormLabel>
		      <FormInput 
		      	onChangeText={(name) => this.setState({name})}
		      	placeholder='Please Enter Your Studio Name'
		      	style={styles.formInput}
		      	/>

	  			<FormLabel>Address</FormLabel>
	  			<FormInput 
		      	onChangeText={(email) => this.setState({email})}
		      	placeholder='Address'
		      	style={styles.formInput}
		      	/>

	  			<FormLabel>Cost per Hour</FormLabel>
	  			<FormInput 
		      		onChangeText={(email) => this.setState({email})}
		      		placeholder='Cost'
		      		style={styles.formInput}
		      		/>
		      </View>
		      <Icon name='md-images' size={30} color='#000000'> 
		      </Icon>
	  			<TouchableOpacity
		        	style={styles.button}
		        	onPress={this.Register.bind(this)}
		        >
		        <Text style={styles.buttonText}> Register </Text>
		      </TouchableOpacity>
	  </View>
    );
  }
}