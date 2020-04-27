import React, { Component } from 'react';
import './App.css';
import Header from './components/Layout/Header/Header.js';
import HomePage from './components/HomePage/HomePage.js';
import FloorPlanCreating from './components/Boss/FloorPlanCreating/FloorPlanCreating.js';
import RestorauntList from './components/restorauntList/RestorauntList.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './Store.js';
import AboutUs from './components/AboutUs/AboutUs.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Restoraunt from './components/Restoraunt/Restoraunt.js';
import Profile from './components/UserProfile/UserProfile.js';
import Footer from './components/Layout/Footer/Footer.js';
import { loadRestoraunt } from './actions/authActions.js';
import FloorPlanExample from './components/Restoraunt/FloorPlanExample/FloorPlanExample.js';
import Customer from './components/Customer/Customer';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadRestoraunt());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <DndProvider backend={Backend}>
            <div className='App'>
              <Header></Header>

              <Switch>
                <Route exact path='/'>
                  <HomePage />
                </Route>
                <Route path='/fpe/:id'>
                  <FloorPlanExample />
                </Route>
                <Route path='/main'>
                  <RestorauntList />
                </Route>
                <Route path='/fpc/:id'>
                  <FloorPlanCreating />
                </Route>
                <Route path='/aboutus'>
                  <AboutUs />
                </Route>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/reg'>
                  <Register />
                </Route>
                <Route path='/restoraunt/:id'>
                  <Restoraunt />
                </Route>
                <Route path='/customer/:id'>
                  <Customer />
                </Route>
                <Route path='/profile'>
                  <Profile />
                </Route>
              </Switch>
              <Footer></Footer>
            </div>
          </DndProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
