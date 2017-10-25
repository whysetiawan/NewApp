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
  AsyncStorage
} from 'react-native';
import styles from '../../components/assets/style';
import { FormLabel, FormInput} from 'react-native-elements';
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
			images: [],
			imagesURL : [],
			user: {}
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
		let urls = []
		for (i in this.state.images){
			const image = this.state.images[i]
			const path = image.path
			let uploadBlob = null
			const imageRef = storage.ref('Products').child(`${this.state.user.uid}/images${[i]}`)
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
				alert('Uploaded')
				urls.push(url)
				console.log(urls)
				this.setState({
					imagesURL: urls
				})
			})
			.catch((e) => {
				console.log(e)
			})
		}
			database.ref('Studio').child(`${this.state.user.uid}`).push({
			name: this.state.name,
			address: this.state.address,
			cost: this.state.cost,
			images0: this.state.imagesURL[0],
			images1: this.state.imagesURL[1],
			images2: this.state.imagesURL[2],
			images3: this.state.imagesURL[3],
			images4: this.state.imagesURL[4],
		})
		.catch((e) => {
			console.log(e)
		})
	}

	addByGallery(){
		ImagePicker.openPicker({
			multiple: true
		}).then((images) => {
			this.setState({
				images: images
			})
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
	  			<Text style={styles.textTitle}> Register Studio </Text>
	  			<View style={styles.bodyRegister}>
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
		      <View  style={{flexDirection:'row'}}>
		      <TouchableOpacity
		      	onPress={this.addByGallery.bind(this)}
		      	>
		      <Icon name='md-images' size={30} color='#000000' style={{marginLeft:30, marginRight: 10}}>
		      </Icon>
		      </TouchableOpacity>
		      <TouchableOpacity
		      	onPress={this.addByCamera.bind(this)}
		      	>
		      <Icon name='md-camera' size={30} color='#000000'> </Icon>
		      </TouchableOpacity>
		      </View>

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