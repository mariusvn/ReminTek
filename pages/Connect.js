import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ConnectPage extends Component {
    render() {
        return (
<<<<<<< Updated upstream
            <View style={{flex: 1}}>
	            <LinearGradient style={{flex: 1, alignItems: "center"}} colors={['#FFC371', '#FF5F6D']}  start={{x: 1.0, y: 0}} end={{x: 0, y: 1.0}}>
                    <Text style={style.mainTitle}>ReminTek</Text>
		            <Text style={style.emailTitle}>Epitech E-mail :</Text>
		            <View style={{flexDirection: 'row', marginTop: 20}}>
			            <View style={{flex: 0.1}}/>
		                <TextInput style={style.input} autoCompleteType={'email'} keyboardType={'email-address'} textAlign={'center'}/>
		                <View style={{flex: 0.1}}/>
		            </View>
		            <View style={{width: '55%', marginTop: 30}}>
						<Button title={"CONNECT"} style={{flex: 0.4, width: 100}} color={'#5CE59A'} onPress={() => {

						}}/>
		            </View>
		            <View style={{width: '90%'}}>
		                <Text style={style.subTitle}>Don't forget any of your deadlines</Text>
			            <View style={{borderBottomColor: '#fff', borderBottomWidth: 1, borderBottomStyle: 'solid', marginTop: 10}}/>
			            <Text style={style.subsubTitle}>Be notified of all important dates of your projects and modules</Text>
		            </View>
	            </LinearGradient>
=======
            <View>
                <Text>ReminTek</Text>        
                <Text>Hello</Text>
>>>>>>> Stashed changes
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
		marginTop: 100,
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: {width: 0, height: 0},
		textShadowRadius: 10
	},
	input: {
		backgroundColor: 'rgba(196,196,196,0.26)',
		flex: 0.8,
		borderRadius: 10,
		color: '#fff',
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: {width: 0, height: 0},
		textShadowRadius: 6,
		fontSize: 18
	},
	subTitle: {
		fontFamily: 'Ubuntu',
		fontWeight: 'bold',
		fontSize: 25,
		color: '#fff',
		marginTop: 40,
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: {width: 0, height: 0},
		textShadowRadius: 10,
		textAlign: 'center'
	},
	subsubTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 15,
		color: '#fff',
		marginTop: 15,
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: {width: 0, height: 0},
		textShadowRadius: 10,
		textAlign: 'center'
	}
});