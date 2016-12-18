import React from 'react';

import {Doughnut as DoughnutChart} from 'react-chartjs-2';

const stringToColour = function(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (var i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

class Chart extends React.Component {
	
	constructor(props, context){
		super(props, context);
		this.state = {

		};
	}

	formatData(){
		const options = this.props.poll.options || [];

		const labels = [];
		const data = []
		const backgroundColor = [];

		options.forEach(option => {
			labels.push(option.optionValue);
			data.push(option.votes);
			backgroundColor.push(stringToColour(option.optionValue));
		});

		return {labels, datasets: [{ data,  backgroundColor}]};
	}	

	render(){
		return(
			<div id="chartContainer">
				<DoughnutChart data={this.formatData()} />
			</div>
		);
	}
}


Chart.propTypes = {
	poll: React.PropTypes.object.isRequired,
};


export default Chart;


