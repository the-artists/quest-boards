import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Quest extends React.Component {
  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${mm}/${dd}/${yyyy}`;
    return today;
  }

  getBorderColor(status) {
    if (status === 'open') {
      return { borderTop: '3px solid green' };
    }
    if (status === 'pending') {
      return { borderTop: '3px solid yellow' };
    }
    if (status === 'closed') {
      return { borderTop: '3px solid red' };
    }
    return null;
  }

  render() {
    const floatRight = { float: 'right' };
    // For use in calculating 'open for x days' of Card.Meta
    // let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (
        <Card centered style={this.getBorderColor(this.props.quest.status)}>
          <Card.Content>

            <Card.Header>
              {this.props.quest.title}
              <div style={floatRight}>
                ${this.props.quest.cost} {this.props.quest.status}
              </div>
            </Card.Header>
            <Card.Meta>
              Opened {this.props.quest.createdAt}
            </Card.Meta>
            <Card.Description>
              {this.props.quest.description}<br/><br/>
              <b>Location: </b>
              {this.props.quest.location}<br/><br/>
              {this.props.quest.requirements ?
                <div>
                  <b>Requirements: </b>
                  {this.props.quest.requirements}
                </div>
                :
                null
              }
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Quest.propTypes = {
  quest: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Quest);
