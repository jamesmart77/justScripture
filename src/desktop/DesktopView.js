import React, { Component } from 'react';
import { Row, Col, Collapsible, CollapsibleItem, Icon } from 'react-materialize';
import Title from '../common/Title';
import Search from '../common/Search';
import { searchTypes } from '../helpers/constants';

class DesktopView extends Component {
  state = {
    isPassageExpanded: true,
    isKeywordExpanded: false,
  }

  onSearch = (value, type) => {
    console.log("Value: ", value);
    console.log("Type: ", type);
  }


  render() {
    const { isPassageExpanded, isKeywordExpanded } = this.state;

    return (
      <div className="desktop-container">
        <Row className="row-wrapper">
          <Col xl={3} m={4} className="col-wrapper search-col">
            <Title />
            <Collapsible>
              <CollapsibleItem 
                header="Passages" 
                expanded={true} 
                node="div"
                onClick={() => this.setState({ 
                  isKeywordExpanded: false,
                  isPassageExpanded: !isPassageExpanded,
                 })}
                icon={isPassageExpanded ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_right</Icon>}
              >
                <Search type={searchTypes.passages} onSearch={this.onSearch}/>
              </CollapsibleItem>
              <CollapsibleItem 
                header="Keyword" 
                node="div"
                onClick={() => this.setState({ 
                  isKeywordExpanded: !isKeywordExpanded,
                  isPassageExpanded: false,
                 })}
                icon={isKeywordExpanded ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_right</Icon>}
              >
                <Search type={searchTypes.keyword} onSearch={this.onSearch}/>
              </CollapsibleItem>
            </Collapsible>
          </Col>
          <Col xl={9} m={8} className="col-wrapper display-col">
            <div>Currently under construction...</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DesktopView;
