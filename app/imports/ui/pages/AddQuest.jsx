import React from 'react';
import { Quests, QuestSchema } from '/imports/api/quest/quest';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

/** Renders the Page for adding a document. */
class AddQuest extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;

    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */

 submit(data) {
    const { quest, pay, deadline, location, contactInfo, skills, description } = data;
    const owner = Meteor.user().username;
    Quests.insert({ quest, pay, deadline, location, contactInfo, skills, description, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Quest</Header>
          <AutoForm ref={(ref) => { this.formRef = ref; }} schema = {QuestSchema} onSubmit={this.submit}>
            <Segment>
              <TextField name='quest'/>
              <TextField name='pay'/>
              <TextField name='deadline'/>
              <TextField name='location'/>
              <TextField name='contactInfo'/>
              <TextField name='skills'/>
              <LongTextField name='description' />
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
  );
  }
}

export default AddQuest;
