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
  ScrollView,
  Dimensions
} from 'react-native';
import styles from '../../components/assets/style';
import { FormLabel, FormInput, Header} from 'react-native-elements';
import RNGooglePlaces from 'react-native-google-places';
import firebase from '../../components/assets/Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Progress from 'react-native-progress';

	let { width, height } = Dimensions.get('window');
	const ASPECT_RATIO = width / height;
	const LATITUDE = 0;
	const LONGITUDE = 0;
	const LATITUDE_DELTA = 0.0922;
	const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
				latitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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

	componentDidMount(){
		navigator.geolocation.getCurrentPosition(
      (position) => {
      	this.setState({
      		location: {
      			longitude: position.coords.longitude,
      			latitude: position.coords.latitude,
      		}
      	})
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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
			AsyncStorage.mergeItem('studioData', JSON.stringify({
				location: {
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}
			}))
			this.props.navigation.navigate('Add2')
		})
	}

	openSearchModal() {
    RNGooglePlaces.openPlacePickerModal({
	  latitude: this.state.location.latitude,
	  longitude: this.state.location.longitude,
	  latitudeDelta: LATITUDE_DELTA,
	  longitudeDelta: LONGITUDE_DELTA,
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