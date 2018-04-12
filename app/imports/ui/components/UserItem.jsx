import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserItem extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='https://philipmjohnson.github.io/images/philip2.jpeg' />
            <Card.Header>
             {this.props.user.firstName} {this.props.user.lastName}*/
            </Card.Header>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserItem);
