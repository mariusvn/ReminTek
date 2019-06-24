const epitech = require('../epitech');
const log = require('../logger');

module.exports = {
	get: async (req, res) => {
		if (!req.params.email)
			res.sendStatus(400).json({message: "missing parameter(s)"});
		log.info('user ' + req.params.email);
		res.json({"exists": await epitech.isUserExists(req.params.email)});
	}
};