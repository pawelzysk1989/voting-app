const Authentication = require('./controllers/authenticationController');
const Poll = require('./controllers/pollController');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/getAllPolls', Poll.getAllPolls);
  app.post('/vote', Poll.vote);
  app.post('/addPoll', requireAuth, Poll.addPoll);
  app.post('/deletePoll', requireAuth, Poll.deletePoll);
}
