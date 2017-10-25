import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './App';
import {Stack} from './components/Router';

class Main extends Component {
	render(){
		return(
			<Stack />
		)
	}
}

AppRegistry.registerComponent('NewApp', () => Main);