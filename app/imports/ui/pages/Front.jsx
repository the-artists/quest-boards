import React from 'react';
import { Grid, Image, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Grid container centered>
              <Dropdown text="Navigate">
                <Dropdown.Menu>
                  <Dropdown.Item text="Request" as={NavLink} exact to="/add"/>
                  <Dropdown.Item text="Recruit" as={NavLink} exact to="/search"/>
                </Dropdown.Menu>
              </Dropdown>
            <Image src="/images/Front.png"/>
          </Grid>
        </div>
    );
  }
}

export default Landing;
