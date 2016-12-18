import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pollAction from '../../actions/pollActions';
import PollList from './PollList';
import {browserHistory} from 'react-router';


class PollsPage extends React.Component {
	constructor(props, context){
		super(props, context);
		this.redirectToAddPoolPage = this.redirectToAddPoolPage.bind(this);
	}

	redirectToAddPoolPage(){
		browserHistory.push('poll');
	}

	showAddPollButton(){
		return (this.props.authenticated && <input
					type="submit"
					value="Add Pool"
					className="btn btn-primary"
					onClick={this.redirectToAddPoolPage}
		/>);
	}

	render(){
		return(
			<div> 
				<h1>Pools</h1>
				{this.showAddPollButton()}
				<PollList polls={this.props.polls}/>
			</div>
		);
	}
}


PollsPage.propTypes = {
	polls: React.PropTypes.array.isRequired,
	actions: React.PropTypes.object.isRequired
};


function mapStateToProps(state){
	return{
		polls: state.polls,
		authenticated: state.auth.authenticated
	};
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(pollAction, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(PollsPage);
