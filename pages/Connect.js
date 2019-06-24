import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ConnectPage extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
	            <LinearGradient style={{flex: 1, alignItems: "center"}} colors={['#FFC371', '#FF5F6D']}  start={{x: 1.0, y: 0}} end={{x: 0, y: 1.0}}>
                    <Text style={style.mainTitle}>ReminTek</Text>
		            <Text style={style.emailTitle}>Epitech E-mail :</Text>
		            <TextInput style={style.input}/>
	            </LinearGradient>
            </View>
        )
    }
}

const style = StyleSheet.create({
	mainTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 36,
		color: '#fff',
		marginTop: 40,
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: {width: 0, height: 0},
		textShadowRadius: 10
	},
	emailTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 18,
		color: '#fff',
		marginTop: 50,
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: {width: 0, height: 0},
		textShadowRadius: 10
	},
	input: {
		backgroundColor: '#C4C4C41E',
		width: ''
	}
});