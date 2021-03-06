import React from 'react';
import { Card, Grid, Loader, Header } from 'semantic-ui-react';
import { Quests } from '/imports/api/quest/quest';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class QuestInfo extends React.Component {
  requestQuest(document) {
    if (Meteor.userId()) {
      console.log(`UserID: ${Meteor.userId()}`);
      const username = Meteor.users.findOne(Meteor.userId()).username;
      Quests.update(
          { _id: `${document._id}` },
          {
            $set: {
              assignee: `${username}`,
            },
          },
          (error) => (error ?
              Bert.alert({ type: 'danger', message: `Request failed: ${error.message}` }) :
              Bert.alert({ type: 'success', message: 'Request succeeded' })),
      );
    } else {
      Bert.alert({ type: 'danger', message: 'Request failed, Could not find USERID' });
    }
  }

  doneQuest(document) {
    if (Meteor.userId()) {
      console.log(`UserID: ${Meteor.userId()}`);
      const username = Meteor.users.findOne(Meteor.userId()).username;
      Quests.update(
          { _id: `${document._id}` },
          {
            $set: {
              assignee: `${username}`,
              status: 'closed',
            },
          },
          (error) => (error ?
              Bert.alert({ type: 'danger', message: `Failed: ${error.message}` }) :
              Bert.alert({ type: 'success', message: 'Finished Quest' })),
      );
    } else {
      Bert.alert({ type: 'danger', message: 'Request failed, Could not find USERID' });
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const colorWhite = { color: 'white' };
    const descriptionBox = { fontSize: '36px', marginBottom: '40px', padding: '10px 0' };
    const userID = Meteor.userId();
    let username = '';
    if (userID) {
      username = Meteor.users.findOne(userID).username;
    } else username = '';
    return (
        <Grid container centered>
          {this.props.doc.owner === username ?
              <Grid.Row>
                <Card centered raised={true} className='UHGreenBG'
                      as={NavLink} exact to={`/edit/${this.props.doc._id}`}>
                  <Card.Content>
                    <Card.Header style={colorWhite}>
                      Edit Quest!
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Row> : null}
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" textAlign="left"> {this.props.doc.title} </Header>
              <h4>
                Pay: ${this.props.doc.pay}<br/>
                Deadline: {this.props.doc.deadline}<br/>
                Contact Info: {this.props.doc.contactInfo}<br/>
                Required Skills: {this.props.doc.skills}<br/>
                Status: Currently {this.props.doc.status}<br/>
                Location: {this.props.doc.location}<br/>
                Currently Assigned To: {this.props.doc.assignee}<br/>
                Owner: {this.props.doc.owner}
              </h4>
              <h4>Description:</h4>
              <hr/>
              <div style={descriptionBox}>{this.props.doc.description}</div>
            </Grid.Column>
          </Grid.Row>

          {(this.props.doc.status === 'open') && (username !== '') ?
              <Grid.Row>
                <Card centered raised={true} className='UHGreenBG'
                      onClick={() => {
                        this.requestQuest(this.props.doc);
                      }}
                      as={NavLink} exact to={'/list'}>
                  <Card.Content>
                    <Card.Header style={colorWhite}>
                      Request!
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Row>
              : null
          }

          {(this.props.doc.status === 'pending') && (this.props.doc.assignee === username) ?
              <Grid.Row>
                <Card centered raised={true} className='UHGreenBG'
                      onClick={() => {
                        this.doneQuest(this.props.doc);
                      }}
                      as={NavLink} exact to={'/list'}>
                  <Card.Content>
                    <Card.Header style={colorWhite}>
                      Done!
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Row> : null
          }
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
QuestInfo.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const questId = match.params._id;
  // Get access to Quest documents.
  const subscription = Meteor.subscribe('Quests');
  return {
    doc: Quests.findOne(questId),
    ready: subscription.ready(),
  };
})(QuestInfo);
