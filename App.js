import React from 'react';
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