import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomePage from "./pages/Home";
import ConnectPage from "./pages/Connect";

export default class App extends Component {
  render() {
    return (
        <ConnectPage/>
    );
  }
}