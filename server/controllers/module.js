const epitech = require('../epitech');


module.exports = {
	get: async (req, res) => {
		if (!req.params.year || !req.params.module || !req.params.instance)
			res.sendStatus(400).json({message: "missing parameter(s)"});
		try {
			res.json(JSON.parse(await epitech.getModule(req.params.year, req.params.module, req.params.instance)));
		} catch (e) {
			res.json({
				title: req.params.module + " doesn't exists",
				end: new Date().toISOString()
			})
		}
	}
};