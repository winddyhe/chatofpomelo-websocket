var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
var abuseFilter = require('./app/servers/chat/filter/abuseFilter');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo-websocket');

// app configuration
app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			heartbeat : 3,
			useDict : true,
			useProtobuf : true
		});
});

app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			useProtobuf : true,
            useDict : true
		});
});

// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);
    app.route('time', routeUtil.time);
	// filter configures
	app.filter(pomelo.timeout());
});

app.configure('production|development', 'chat', function(){
    app.filter(abuseFilter());
});

// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});