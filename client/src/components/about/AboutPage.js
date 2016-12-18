import React from 'react';

// Since this component is simple and static, there's no parent container for it.
class AboutPage extends React.Component {
  render(){
    return (
      <div>
        <h2>About</h2>
        <p>
          This application enables people to create polls and vote.
        </p>
        <h2>Rules:</h2>
        <div>
          - You can create your own polls while being logged in <br/>
          - You can delete only polls created by your own <br/>
          - You are restricted to vote only once from yur browser unless open new incognito tab
        </div>
        <h2>Development Stack:</h2>
        <div>
          - React, Redux, React-Router, Webpack <br/>
          - Node, Express, MongoDB <br/>
        </div>
      </div>
    );
  }
}

export default AboutPage;
