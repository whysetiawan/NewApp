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
import firebase from '../../components/assets/Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

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
			cost: '',
			description: '',
			images: [],
			imagesURL : [],
			user: {},
			uploading: false
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
	}

	Register(){
		this.setState({ uploading: true });
		database.ref('Studio').child(this.state.user.uid).push({
			name: this.state.name,
			address: this.state.address,
			cost: this.state.cost,
			images: this.state.imagesURL,
			description: this.state.description,
		})
	}

	addByGallery(){
		ImagePicker.openPicker({
			multiple: true
		}).then((images) => {
			let urls = []
		for (i in images){
			const image = images[i]
			const path = image.path
			const sessionId = new Date().getTime()
			let uploadBlob = null
			const imageRef = storage.ref('Studio').child(`${this.state.user.uid}/images${[i]} - ${sessionId}`)
			let mime = 'image/jpg'
			fs.readFile(path, 'base64')
			.then((data) => {
				return Blob.build(data, { type: `${mime};BASE64` })
			})
			.then((blob) => {
				uploadBlob = blob
				return imageRef.put(blob, { contentType: mime })
			})
			.then(() => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then((url) => {
				urls.push(url)
				console.log(urls)
				this.setState({
					imagesURL: urls,
					uploading: false
				})
				if (this.state.images === i.length) {
					console.log(this.state.images)
				}
			})
			.catch((e) => {
				console.log(e)
			})
		}
		})
	}

	addByCamera(){
		ImagePicker.openCamera({
			cropping: true
		}).then((images) => {
			console.log(images)
		})
	}

  render() {
  	console.log(this.state.images)
  	console.log(this.state.imagesURL)
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
	  			<Text style={styles.textTitle}> Step 1 </Text>
	  				<View>
	  					<FormLabel>Studio Name</FormLabel>
		      			<FormInput 
					      	onChangeText={(name) => this.setState({name})}
					      	placeholder='Please Enter Your Studio Name'
					      	style={styles.formInput}
					      />

	  					<FormLabel>Address</FormLabel>
				  			<FormInput 
					      	onChangeText={(address) => this.setState({address})}
					      	placeholder='Address'
					      	style={styles.formInput}
					      />

	  					<FormLabel>Cost per Hour</FormLabel>
				  			<FormInput 
					      	onChangeText={(cost) => this.setState({cost})}
					      	placeholder='Cost'
					      	style={styles.formInput}
					      />

		      		<FormLabel>Description</FormLabel>
				  			<FormInput 
					      	onChangeText={(description) => this.setState({description})}
					      	placeholder='Describe your studio'
					      	style={styles.multiFormInput}
					      	multiline={true}
					      	numberOfLines={10}
					      />

		      					<View  style={{flexDirection:'row'}}>
								      <TouchableOpacity
								      	onPress={this.addByGallery.bind(this)}
								      >
		      							<Icon name='md-images' size={30} color='#000000' style={{marginLeft:30, marginRight: 10}}/>
		      						</TouchableOpacity>
		      						<TouchableOpacity
							      		onPress={this.addByCamera.bind(this)}
							      	>
		     							 <Icon name='md-camera' size={30} color='#000000'/>
		     							</TouchableOpacity>
		      					</View>
		      		</View>
		      </View>

		  			<TouchableOpacity
			       	style={styles.button}
			       	onPress={this.Register.bind(this)}
			      >
		        <Text style={styles.buttonText}> {this.state.uploading ? 'Processing..' : 'Register'} </Text>
		      </TouchableOpacity>
		  </ScrollView>
	  </View>
    );
  }
}