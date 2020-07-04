import React, { Component } from 'react';
import withSizes from 'react-sizes'
import MobileView from './mobile/MobileView';
import DesktopView from './desktop/DesktopView';
import Footer from './common/Footer';

class App extends Component {
  render() {

    const { isDesktop } = this.props;
    return (
      <div className="app-container">
        <main>
          {isDesktop ? (
            <DesktopView />
          ) : (
            <MobileView />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isDesktop: width >= 900,
})

export default withSizes(mapSizesToProps)(App);
