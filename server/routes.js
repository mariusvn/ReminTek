const moduleCtrl = require('./controllers/module');
const userCtrl = require('./controllers/user');


module.exports = (router) => {
	router.get('/module/:year/:module/:instance', moduleCtrl.get);
	router.get('/user/:email', userCtrl.get);
};