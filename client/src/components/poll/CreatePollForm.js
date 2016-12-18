import React from 'react';
import TextInput from '../common/TextInput';

const PoolForm = ({poll, onChange, addOption, deleteOption, createPoll, creating, errors}) => {
	return (
		<form>
			<h1>Create Poll</h1>
			<TextInput
				name="title"
				label="Title"
				value={poll.title}
				onChange={onChange}
				placeholder="Title of a pool..."
				error={errors.title}/>
			{poll.options.map( (option, index) => {
				return (
					<div key = {index} className="option" >
						<TextInput
							name={option.optionFieldName}
							label={"Option " + (index + 1)}
							value={option.optionValue}
							onChange={onChange}
							placeholder="Type an option..."
							error={errors[option.optionFieldName.toString()]}/>
						{index > 1 && <button onClick={event => deleteOption(event, option.optionFieldName)} className="btn btn-warning btn-sm"><span>Delete Option</span></button> }
					</div>
				);
			})}
			<input 
				type="submit"
				value="Add Option"
				onClick={addOption}
				className="btn btn-primary btn-md"/> 
			<input 
				type="submit"
				disabled={creating}
				value={creating ? 'Creating...' : 'Create Poll'}
				onClick={createPoll}
				className="btn btn-success btn-md"/> 
		</form>

	);
};

PoolForm.propTypes = {
	poll: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	addOption: React.PropTypes.func.isRequired,
	deleteOption: React.PropTypes.func.isRequired,
	createPoll: React.PropTypes.func.isRequired,
	creating: React.PropTypes.bool,
	errors: React.PropTypes.object
};

export default PoolForm;


