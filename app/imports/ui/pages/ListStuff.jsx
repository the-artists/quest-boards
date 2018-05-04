import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Stuff</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStuff);

submit(data) {
  const { title, pay, deadline, location, contactInfo, skills, description, _id } = data;
  Quests.update(_id, { $set: { title, pay, deadline, location,
      contactInfo, skills, description } }, (error) => (error ?
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
      Bert.alert({ type: 'success', message: 'Update succeeded' })));
}




console.log(this.props.doc.title);
return (
    <Grid container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Edit Quest</Header>
        <AutoForm schema={QuestSchema} onSubmit={this.submit} model={this.props.doc._id}>
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
