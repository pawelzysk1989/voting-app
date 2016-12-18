import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import PollsPage from './components/poll/PollsPage';
import CreatePollPage from './components/poll/CreatePollPage';
import VotePollPage from './components/poll/VotePollPage';
import AboutPage from './components/about/AboutPage';
import NotFoundPage from './components/notFound/NotFoundPage';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import RequireAuth from './components/auth/RequireAuth';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="polls" component={PollsPage}/>
    <Route path="poll" component={RequireAuth(CreatePollPage)}/>
    <Route path="poll/:id" component={VotePollPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="/signin" component={Signin}/>
    <Route path="/signout" component={Signout}/>
    <Route path="/signup" component={Signup}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
