// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

//var router = require("express").Router();

// Adding a little piece of middleware to check if a user is logged in
var authCheck = function(req, res, next) {
	if (!req.user) {
		res.redirect('/auth/login');
	}
	else {
		next();
	}
}


// Routes
// =============================================================
module.exports = function(app) {
	app.get("/", function(req, res) {
	    res.render("landing");
	});

	app.get("/index/", authCheck, function(req, res) {
		console.log("Before the get attempt");
		// console.log(req.user);
		var query = {};
        // if (req.query.user_id) {
        //   query.UserId = req.query.user_id;
        // }
		db.Post.findAll({
			where: query,
			include: [
                db.User, 
                {
                    model: db.Comment,
					include: [ db.User],
					// order: [
					// 	[model.Comment, 'createdAt', 'DESC']
					]
                }
			],
			order: [
                [['createdAt', 'DESC']]
            ]
			}).then(posts => {
			var hbsObject = {
				hbPosts: posts,
				user: req.user
			}
			// console.log(hbsObject);
			// console.log(hbsObject.hbPosts[0].Comments[0].User);
			// console.log(hbsObject);
			res.render("index", hbsObject);		
		});
	});

	app.get("/index/:id", authCheck, function(req, res) {
		console.log("Before the get attempt");
		// console.log(req.user);
		var query = {};
        // if (req.query.user_id) {
        //   query.UserId = req.query.user_id;
        // }
		db.Post.findAll({
			where: {
				id: req.params.id
			},
			order: [
                ['createdAt', 'DESC']
            ],
			include: [
                db.User, 
                {
					model: db.Comment,
					// order: [
					// 	[sequelize.fn('max', sequelize.col('')),]
					// ],
					include: [ db.User]
                }
			]
			}).then(posts => {
			var hbsObject = {
				hbPosts: posts,
				user: req.user
			}
			// console.log(hbsObject);
			// console.log(hbsObject.hbPosts[0].Comments[0].User);
			res.render("index", hbsObject);		
		});
	});

	app.get("/profile/:id", authCheck, function(req, res) {

		var hbsObject = {};

		db.User.findOne({
			where: {
				id: req.params.id
			}
		}).then(result => {
			hbsObject.profile = result;
		});

		db.Post.findAll({
			where: {
				UserId: req.params.id
			},
			order: [
				[['createdAt', 'DESC']]
			],
			include: [
				db.User, 
				{
					model: db.Comment,
					// order: [
					// 	[model.Comment, 'createdAt', 'DESC']
					// ],
					include: [ 
						db.User 
					]
				}
			]
			}).then(posts => {
			hbsObject.posts = posts;
			hbsObject.user = req.user;
			res.render("profile", hbsObject);
		});
	});
};











