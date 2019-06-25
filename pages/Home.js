import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, Modal, TouchableHighlight, View, TextInput, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Notification from 'react-native-android-local-notification';

export default class HomePage extends Component {
    constructor(a) {
        super(a);
        this.state = {
            modalVisible: false,
            text: '',
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
        	<View style={{flex: 1}}>
	            <ScrollView style={{ flex: 1 }}>
	                <LinearGradient style={{ flex: 1, flexDirection: 'row', height: 50 }} colors={['#FFC371', '#FF5F6D']} start={{ x: 1.0, y: 0 }} end={{ x: 0, y: 1.0 }}>
	                    <Text style={style.mainTitle}>
	                        Your next Deadlines
	                    </Text>
	                    <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
	                        <Image source={require('../Assets/plus-symbol.png')} style={{ maxWidth: 25, maxHeight: 25, marginTop: 10 }} />
	                    </TouchableHighlight>
	                    <View>
	                        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}>
	                            <View style={style.popUpModule}>
	                                <TextInput placeholder={"Module ID"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 180 }} onChangeText={(text) => this.setState({ text })} value={this.state.text} />
	                                <View style={{ marginTop: 15, width: '75%' }}>
	                                    <Button title="Add Module" color="#5CE59A" accessibilityLabel="Learn more about this purple button" />
	                                </View>
	                            </View>
	                        </Modal>
	                    </View>
	                </LinearGradient>
	            </ScrollView>
		        <View style={{position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<Button title={"Test notification"} onPress={() => {
						Notification.create({
							message: "Your project OOP_nanotekspice_2018 finish in three days"
						});
					}}/>
		        </View>
	        </View>
        );
    }
}

const style = StyleSheet.create({
    mainTitle: {
        flex: 0.9,
        marginLeft: '10%',
        fontFamily: 'Ubuntu',
        fontSize: 22,
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10
    },
    popUpModule: {
        width: 180,
        height: 200,
        marginTop: 100,
        marginLeft: '25%',
        alignItems: 'center'
    },
    PopUpText: {
        fontFamily: 'Ubuntu',
        fontSize: 22,
        color: '#000000',
        textAlign: 'center'
    }
});



