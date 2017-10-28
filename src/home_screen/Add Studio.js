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
  ImageBackground,
  AsyncStorage,
  ScrollView
} from 'react-native';
import styles from '../../components/assets/style';
import { FormLabel, FormInput, Header} from 'react-native-elements';
import RNGooglePlaces from 'react-native-google-places';
import firebase from '../../components/assets/Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Progress from 'react-native-progress';

	const Blob = RNFetchBlob.polyfill.Blob
	const fs = RNFetchBlob.fs
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
	window.Blob = Blob

	const database = firebase.database();
	const storage = firebase.storage();

export default class AddStudio extends Component<{}> {
	constructor(){
		super();
		this.state = {
			name: '',
			address: '',
			open: '',
			close: '',
			location: {
				longitude: null,
				latitude: null
			},
		}
	}

	componentWillMount(){
		AsyncStorage.getItem('user').then((data) => {
      let userData = JSON.parse(data)
      console.log(userData)
      this.setState({
      	user: userData
      })
    })
    AsyncStorage.getItem('studioData').then((data) => {
    	console.log(data)
    })
	}

	Next(){
		let studioData = {
			name: this.state.name,
			address: this.state.address,
			location: this.state.location,
			open: this.state.open,
			close: this.state.close,
		}
		AsyncStorage.setItem('studioData', JSON.stringify(studioData)).then(() => {
			this.props.navigation.navigate('Add2')
		})
	}

	addByCamera(){
		ImagePicker.openCamera({
			cropping: true
		}).then((images) => {
			console.log(images)
		})
	}

	 openSearchModal() {
    RNGooglePlaces.openPlacePickerModal({
	  latitude: 53.544389,
	  longitude: -113.490927,
  })
    .then((place) => {
    console.log(place)
    this.setState({
    	address: place.address,
    	location: {
    		longitude: place.longitude,
    		latitude: place.latitude,
    	}
    })
    })
    .catch(error => console.log(error.message));
  }

  render() {
		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
    return (
     <View style={styles.container}>
     	<ScrollView>
     		<Header
     			backgroundColor='#222'
     			centerComponent= {{ text:'Register Studio', style:{ fontSize:20, fontWeight:'bold', color:'#fff'}}}
     		/>
     		<View style={{marginTop: 80}}>
     			<Progress.Bar 
     				progress={0.3} 
     				width={412} 
     				color='#222'
     			/>

	  				<View>
	  					<FormLabel>Studio Name</FormLabel>
		      			<FormInput 
					      	onChangeText={(name) => this.setState({name})}
					      	placeholder='Please Enter Your Studio Name'
					      	style={styles.formInput}
					      />

	  					<FormLabel>Address</FormLabel>
				  			<Text style={{margin:13}} >{this.state.address}</Text>
		      		</View>
		      </View>

		      	<TouchableOpacity
		          style={styles.button}
		          onPress={() => this.openSearchModal()}
		        >
		          <Text style={styles.buttonText} >Pick a Place</Text>
		        </TouchableOpacity>

		  			<TouchableOpacity
			       	style={styles.button}
			       	onPress={this.Next.bind(this)}
			      >
		        <Text style={styles.buttonText}> Next </Text>
		      </TouchableOpacity>
		  </ScrollView>
	  </View>
    );
  }
}