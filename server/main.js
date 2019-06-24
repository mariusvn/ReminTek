const log = require('./logger');
const express = require('express');
const app = express();
const router = express.Router();
const mainRouter = express.Router();
const epitech = require('./epitech');
const bodyParser = require('body-parser');
const routeManager = require('./routes');

let config;

try {
	config = require('../config/server');
} catch (e) {
	log.error("Cannot read config/server.json");
	process.exit(1);
}

async function run() {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	const port = process.env.PORT || 8080;
	if (await epitech.connect(config.autologin) === undefined) {
		log.error('Cannot connect to intra.epitech.eu');
	} else {
		log.info('Connected to intra.epitech.eu');
	}
	app.use('/api', router);
	app.use('/', mainRouter);
	mainRouter.get('/', (req, res) => {
		res.send('<div style="font-family: \'Roboto\', sans-serif">' +
			'<h2>ReminTek home</h2><br/>' +
			'<p>please use /api/</p>' +
			'</div>');
	});
	router.get('/', (req, res) => {
		res.json({"message": "Hey ! Welcome to ReminTek API !"});
	});
	routeManager(router);
	app.listen(port);
	log.info('Server started on port ' + port);
}
run();