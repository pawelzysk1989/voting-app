import React from 'react';
import {Link} from 'react-router';

const PollListRow = ({poll}) => {
	return (
		<tr>
			<td><Link to={'/poll/' + poll._id}>{poll.title}</Link></td>
			<td>{poll.author}</td>
		</tr>
	);
};

PollListRow.propTypes = {
	poll: React.PropTypes.object.isRequired
	
};

export default PollListRow;


