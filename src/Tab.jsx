'use-strict';
import React from 'react';
import {Tab, Panel} from 'react-bootstrap';

class ControlledTab extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Tab {...this.props}>
        <Panel>{this.props.children}</Panel>
      </Tab>
    );
  }
}

export default ControlledTab;
