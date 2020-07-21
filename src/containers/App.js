import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import withSizes from 'react-sizes'
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import Footer from '../common/Footer';
import { ToastContainer } from 'react-toastify';

class App extends Component {

  render() {
    const { isDesktop } = this.props;
    
    return (
      <BrowserRouter>
        <div className="app-container">
          <main>
            <Switch>
              <Route path='/bibleApp' render={props => {
                return isDesktop ? <DesktopView {...props} /> : <MobileView />
              }}/>
            </Switch>
          </main>

          <Footer />

          <ToastContainer 
            className="error-toast-container"
            autoClose={false} 
          /> 
        </div>
      </BrowserRouter>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isDesktop: width >= 900,
})

export default withSizes(mapSizesToProps)(App);
