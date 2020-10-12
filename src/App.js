import React from 'react';
import './App.css';
import {Home} from './Componentes/Home'
import {Typography}  from "@material-ui/core";
//import Titulo from './Componentes/Titulo';
import {Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {ValidatePin} from './Componentes/ValidatePin'


function App() {
  return (
    <div className="App">
       <Router>
          <Typography variant="h5" align="center" style={{fontFamily:"monospace"}}>
              {/* <Home/> */}
          </Typography>
              <Switch>
                <Route path="/" exact>    
                    <Home/>
                </Route>
                <Route path="/validate" exact>
                  <ValidatePin/>
                </Route>
                <Route path="/edit/:id/" exact>
                  
                  </Route>  
              </Switch>
      </Router>     
    </div>
  );
}

export default App;
