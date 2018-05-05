import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import './userStyle.css';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserQuest extends React.Component {
  render() {
    return (
          <Card centered as={NavLink} exact to={`/quest/${this.props.quest._id}`}>
            <Card.Content>
              <Card.Header>
                {this.props.quest.title}
              </Card.Header>
              <Card.Description>
                {this.props.quest.description}
              </Card.Description>
            </Card.Content>
          </Card>
    );
  }
}

/** Require a document to be passed to this component. */
UserQuest.propTypes = {
  quest: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserQuest);
