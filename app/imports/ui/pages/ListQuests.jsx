import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import Quest from '/imports/ui/components/Quest';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Quests. Use <Quest> to render each row. */
class ListQuests extends React.Component {
  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${mm}/${dd}/${yyyy}`;
    return today;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const testData = [
      {
        title: 'TestQuest',
        cost: '25.52',
        status: 'open',
        createdAt: this.getCurrentDate(),
        description: 'testing our new quest system',
        location: 'Holmes Hall 289',
        requirements: 'Must know how to play the bass',
      },
      {
        title: 'TestQuest2',
        cost: -25,
        status: 'pending',
        createdAt: this.getCurrentDate(),
        description: 'testing our new quest system',
        location: 'Holmes Hall 289',
        requirements: 'Must know how to play the bass',
      },
      {
        title: 'TestQuest3',
        cost: 50,
        status: 'closed',
        createdAt: this.getCurrentDate(),
        description: 'testing our new quest system',
        location: 'Holmes Hall 289',
        requirements: 'Must know how to play the bass',
      },
      {
        title: 'ReallyLongNameTestQuest4',
        cost: 50,
        status: 'closed',
        createdAt: this.getCurrentDate(),
        description: 'testing our new quest system',
        location: 'Holmes Hall 289',
        requirements: 'Must know how to play the bass',
      },
    ];
    return (
        <Container>
          <div className='homeHeader'>
            <h2>Available Quests:</h2>
            <hr/>
          </div>
          <Card.Group itemsPerRow={4}>
            {testData.map((quest, index) =>
              <Quest quest={quest} key={index}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListQuests.propTypes = {
  quests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    quests: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListQuests);
