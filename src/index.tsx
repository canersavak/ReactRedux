import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// import pages
import App from './App';
import Product from './Product';
import { Context, defaultData } from './DataContext';
import { store } from './ReduxStore';
import { Provider } from 'react-redux';

const router = 
<Provider store={store}>
<Router>
  
  <Routes>
    
      <Route path="/" element={ <Context.Provider value={defaultData.user1}><App /></Context.Provider> }></Route>
      <Route path="/product" element={ <Context.Provider value={defaultData.user2}><Product /> </Context.Provider> }></Route>
    
  </Routes>
  
</Router>
</Provider>

ReactDOM.render( router, document.getElementById('root') );
reportWebVitals();
