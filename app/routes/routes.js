/**
 * Created by krunal on 11/3/15.
 */

//require everything that you need.
var router = require('express').Router();
var Indicative = new(require("indicative"));
var _          = require('underscore');


    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        next();
    });

    // test route to make sure everything is working (accessed at GET http://host:port/api)
    router.get('/', function(req, res) {
        res.json({ message: 'Welcome to Krunal API' });
    });


    // ROUTES FOR OUR API
    // =============================================================================

    // on routes that end in /Twitter
    // ----------------------------------------------------

    var Twit = require('twit')
    var T = new Twit({
                  consumer_key: process.env.TWITTER_CONSUMER_KEY,
                  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                  access_token: process.env.TWITTER_ACCESS_TOKEN,
                  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
                  timeout_ms:60*1000,  // optional HTTP request timeout to apply to all requests.
                });
    var Tt = process.env.TWITTER_TOKEN;

    router.route('/TwitterPost')
        .post(function(req, res) {
        if(Tt==req.body.token){
//            req.body.text = req.body.text==''?'Hello Wolrd':req.body.text;
            //
            //  tweet 'hello world!'
            //
            T.post('statuses/update', { status: req.body.text }, function(err, data, response) {
                if(err){
                    console.error({message:err});
                }
                console.log("Successfully Tweet!");
            });
            res.send(200);
        }
        else
            res.send(501);
        });

module.exports = router;
