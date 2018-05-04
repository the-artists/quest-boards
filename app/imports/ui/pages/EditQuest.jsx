import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Quests, QuestSchema } from '/imports/api/quest/quest';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditQuest extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { title, pay, deadline, location, contactInfo, skills, description, _id } = data;
    Quests.update(_id, { $set: { title, pay, deadline, location,
        contactInfo, skills, description } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Quest</Header>
            <AutoForm schema={QuestSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='title'/>
                <TextField name='pay'/>
                <TextField name='deadline'/>
                <TextField name='location'/>
                <TextField name='contactInfo'/>
                <TextField name='skills'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
                <HiddenField name='status' value='open'/>
                <HiddenField name='ownerId' value='asdafa'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

  /** Require the presence of a Quest document in the props object. Uniforms adds 'model' to the props, which we use. */
EditQuest.propTypes = {
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
})(EditQuest);
