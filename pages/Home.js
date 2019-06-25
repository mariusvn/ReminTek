import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Image, Modal, TouchableHighlight, View, TextInput, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class HomePage extends Component {
    constructor(a) {
        super(a);
        this.state = {
            modalVisible: false,
            text: '',
            bool: false,
            ModuleList: []
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getModules = () => {
        var modules = [];

        if (this.state.ModuleList.length == 0)
            return ({modules});
        for(let i = 0; this.state.ModuleList && i < this.state.ModuleList.length; i++) {
			modules.push(
                <View>
                    <Text>{this.state.ModuleList[i]}</Text>
                </View>
            );
            console.log(this.state.ModuleList[i]);
        }
        return ({modules});
    }

    AddModule = () => {
        this.setState(state => {
            const moduleList = this.state.ModuleList.concat(state.text);
            for(let i = 0; moduleList && i < moduleList.length; i++) {
                console.log(moduleList[i]);
                console.log(moduleList.length);
            }
            this.getModules();
            return {modalVisible: !this.state.modalVisible, ModuleList: moduleList, text: ''};
        });
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
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
                                <TextInput placeholder={"Module ID"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 180 }} 
                                    onChangeText={(text) => this.setState({text})} value={this.state.text} />
                                <View style={{marginTop: 15, width: '75%'}}>
                                    <Button title="Add Module" color="#5CE59A" accessibilityLabel="Add module to the list of tracked modules" onPress={(this.AddModule)} />
                                </View>
                            </View>
                        </Modal>
                        {/* <Modal animationType={"none"} visible={this.state.bool} transparent={false} onRequestClose={() => {this.setState({bool: true}); }}>
                            <View>
                                <Text>Test</Text>
                            </View>
                        </Modal> */}
                        {this.getModules}
                    </View>
                </LinearGradient>
            </ScrollView>
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



