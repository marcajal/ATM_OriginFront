import React from 'react';
import './App.css';
import {Home} from './Componentes/Home'
import {Typography}  from "@material-ui/core";
//import Titulo from './Componentes/Titulo';
import {Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {ValidatePin} from './Componentes/ValidatePin'
import {PageError} from './Componentes/PageError'
import {OperationsPage} from './Componentes/OperationsPage'



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
                <Route path="/error" exact>
                  <PageError/>
                </Route>
                <Route path="/operations" exact>
                  <OperationsPage/>
                </Route>
                
                <Route path="/edit/:id/" exact>
                  
                  </Route>  
              </Switch>
      </Router>     
    </div>
  );
}

export default App;
