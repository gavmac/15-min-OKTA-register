import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

function onAuthRequired({history}) {
    history.push('/login');
}

class App extends Component {
    render() {
        return (
            <Router>
            <Security issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
                      redirect_uri={window.location.origin + '/implicit/callback'}
                      client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
                      onAuthRequired={onAuthRequired} >
            <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <Login baseUrl='https://dev-951263.okta.com' />} />
        <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
        </Router>
    );
    }
}

export default App;