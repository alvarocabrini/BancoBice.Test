import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LastElements } from './components/LastElements';
import { ElementsByDate } from './components/ElementsByDate';
import { HistoricalInformation } from './components/HistoricalInformation';
import './custom.css'

export default class App extends Component {
  static displayName = 'BancoBice Labs';

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/last-elements' component={LastElements} />
        <Route path='/elements-by-date' component={ElementsByDate} />
        <Route path='/historical-information' component={HistoricalInformation} />
      </Layout>
    );
  }
}