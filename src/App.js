import React, { Component } from 'react';
import withSizes from 'react-sizes'
import MobileView from './mobile/MobileView';
import DesktopView from './desktop/DesktopView';
import Footer from './common/Footer';

class App extends Component {
  render() {

    const { isMobile } = this.props;
    return (
      <div className="app-container">
        <main>
          {!isMobile &&
            <DesktopView />
          }

          {isMobile && 
            <MobileView />
          }
        </main>
        <Footer />
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
})

export default withSizes(mapSizesToProps)(App);
