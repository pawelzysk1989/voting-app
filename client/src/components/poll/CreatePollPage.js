import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PollForm from './CreatePollForm';
import * as pollActions from '../../actions/pollActions';
import toastr from 'toastr';

class CreatePollPage extends React.Component {
	
	constructor(props, context){
		super(props, context);

		this.state = {
			poll: { title: "", author: localStorage.getItem('user'), options: [{optionFieldName: "option0", optionValue: "", votes: 0}, {optionFieldName: "option1", optionValue: "", votes: 0}] },
			errors: {},
			creating: false
		};

		this.updatePollState = this.updatePollState.bind(this);
		this.addOption = this.addOption.bind(this);
		this.deleteOption = this.deleteOption.bind(this);
		this.createPoll = this.createPoll.bind(this);
	}

	updatePollState(event){
		const fieldName = event.target.name;
		const fieldValue = event.target.value;
		let poll = this.state.poll;
		if(fieldName == "title"){
			poll.title = fieldValue;
		}else{
			poll.options.forEach( (option) => {
				if(option.optionFieldName == fieldName){
					option.optionValue = fieldValue;
					return this.setState({ poll: poll });
				}
			});
		}
		return this.setState({ poll: poll });
	}

	addOption(event){
		event.preventDefault();
		let poll = this.state.poll;
		let options = poll.options;
		const lastOption = options[options.length-1];
		const lastOptionFieldName = lastOption.optionFieldName;
		const lastOptionFieldNameIndex = parseInt(lastOptionFieldName.slice(6));
		
		const optionFieldName = "option" + (lastOptionFieldNameIndex + 1);
		const option = {optionFieldName: optionFieldName, optionValue: "", votes: 0};
		options.push(option);
		return this.setState({ poll: poll });
	}

	deleteOption(event, fieldName){
		event.preventDefault();
		let poll = this.state.poll;
		let options = this.state.poll.options.filter( (option) =>{
			return option.optionFieldName != fieldName;
		});
		poll.options = options;
		return this.setState({ poll: poll });
	}

	redirect() {
		this.setState({ creating: false });
		toastr.success('Poll added');
		this.context.router.push('/polls');
	}

	isFormValid(){
		let formIsValid = true;
		const poll = this.state.poll;
		const errors = {};
		if(poll.title.length < 5){
			errors.title = "Poll title should be at least 5 characters long";
			formIsValid = false;
		}
		poll.options.forEach(option => {
			if(option.optionValue.length < 1){
				errors[option.optionFieldName.toString()] = "Option should be at least 1 characters long";
				formIsValid = false;
			}
		});

		this.setState({ errors: errors});
		return formIsValid;
	}

	createPoll(event){
		event.preventDefault();
		if( !this.isFormValid() ){
			return;
		}
		this.setState({ creating: true });
		this.props.actions.createPoll(this.state.poll)
			.then(() => this.redirect());
	}

	render(){
		return(
			<PollForm
				poll={this.state.poll}
				onChange={this.updatePollState}
				addOption={this.addOption}
				deleteOption={this.deleteOption}
				createPoll={this.createPoll}
				creating={this.state.creating}
				errors={this.state.errors}
			/>
		);
	}
}

CreatePollPage.contextTypes = {
  router: React.PropTypes.object
};

CreatePollPage.propTypes = {
	actions: React.PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(pollActions, dispatch)
	};
}


export default connect(null, mapDispatchToProps)(CreatePollPage);
