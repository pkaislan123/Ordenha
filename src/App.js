import React from 'react'
import './styles/bulma.scss';
import './styles/global.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import api from './services/api';
import Cookies from 'js-cookie';

import Ordenha from './pages/Ordenha';

import GraficoOrdenha from './pages/Ordenha/graficos';



function isAuthenticated() {
  var token = Cookies.get('token');
  console.log(typeof token)
  if (token === null || token === undefined || token === "undefined") {
    // This means that there's no JWT and no user is logged in.
    api.defaults.headers.common.Authorization = null;
    console.log("token invalido: ");
    return false;
  } else {
    // This means that there's a JWT so someone must be logged in.
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log("token valido: " + token);
    return true;

  }
};












const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
        isAuthenticated() && restricted ?
              <Redirect to="/minhaconta" />
          : <Component {...props} />
      )} />
  );
};




function App() {


  return (

    <BrowserRouter>

      <Switch>
      
      <PublicRoute restricted={false} component={Ordenha} path="/" exact />
      <PublicRoute restricted={false} component={GraficoOrdenha} path="/graficos" exact />

    


      </Switch>

    </BrowserRouter>

  );
}

export default App;
