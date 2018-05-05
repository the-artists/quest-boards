import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Card, Header } from 'semantic-ui-react';
import User from '/imports/ui/components/User';
import UserQuests from '/imports/ui/components/UserQuests';
import { Users } from '/imports/api/user/user';
import { Quests } from '/imports/api/quest/quest';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import '../components/userStyle.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const aUser = this.props.users[0].owner;
    console.log(aUser);
    return (
        <Container width="200px">
          <Grid>
            <Grid.Row>
              <div className="centerM">
                {this.props.users.map((user) => <User key={user._id} user={user}/>)}
              </div>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={5}>
                <Container align="center" className="userQuests">
                  <Header as="h2">Completed Quests</Header>
                  <Card.Group itemsPerRow={1}>
                    {this.props.quests.map((quest, index) => ((quest.assignee === aUser && quest.status === 'closed') ?
                        <UserQuests quest={quest} key={index}/> : ''))
                    }
                  </Card.Group>
                </Container>
              </Grid.Column>
              <Grid.Column width={5}>
                <Container align="center" className="userQuests">
                  <Header as="h2">Current Quests</Header>
                  <Card.Group itemsPerRow={1}>
                    {this.props.quests.map((quest, index) => ((quest.assignee === aUser && quest.status === 'pending') ?
                        <UserQuests quest={quest} key={index}/> : ''))
                    }
                  </Card.Group>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  users: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  const subscription2 = Meteor.subscribe('Quests');
  return {
    users: Users.find({}).fetch(),
    quests: Quests.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserProfile);
