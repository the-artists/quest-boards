import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, List } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import thisStyle from './userStyle.css';
import User from '/imports/ui/components/UserItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
          <Container width="200px">
            <div className="centerM">
            <Grid>
              <Grid.Row>
                  <Grid.Column width={6}>
                    <Image src="https://philipmjohnson.github.io/images/philip2.jpeg" size="medium"/>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Grid.Row>
                      <div align="center">
                        <Header as="h2" textAlign="center">{this.props.users.lastName}</Header>
                      </div>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as="h3">Skills</Header>
                      <List as='ul'>
                        <List.Item as='li'>Wombo Combo</List.Item>
                        <List.Item as='li'>Cat Sitting</List.Item>
                      </List>
                    </Grid.Row>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3">Completed Jobs</Header>
                  <List as='ul'>
                    <List.Item as='li'>Saved Metropolis</List.Item>
                    <List.Item as='li'>Ate 12 Hotdogs in 5 Minutes</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h3">Current Jobs</Header>
                  <List as='ul'>
                    <List.Item as='li'>Food Boy</List.Item>
                    <List.Item as='li'>Obtain Rank 1 in Love Live!</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </div>
          </Container>
  );
  }
  }

    /** Require an array of Stuff documents in the props. */
  UserProfile.propTypes = {
    users: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
  };

    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
  export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Users');
    return {
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
  })(UserProfile);
