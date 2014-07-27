'use strict';

var db = require('redis').createClient();
var crypto = require('crypto');
var _ = require('underscore');

module.exports = function(router) {

  router.get('/', function(req, res, next) {
    db.HVALS('IH_MESSAGES', function(err, messages) {
      if(err) {
        console.log('HGETALL GET /message ' + err);
      }

      messages = messages.map(function(msg, index) {
        msg = JSON.parse(msg);
        msg.resource = 'http://' + req.headers.host + '/message/' + msg._id;
        return msg;
      });

      res.json(messages);
    });
  });

  router.post('/', function(req, res, next) {
    var body, uid, entry = {};

    body = req.body;

    uid = crypto.randomBytes(12).toString('hex');

    entry._id = uid;
    entry.to = body.to;
    entry.from = body.from;
    entry.text = body.text;
    entry.img = body.img;

    db.HSETNX('IH_MESSAGES', uid, JSON.stringify(entry), function(err) {
      if(err) {
        console.log('HSETNX POST /message ' + err);
      }

      res.json(entry);
    });
  });

  router({ name: 'messages', path: '/:id'})
    .get(function(req, res, next) {
      var uid;

      uid = req.params.id;

      db.HGET('IH_MESSAGES', uid, function(err, message) {
        if(err) {
          console.log('HGET GET /message/:id ' + err);
        }

        message = JSON.parse(message);
        message.resource = 'http://' + req.headers.host + '/message/' + uid;
        res.json(message);
      });
    })

    .put(function(req, res, next) {
      var uid, body, validKeys, newEntry;

      uid = req.params.id;
      body = req.body;

      validKeys = ['to', 'from', 'text', 'img'];

      db.HGET('IH_MESSAGES', uid, function(err, message) {
        message = JSON.parse(message);

        Object.keys(body).forEach(function(key, index) {
          if(_.contains(validKeys, key)) {
            message[key] = body[key]
          } else {
            console.log('Invalid Property Name: ' + key);
          }
        });

        newEntry = message;

        db.HSET('IH_MESSAGES', uid, JSON.stringify(newEntry), function(err) {
          if(err) {
            console.log('HSET PUT /message/:id ' + err);
          }

          res.json(newEntry);
        });
      });
    })

    .delete(function(req, res, next) {
      var uid;

      uid = req.params.id;

      db.HDEL('IH_MESSAGES', uid, function(err) {
        if(err) {
          console.log('HDEL DELETE /message/:id ' + err);
        }

        res.send('\n');
      });
    });

}
