import React from 'react';
import { Container, Image, Grid, Header, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {
  render() {
    return (
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <Image src={this.props.user.image} size="medium"/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Grid.Row>
                  <div align="center">
                    {this.props.user.firstName} {this.props.user.lastName}
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
        </Container>

    );
  }
}

/** Require a document to be passed to this component. */
User.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(User);