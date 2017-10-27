import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../components/assets/style';
import { FormLabel, FormInput} from 'react-native-elements'
import firebase from '../components/assets/Firebase';

export default class App extends Component<{}> {
	constructor(){
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
		}
	}

	Register(){
		const auth = firebase.auth();
		const database = firebase.database();
		auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then((user) => {
			database.ref(`users/${user.uid}`).set({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			})
				user.updateProfile({
					displayName: this.state.name,
				})
				user.sendEmailVerification();
				alert("Succes Register, Check Your Email For Verification")
				this.props.navigation.navigate('Login')
		})
		.catch((e) => {
			alert(e);
		})
	}


  render() {
  	console.ignoredYellowBox = ['Remote debugger'];
	console.ignoredYellowBox = ['Setting a timer'];
  	const {navigate} = this.props.navigation;
    return (
    	<View style={styles.container}>
      	<Text style={styles.textTitle}> Register </Text>
      	<View>

      	<FormLabel>Name</FormLabel>
      	<FormInput 
      		onChangeText={(name) => this.setState({name})}
      		placeholder='Please Enter Your Name'
      		style={styles.formInput}
      		/>

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
		        	onPress={this.Register.bind(this)}
		        >
		        <Text style={styles.buttonText}> Register </Text>
		      </TouchableOpacity>
    	</View>
    );
  }
}