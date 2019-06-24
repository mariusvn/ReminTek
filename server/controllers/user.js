const epitech = require('../epitech');


module.exports = {
	get: async (req, res) => {
		if (!req.params.email)
			res.sendStatus(400).json({message: "missing parameter(s)"});
		res.json({"exists": await epitech.isUserExists(req.params.email)});
	}
};