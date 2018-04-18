import React from 'react';
import { Container, Grid, Icon, Card } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const colorWhite = { color: 'white' };
    const widthTop = { width: 'auto', marginBottom: '0.1em' };
    const widthBot = { width: 'auto', marginBottom: '0.2em' };
    const marginBot = { marginBottom: '1em' };
    const landingLogo = {
      textAlign: 'center',
      marginBottom: '0em',
      fontSize: '5em',
      color: '#207133',
    };
    return (
        <Container>
          <h1 style={landingLogo}>
            University of Hawai'i at Manoa<br/>Quest Boards
          </h1>
          <hr style={marginBot}/>
          <Grid verticalAlign='middle' textAlign='center' columns={2}>

            <Grid.Column>
              <Card centered raised={true} className='UHGreenBG'
                    as={NavLink} exact to="/add">
                <Icon size='massive' inverted name='comments outline' style={widthTop}/>
                <Card.Content>
                  <Card.Header style={colorWhite}>
                    Create a Quest!
                  </Card.Header>
                  <Card.Description style={colorWhite}>
                    Need help? Enlist the aid of the UH Manoa community!
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card centered raised={true} className='UHGreenBG'
                    as={NavLink} exact to="/list">
                <Card.Content>
                  <Icon size='massive' inverted name='search' style={widthBot}/>
                  <Card.Header style={colorWhite}>
                    Find a Quest!
                  </Card.Header>
                  <Card.Description style={colorWhite}>
                    Need something to do? Search the ever increasing list of available Quests on the UH Manoa campus!
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

          </Grid>
        </Container>
    );
  }
}

export default Landing;
