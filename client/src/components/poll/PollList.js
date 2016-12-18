import React from 'react';
import PollListRow from './PollListRow';

const PollsList = ({polls}) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
				</tr>
			</thead>
			<tbody>
				{polls.map(poll =>
					<PollListRow key={poll._id} poll={poll}/>
				)}
			</tbody>
		</table>
	);
};

PollsList.propTypes = {
	polls: React.PropTypes.array.isRequired
	
};

export default PollsList;


