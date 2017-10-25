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

export default class App extends Component<{}> {
	componentWillMount(){
		this.props.navigation.navigate('Add')
	}
  render() {
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
  	const {navigate} = this.props.navigation;
    return (
    	<View style={styles.container}>
      	<ImageBackground
	        style={styles.imgIndex}
	        source={{uri : 'https://www-media-presonus.netdna-ssl.com/uploads/studioone/media/images/studio_one_no_limits.png'}}
	      >
	      	<Text style={styles.textIndex}> Welcome ! </Text>
	      		<View style={styles.mainIndex}>
		        <TouchableOpacity
		        	style={styles.button}
		        	onPress={() => navigate('Login')}
		        >
		        	<Text style={styles.buttonText}> Login </Text>
		        </TouchableOpacity>

		        <TouchableOpacity
		        	style={styles.button}
		        	onPress={() => navigate('Register')}
		        >
		        	<Text style={styles.buttonText}> Register </Text>
		        </TouchableOpacity>

		        </View>
	      </ImageBackground>
    	</View>
    );
  }
}