import React from 'react';
import './App.css';
import {Home} from './Componentes/Home'
import {Typography}  from "@material-ui/core";
import {Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {ValidatePin} from './Componentes/ValidatePin'
import {PageError} from './Componentes/PageError'
import {OperationsPage} from './Componentes/OperationsPage'
import {RetiroPage} from './Componentes/RetiroPage'
import {BalancePage} from './Componentes/BalancePage'
import {ReportPage} from './Componentes/ReportPage'


function App() {
  return (
    <div className="App">
       <Router>
          <Typography variant="h5" align="center" style={{fontFamily:"monospace"}}>
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
                <Route path="/retiro" exact>
                  <RetiroPage/>
                </Route>
                <Route path="/balance" exact>
                   <BalancePage/>
                </Route>
                <Route path="/report" exact>
                    <ReportPage/>
                </Route>
              </Switch>
      </Router>     
    </div>
  );
}

export default App;
