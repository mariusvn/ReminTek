import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '../config/client';
import Notification from 'react-native-android-local-notification';

export default class ConnectPage extends Component {

	constructor(a) {
		super(a);
		this.checkEpitechMail.bind(this);
		this.state = {
			username: '',
			modalShow: true
		};
	}

	checkEpitechMail(mail) {
		return new Promise((resolve, reject) => {
			Notification.create({ message: 'Testing.' }).then(function(notification) {
				console.log(notification);
				console.log(notification.id);
			});
			fetch('http://' + config.server_ip + '/api/user/' + mail, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				}
			}).then((res) => {
				if (res.ok) {
					res.json().then((res) => {
						return resolve(res.exists);
					}).catch((err) => {
						return reject(err);
					});
				}
			}).catch((err) => {
				return reject(err);
			});
		});
	}

    render() {
	    const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
	            <LinearGradient style={{flex: 1, alignItems: "center"}} colors={['#FFC371', '#FF5F6D']}  start={{x: 1.0, y: 0}} end={{x: 0, y: 1.0}}>
                    <Text style={style.mainTitle}>ReminTek</Text>
		            <Text style={style.emailTitle}>Epitech E-mail :</Text>
		            <View style={{flexDirection: 'row', marginTop: 20}}>
			            <View style={{flex: 0.1}}/>
		                <TextInput style={style.input} autoCompleteType={'email'} keyboardType={'email-address'} textAlign={'center'}
		                           value={this.state.username} onChangeText={(username) => {
		                           	this.setState({username: username});
		                }}/>
		                <View style={{flex: 0.1}}/>
		            </View>
		            <View style={{width: '55%', marginTop: 30}}>
						<Button title={"CONNECT"} style={{flex: 0.4, width: 100}} color={'#5CE59A'} onPress={async () => {
							if (await this.checkEpitechMail(this.state.username)) {
								navigate('Home');
							}
						}}/>
		            </View>
		            <View style={{width: '90%'}}>
		                <Text style={style.subTitle}>Don't forget any of your deadlines</Text>
			            <View style={{borderBottomColor: '#fff', borderBottomWidth: 1, borderBottomStyle: 'solid', marginTop: 10}}/>
			            <Text style={style.subsubTitle}>Be notified of all important dates of your projects and modules</Text>
		            </View>
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