var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.chat = function(session, msg, app, cb) {
	var chatServers = app.getServersByType('chat');

	if(!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}
    
	var res = dispatcher.dispatch(1, chatServers);

	cb(null, res.id);
};

exp.time = function(session, msg, app, cb) {
    var timeServers = app.getServersByType('time');
    
    if(!timeServers || timeServers.length === 0) {
		cb(new Error('can not find time servers.'));
		return;
	}
    
    //console.log("----Time Server ID: " + session);
    
    var res = dispatcher.dispatch(session, timeServers);
    
    cb(null, res.id);
};