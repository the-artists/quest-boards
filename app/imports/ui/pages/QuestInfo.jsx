import React from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import { Quests } from '/imports/api/quest/quest';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class QuestInfo extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    console.log(this.props.doc.title);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center"> {this.props.doc.title} </Header>
            <Link to={`/edit/${this.props.doc._id}`}>Edit</Link>
          </Grid.Column>
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
  console.log(questId);
  // Get access to Quest documents.
  const subscription = Meteor.subscribe('Quests');
  return {
    doc: Quests.findOne(questId),
    ready: subscription.ready(),
  };
})(QuestInfo);
