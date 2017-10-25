import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import styles from '../components/assets/style';
import { FormLabel, FormInput} from 'react-native-elements'
import firebase from '../components/assets/Firebase'

export default class App extends Component<{}> {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
		}
	}

	Login(){
		const auth = firebase.auth();
		const database = firebase.database();
		auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
			AsyncStorage.setItem('user', JSON.stringify(user), (user) => {
				console.log(user)
			})
			alert('Succes Sign In')
			this.props.navigation.navigate('Menu')
		})
		.catch((e) => {
			alert(e)
		})
	}

  render() {
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
  	const {navigate} = this.props.navigation;
    return (
    	<View style={styles.container}>
      	<Text style={styles.textTitle}> Login </Text>
      	<View>

      	<FormLabel>Email</FormLabel>
      	<FormInput 
      		onChangeText={(email) => this.setState({email})}
      		placeholder='Please Enter Your Email'
      		style={styles.formInput}
      		/>

      	<FormLabel>Password</FormLabel>
      	<FormInput 
      		onChangeText={(password) => this.setState({password})}
      		placeholder='Please Enter Your Password'
      		style={styles.formInput}
      		secureTextEntry
      		/>

      	</View>      	

      		<TouchableOpacity
		        	style={styles.button}
		        	onPress={this.Login.bind(this)}
		        >
		        <Text style={styles.buttonText}> Login </Text>
		      </TouchableOpacity>
    	</View>
    );
  }
}