import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomePage from "./pages/Home";
import ConnectPage from "./pages/Connect";
import {createStackNavigator, createAppContainer} from 'react-navigation';


const MainNavigator = createStackNavigator({
	Connect: {screen: ConnectPage},
	Home: {screen: HomePage}
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	});

const App = createAppContainer(MainNavigator);

export default App;