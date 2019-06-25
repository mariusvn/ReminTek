import React from 'react';
import config from "../config/client";
import {AsyncStorage} from "react-native";

export default new class EpitechManager {
	constructor() {

	}


	async isUserExists(email) {
		try {
			const req = await fetch('http://' + config.server_ip + '/api/user/' + email, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				}
			});
			if (req.ok) {
				let data = await req.json();
				return data.exists;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}