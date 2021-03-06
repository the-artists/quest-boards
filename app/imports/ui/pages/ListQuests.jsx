import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { Quests } from '/imports/api/quest/quest';
import Quest from '/imports/ui/components/Quest';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Quests. Use <Quest> to render each row. */
class ListQuests extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const marginBot = { marginBottom: '1.2em' };
    return (
        <Container>
          <div className='smallMarginBot' >
            <h2>Available Quests:</h2>
            <hr/>
          </div>
          <div style={marginBot}>
          <Card.Group itemsPerRow={4}>
            {this.props.questsO.map((quest, index) =>
              <Quest quest={quest} key={index}/>)}
          </Card.Group>
          </div>
          <div className='smallMarginBot' style={marginBot}>
            <h2>Pending Quests:</h2>
            <hr/>
          </div>
          <div style={marginBot}>
            <Card.Group itemsPerRow={4}>
              {this.props.questsP.map((quest, index) =>
                  <Quest quest={quest} key={index}/>)}
            </Card.Group>
          </div>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListQuests.propTypes = {
  questsO: PropTypes.array.isRequired,
  questsP: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Quests');
  return {
    questsO: Quests.find({ status: 'open' }).fetch(),
    questsP: Quests.find({ status: 'pending' }).fetch(),
    ready: subscription.ready(),
  };
})(ListQuests);
