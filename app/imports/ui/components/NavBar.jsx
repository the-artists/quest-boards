import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '30px', borderRadius: '0 0' };
    return (
        <Menu className="UHGreenBG" style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image className="invert" size='medium' src="/images/QuestBoard.png"/>
          </Menu.Item>
          <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>Available Quests</Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Create Quest</Menu.Item>]
          ) : ''}

          <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='policy'>My Profile</Menu.Item>

          <Menu.Item as={NavLink} activeClassName="active" exact to="/policy" key='policy'>Policy</Menu.Item>

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    {this.props.currentUser ? (
                        [<Menu.Item as={NavLink}
                                    activeClassName="active" exact to="/profile" key='profile'>Profile</Menu.Item>]
                    ) : ''}
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
