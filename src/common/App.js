import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import withSizes from 'react-sizes'
import MobileView from '../mobile/MobileView';
import DesktopView from '../desktop/DesktopView';
import Footer from './Footer';
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

          <ToastContainer autoClose={false} /> 
        </div>
      </BrowserRouter>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isDesktop: width >= 900,
})

export default withSizes(mapSizesToProps)(App);
