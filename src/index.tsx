import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { Home, Inventory, Contact, About, SignIn } from './components'
import './styles.css'
import { firebaseConfig } from './firebaseConfig'
import 'firebase/auth';
import { Provider } from 'react-redux';
import { store } from './redux/store'

const page_title = "Your Car Inventory"

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
    <Provider store={store}>
    <Router>
      <Switch>


        <Route exact path="/">
          <Home title={page_title}/>
        </Route>
        <Route path='/Inventory'>
          <Inventory></Inventory>
        </Route>
        <Route path='/Contact'>
          <Contact></Contact>
        </Route>
        <Route path='/About'>
          <About></About>
        </Route>
        <Route path='/SignIn'>
          <SignIn></SignIn>
        </Route>


      </Switch>
    </Router>
    </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
