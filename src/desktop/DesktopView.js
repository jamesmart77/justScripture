import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Title from '../common/Title';

class DesktopView extends Component {
  render() {
    return (
      <div className="desktop-container">
        <Row className="row-wrapper">
          <Col s={3} className="col-wrapper search-col">
            <Title />
          </Col>
          <Col s={9} className="col-wrapper display-col">
            <div>Currently under construction...</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DesktopView;
