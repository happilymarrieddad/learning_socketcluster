var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);

  var app = require('express')();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;
  var env = require('node-env-file');
  env('./.env');
  var mysql = require('mysql');
  var pool = mysql.createPool({
      connectionLimit : 500,
      host            : process.env.DB_HOST,
      user            : process.env.DB_USERNAME,
      password        : process.env.DB_PASSWORD,
      database        : process.env.DB_DATABASE,
      debug           : false
  });

  var crypto = require('crypto');
  var sessions = require('client-sessions');
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');

  app.locals.pretty = true; // This allows for easy reading of the html with the developer tools

  app.set('views', __dirname+'/views');
  app.set('view engine', 'jade');
  app.use(serveStatic(path.resolve(__dirname, 'public')));
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(sessions({
      cookieName: 'session',
      secret: process.env.SESSION_SECRET || "keyboard-cat",
      duration: 1 * 24 * 60 * 60 * 1000  // 1 Day
  }));

  app.use(function(req,res,next) {
    var url = req.url;
    if (req.session.user) {
      if (url == '/session/create') res.redirect('/');
      else next();
    } else {
      if (url == '/session/create' || url == '/session/store') next();
      else {
        req.session.error = 'You must be logged in to access that area.';
        res.redirect('/session/create');
      }
    }
  });

  app.get('/',function(req,res) {
    res.render('index',{
      title:'Home Page',
      id:req.session.user.id,
      first:req.session.user.first,
      last:req.session.user.last
    });
  });

  app.get('/session/create',function(req,res) {
    var error = req.session.error || null;
    var msg = req.session.msg || null;
    delete req.session.error;
    delete req.session.msg;
    res.render('session-create',{
      title:'Login Page',
      error:error,
      msg:msg
    });
  });

  app.post('/session/store',function(req,res) {
    var email = req.body.email;
    var password = crypto.createHash('md5').update(req.body.password).digest('hex');
    pool.query('SELECT * FROM users WHERE email = ?',[email],function(err,rows) {
      if (err) {
        console.log(err);
        req.session.error = 'Failed to get user accounts. Please contact an administrator.';
        res.redirect('back');
      } else {
        if (rows.length) {
          var user = rows[0];
          if (user.password == password) {
            delete user.password;
            delete user.image;
            req.session.user = user;
            res.redirect('/');
          } else {
            req.session.error = 'The password does not match.';
            res.redirect('back');
          }
        } else {
          req.session.error = 'There is no user with that email.';
          res.redirect('back');
        }
      }
    });
  });

  app.get('/session/destroy',function(req,res) {
    req.session.destroy();
    req.session.msg = 'Successfully logged out!';
    res.redirect('/session/create');
  });

  app.get('*',function(req,res) {
    res.redirect('/');
  });

  httpServer.on('request', app);

  var ModelController = require('./controllers/ModelController.js');

  /*
    In here we handle our incoming realtime connections and listen for events.
  */
  scServer.on('connection', function (client) {
    console.log('Client ' + client.id + ' has connected!');

    client.on('messages',function(data) {
      ModelController[data.route][data.resource](client,pool,data);
    });

    client.on('disconnect',function(data) {
      console.log('Client ' + client.id + ' has disconnected');
    });

    client.on('broker',function(data) {
      console.log(data);
    });

  });
};


/*
  NOTES

  crypto.createHash('md5').update('').digest('hex');
*/