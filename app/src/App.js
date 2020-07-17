import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Route} from 'react-router-dom';

import RecipeList from './views/index'

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={RecipeList} />
      </BrowserRouter>
    )
  }
}

export default App;