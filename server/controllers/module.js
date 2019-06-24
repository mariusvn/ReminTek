const epitech = require('../epitech');


module.exports = {
	get: async (req, res) => {
		if (!req.params.year || !req.params.module || !req.params.instance)
			res.sendStatus(400).json({message: "missing parameter(s)"});
		res.json(JSON.parse(await epitech.getModule(req.params.year, req.params.module, req.params.instance)));
	}
};