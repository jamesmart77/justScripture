import React, { Component } from 'react';
import withSizes from 'react-sizes'
import MobileView from './mobile/MobileView';
import DesktopView from './desktop/DesktopView';
import Footer from './common/Footer';
import { ToastContainer } from 'react-toastify';

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

        <ToastContainer autoClose={false} /> 
      </div>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isDesktop: width >= 900,
})

export default withSizes(mapSizesToProps)(App);
