import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VotePollForm from './VotePollForm';
import Chart from './VotePollChart';
import * as pollActions from '../../actions/pollActions';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

function isSomeoneLoggedInAlreadyVoted(pollId){
	return localStorage.getItem('user') && localStorage.getItem(localStorage.getItem('user') + pollId );
}

function isSomeoneNotLoggedInAlreadyVoted(pollId){
	return !localStorage.getItem('user') && localStorage.getItem(pollId);
}


class VotePollPage extends React.Component {
	
	constructor(props, context){
		super(props, context);
		this.state = {
			errors: {},
			voteValue: "",
			voting: false,
			deleting: false
		};

		this.updateVoteValue = this.updateVoteValue.bind(this);
		this.vote = this.vote.bind(this);
		this.deletePoll = this.deletePoll.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(!nextProps.poll._id){
			browserHistory.push('/polls');
		}
	}

	vote(event){
		event.preventDefault();
		if(isSomeoneLoggedInAlreadyVoted(this.props.poll._id) || isSomeoneNotLoggedInAlreadyVoted(this.props.poll._id)){
			return toastr.error('You already voted for this poll');
		}
		this.setState({ voting: true });
		this.props.actions.vote(this.props.poll._id, this.state.voteValue)
			.then(() => {
				this.setState({ voting: false });
				toastr.success('Vote added successfully');
			})
	      	.catch(error => {
	      		this.setState({ voting: false });
	      		toastr.error(error.response.data.error);
	      	});
	}

	updateVoteValue(event){
		const voteValue = event.target.value;
		return this.setState({ voteValue: voteValue });
	}

	redirect() {
    	browserHistory.push('/polls');
    	toastr.success('Poll was deleted successfully');
  	}

  	deletePoll(event){
		event.preventDefault();
		this.setState({ deleting: true });
		this.props.actions.deletePoll(this.props.poll._id)
			.then(() => this.redirect())
			.catch(error => {
	      		this.setState({ deleting: false });
	      		toastr.error(error.response.data.error);
	      	});
	}


	render(){
		return(
			<div>
				<VotePollForm
					onChange={this.updateVoteValue}
					vote={this.vote}
					deletePoll={this.deletePoll}
					errors={this.state.errors}
					voteValue={this.state.voteValue}
					allOptions={this.props.allOptions}
					poll={this.props.poll}
					voting={this.state.voting}
					deleting={this.state.deleting}
					authorized={this.props.authorized}
				/>
				<Chart poll={this.props.poll}/>
			</div>

		);
	}
}


function getPollById(polls, id){
	const poll = polls.filter(poll => {
		return id == poll._id;
	});
	return poll.length > 0 ? poll[0] : null;
}

function optionsFormattedForDropdowan(options){
	return options.map( option => {
		return {
			value : option.optionFieldName,
			text: option.optionValue
		};
	});
}

VotePollPage.propTypes = {
	poll: React.PropTypes.object.isRequired,
	allOptions: React.PropTypes.array.isRequired,
	actions: React.PropTypes.object.isRequired,
	authorized: React.PropTypes.bool.isRequired,
};


function mapStateToProps(state, ownProps){
	const pollId = ownProps.params.id;

	let poll = { title: "", author: "", options: [{optionFieldName: "option0", optionValue: "", votes: 0}, {optionFieldName: "option1", optionValue: "", votes: 0}] };

	if(pollId && state.polls.length > 0){
		poll = getPollById(state.polls, pollId) || poll;
	}

	const allOptions = optionsFormattedForDropdowan(poll.options);

	return{
		authorized: poll.author ===  localStorage.getItem('user'),
		poll: poll,
		allOptions: allOptions
	};
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(pollActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(VotePollPage);
