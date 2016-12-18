import React from 'react';
import SelectInput from '../common/SelectInput';

const VotePollForm = ({onChange, vote, deletePoll, voteValue, allOptions, poll, voting, deleting, errors, authorized}) => {
	return (
		<form>
			<h1>Vote</h1>
			<SelectInput
				name="options"
				label={poll.title}
				value={voteValue}
				onChange={onChange}
				defaultOption=""
				options={allOptions}
				error={errors.options}/>
			<input 
				type="submit"
				disabled={voting}
				value={voting ? 'Voting...' : 'Vote'}
				onClick={vote} 
				className="btn btn-primary btn-md"/> 
			{authorized && <input 
				type="submit"
				disabled={deleting}
				value={deleting ? 'Deleting...' : 'Delete Poll'}
				onClick={deletePoll}
				className="btn btn-danger btn-md"/>}
		</form>

	);
};

VotePollForm.propTypes = {
	authorized: React.PropTypes.bool.isRequired,
	onChange: React.PropTypes.func.isRequired,
	vote: React.PropTypes.func.isRequired,
	deletePoll: React.PropTypes.func.isRequired,
	voteValue: React.PropTypes.string.isRequired,
	allOptions: React.PropTypes.array.isRequired,
	poll: React.PropTypes.object.isRequired,
	voting: React.PropTypes.bool,
	deleting: React.PropTypes.bool,
	errors: React.PropTypes.object
};

export default VotePollForm;


