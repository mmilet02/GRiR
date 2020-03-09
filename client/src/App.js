import React from 'react';
import './App.css';
import Header from './components/Layout/Header/Header.js';
import HomePage from './components/HomePage/HomePage.js';
import FloorPlanCreating from './components/Boss/FloorPlanCreating/FloorPlanCreating.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './Store.js';

function App() {
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
              <Route path='/fpc'>
                <FloorPlanCreating />
              </Route>
            </Switch>
          </div>
        </DndProvider>
      </Router>
    </Provider>
  );
}

export default App;
