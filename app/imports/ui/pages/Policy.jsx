import React from 'react';
import { Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Policy extends React.Component {
  render() {
    return (
        <Container centered className="menu-container">
          <h1>The Artists cannot be held accountable for the actions of any of our members.
            It is a users responsibility to handle payments for a job, both giving and receiving.</h1>
        </Container>
    );
  }
}

export default Policy;
