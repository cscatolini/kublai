var pomelo = require('pomelo');

var kublaiPlugin = require('../../index.js');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'sandbox');

var redisPort = process.env.POMELO_REDIS_PORT || 3434;

// configure monitor
app.configure('production|development', function(){
  app.set('monitorConfig',
    {
      monitor : pomelo.monitors.redismonitor,
      servers: '127.0.0.1:3334',
      redisNodes: {
        host: "127.0.0.1",
        port: redisPort,
      },
      redisOpts: {
        keyPrefix: "kublai_test",
        showFriendlyErrorStack: true,
      },
    }
  )
});

// app configuration
app.configure('production|development', 'metagame', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });

  app.use(kublaiPlugin, {
    kublai: {
      khanUrl: 'http://localhost:8888/'
    }
  })
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
