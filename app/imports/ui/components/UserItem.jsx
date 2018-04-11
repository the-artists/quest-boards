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
              Him Boy /*Replace with {this.props.profiles.firstName} {this.props.profiles.lastName}*/
            </Card.Header>
            <Card.Description>
              <strong>Skills:</strong> Wombo Combo, Cat Sitting
            </Card.Description>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
UserItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserItem);
