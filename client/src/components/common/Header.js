import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import { connect } from 'react-redux';

class Header extends React.Component {

  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return <li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
      </li>
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>    
          <Link to="/" className="navbar-brand">Voting App</Link>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-left">
              <li className="nav-item"><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li className="nav-item"><Link to="/polls" activeClassName="active">All Pools</Link></li>
              <li className="nav-item"><Link to="/about"  activeClassName="active">About {this.props.loading && <LoadingDots interval={100} dots={20}/>}</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);