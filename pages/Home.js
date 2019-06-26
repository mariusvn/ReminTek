import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, Modal,
	TouchableHighlight, View, TextInput, Button, AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EpitechManager from '../client/EpitechManager';
import moment from 'moment';
import Notification from 'react-native-android-local-notification';

export default class HomePage extends Component {
    constructor(a) {
        super(a);
        this.state = {
            modalVisible: false,
            textID: 'B-CNA-410',
            textYEAR: '2018',
            textINST: 'MPL-4-1',
            ModuleList: [],
            fetchedModuleList: [],
            fetchedModules: false
        };
        AsyncStorage.getItem('module-list').then((res) => {
        	if (res !== null) {
        		try {
			        this.setState({ModuleList: JSON.parse(res)}, async () => {
				        await this.fetchModule();
			            console.log('Loaded module list');
			        });
		        } catch (e) {
        			console.error(e);
		        }
	        }
        }).catch((err) => {
			console.error(err);
        });
        this.getModules.bind(this);
        this.AddModule.bind(this);
        this.AddModules.bind(this);
        this.fetchModule.bind(this);
        this.setModalVisible.bind(this);
    }

    fetchModule = async () => {
        var temp = [];
        if (this.state.ModuleList.length == 0)
            return (temp);
        let tmpModuleList = [];
        for (let i = 0; i < this.state.ModuleList.length; i++) {
            tmpModuleList = [...tmpModuleList, await EpitechManager.getModule(this.state.ModuleList[i].year, this.state.ModuleList[i].id, this.state.ModuleList[i].instance)];
        }
        this.setState(state => {
            return {fetchedModuleList: tmpModuleList}
        }, () => {
            this.state.fetchedModules = true;
        });
        return {fetchedModuleList: temp};
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getModules = () => {
        var modules = [];

        if (this.state.ModuleList.length == 0)
            return (modules);
        for (let i = 0; this.state.ModuleList && i < this.state.ModuleList.length; i++) {
            if (this.state.fetchedModuleList[i]) {
                var date1 = moment(this.state.fetchedModuleList[i].end);
                var date2 = moment();
                if (date2 < date1)
                    modules.push(<View style={{flex: 1, justifyContent: 'center'}} key={i}><View style={{flex: 1, alignItems: 'center'}}><Text style={style.Module}>{this.state.fetchedModuleList[i].title}</Text><Text style={style.ModuleTimer}>You have {date1.format('D')} days left</Text></View></View>);
                else
                    modules.push(<View style={{flex: 1, justifyContent: 'center'}} key={i}><View style={{flex: 1, alignItems: 'center'}}><Text style={style.Module}>{this.state.fetchedModuleList[i].title}</Text><Text style={style.ModuleTimer}>The module ended {date1.format('D')} days ago</Text></View></View>);

            }
        }
        return (modules);
    };

    AddModule = () => {
        return new Promise(resolve => {
            this.setState(state => {
                return {modalVisible: !this.state.modalVisible, ModuleList: [...this.state.ModuleList, {id: state.textID, instance: state.textINST, year: state.textYEAR}], textID: '', textYEAR: '', textINST: '', fetchedModules: false};
            }, () => {
            	AsyncStorage.setItem('module-list', JSON.stringify(this.state.ModuleList));
                resolve();
            });
        });
    };

    AddModules = async () => {
        await this.AddModule();
        this.fetchModule();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <LinearGradient style={{ flex: 1, flexDirection: 'row', height: "20%" }} colors={['#FFC371', '#FF5F6D']} start={{ x: 1.0, y: 0 }} end={{ x: 0, y: 1.0 }}>
                        <Text style={style.mainTitle}>
                            Your next Deadlines
                        </Text>
                        <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                            <Image source={require('../Assets/plus-symbol.png')} style={{ maxWidth: 25, maxHeight: 25, marginTop: 10 }} />
                        </TouchableHighlight>
                        <View>
                            <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                <View style={style.popUpModule}>
                                    <TextInput placeholder={"Module ID ex: B-CNA-410"} style={{ height: 35, borderColor: 'gray', borderWidth: 1, width: 180, marginBottom: 5 }}
                                        onChangeText={(textID) => this.setState({ textID })} value={this.state.textID} />
                                    <TextInput placeholder={"Year ex: 2018"} style={{ height: 35, borderColor: 'gray', borderWidth: 1, width: 180, marginBottom: 5}}
                                        onChangeText={(textYEAR) => this.setState({ textYEAR })} value={this.state.textYEAR} />
                                    <TextInput placeholder={"Instance ex: MPL-4-1"} style={{ height: 35, borderColor: 'gray', borderWidth: 1, width: 180, marginBottom: 5 }}
                                        onChangeText={(textINST) => this.setState({ textINST })} value={this.state.textINST} />
                                    <View style={{ marginTop: 15, width: '75%' }}>
                                        <Button title="Add Module" color="#5CE59A" accessibilityLabel="Add module to the list of tracked modules" onPress={this.AddModules} />
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </LinearGradient>
                </View>
                <ScrollView style={{ flex: 0.9 }}>
                    {this.getModules()}
                </ScrollView>
	            <View style={{position: 'absolute', bottom: 5, left: 50, right: 50}}>
		            <Button title={"Test notification"} color={'#5CE59A'} onPress={() => {
			            Notification.create({ subject: 'OOP_nanotekspice_2018', message: 'Your project OOP_nanotekspice_2018 finish in 2 days.' });
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
        marginTop: '2%',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10
    },
    popUpModule: {
        width: 215,
        height: 215,
        marginTop: 150,
        paddingTop: 20,
        borderRadius: 10,
        marginLeft: '25%',
        alignItems: 'center',
        backgroundColor: 'rgba(216,216,216,0.9)'
    },
    PopUpText: {
        fontFamily: 'Ubuntu',
        fontSize: 22,
        color: '#000000',
        textAlign: 'center'
    },
    Module: {
        fontFamily: 'Ubuntu',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 16,
        marginTop: 10
    },
    ModuleTimer: {
        fontFamily: 'Ubuntu',
        fontSize: 16,
        lineHeight: 16,
        color: '#000000',
        marginBottom: 15
    },
    ModuleLabel: {

    }
});



