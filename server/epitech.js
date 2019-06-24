const pupeteer = require('puppeteer');
const request = require('request-promise');
const log = require('./logger');

let config = {
	prefix: "https://intra.epitech.eu",
	token: null
};

function getToken() {
	return "user=" + config.token;
}

module.exports = {
	/**
	 * @param autologin
	 * @returns {Promise<*>}
	 */
	connect: async (autologin) => {
		const browser = await pupeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.goto(config.prefix + autologin);
		let cookies = await page.cookies();
		await browser.close();
		for (let i = 0; i < cookies.length; i++) {
			if (cookies[i].name === "user") {
				config.token = cookies[i].value;
				return cookies[i].value;
			}
		}
		throw new Error("Cannot retrieve intranet token");
	},
	/**
	 * @param year
	 * @param module
	 * @param instance
	 * @returns {Promise<undefined|*>}
	 */
	getModule: async (year, module, instance) => {
		let opt = {
			headers: {Cookie: getToken()}
		};
		if (year.type && year.type === "module")
			opt.url = config.prefix + "/module/" + year.year + "/" + year.module + "/" + year.instance + "/?format=json";
		else
			opt.url = config.prefix + "/module/" + year + "/" + module + "/" + instance + "/?format=json";
		let res;
		try {
			res = await request(opt);
			return res;
		} catch (e) {
			return undefined;
		}
	},
	/**
	 * @param year
	 * @param module
	 * @param instance
	 * @param activity
	 */
	getProject: (year, module, instance, activity) => {
		let opt = {
			url: config.prefix + "/module/" + year + "/" + module + "/" + instance + "/" + activity + "/project?format=json",
			headers: {Cookie: getToken()}
		};
		return request(opt);
	},
	/**
	 * @param email
	 * @returns {Promise<boolean>}
	 */
	isUserExists: async (email) => {
		let opt = {
			url: config.prefix + "/user/" + email + "/?format=json",
			headers: {Cookie: getToken()}
		};
		try {
			await request(opt);
			// l'utilisateur c'est marius
			return true;
		} catch (e) {
			try {
				let body = JSON.parse(e.response.body);
				return (body.exception === undefined);
			} catch (e) {
				return false;
			}
		}
	}
};