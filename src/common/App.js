import React, { Component } from 'react';
import withSizes from 'react-sizes'
import MobileView from '../mobile/MobileView';
import DesktopView from '../desktop/DesktopView';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import getLocationQuery from '../utils/getLocationQuery';

class App extends Component {

  render() {
    const { isDesktop } = this.props;
    const data = getLocationQuery();
    
    
    return (
      <div className="app-container">
        <main>
          {isDesktop ? (
            <DesktopView data={data}/>
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
