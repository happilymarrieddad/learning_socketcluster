var SocketCluster = require('socketcluster').SocketCluster;
var numCpus = require('os').cpus().length;
var env = require('node-env-file');
env('./.env');
require('templatizer')(__dirname+'/templates',__dirname+'/public/js/templates.js');

var socketCluster = new SocketCluster({
  workers: numCpus,
  brokers: 1,
  port: process.env.SERVER_PORT || 3000,
  appName: 'sc1',
  workerController: __dirname + '/worker.js',
  brokerController: __dirname + '/broker.js',
  socketChannelLimit: 1000,
  rebootWorkerOnCrash: true
});
