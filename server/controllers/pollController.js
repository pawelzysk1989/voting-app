const Poll = require('../models/poll');

exports.getAllPolls = function(req, res, next) {

	Poll.find({}, function(err, polls){
		if (err) { return next(err); }
		res.send(polls); 
	});
}

exports.vote = function(req, res, next) {

	console.log(req.sessionID);
	const id = req.body.id;
	const optionFieldName = req.body.optionFieldName;

	if (optionFieldName == "") {
	    return res.status(422).send({ error: "Choose an option"});
	}

	Poll.findById(id, function (err, poll) { 
		if (err) { return next(err); }
		if(poll){
			poll.options.forEach( function(option) {
				if(option.optionFieldName == optionFieldName){
					option.votes ++;
				}
			});
			poll.save(function (err, updatedPoll) {
			    if (err) { return next(err); }
			    res.send(updatedPoll);
			});

		}
	});
}


exports.addPoll = function(req, res, next) {

	const poll = new Poll(req.body.poll);

    poll.save(function(err) {
      	if (err) { return next(err); }
      	res.json(poll);
    });
}

exports.deletePoll = function(req, res, next) {

	const id = req.body.id;
	const user = req.body.user;

    Poll.findById(id, function(err, poll){
    	if (err) { return next(err); }
    	if(poll.author != user){
    		return res.status(401).send({ error: "You are unauthorized"});
    	}
    	poll.remove(function(err){
    		if (err) { return next(err); }
    	});

    	res.json({id: id});
    });
}