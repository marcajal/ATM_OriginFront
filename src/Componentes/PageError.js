import React, { useState, useEffect } from 'react';
import {NumericKeyboard} from '../Componentes/NumericKeyboard'
import {
    Container,
    Tooltip,
    Fab,
    Grid,
    Button,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import Message from '../Componentes/Message';
import NumberFormat from 'react-number-format';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

export const PageError = (props) =>
{
    let history = useHistory();
    
    const [mensaje, setMensaje] = useState(history.location.state.message);
    const [tipoLabel, setTipoLabel] = useState('error');
    const [openCollapse, setOpenCollapse] = useState(true);


    const redirectPage = () => {
        history.push("/validate");
      }

    const backPage = () => {
        history.goBack();
      }  

    return(
        <Container>
           <Typography variant="h5" align="center" style={{fontFamily:"monospace"}}>
             <Grid container alignItems="center" justify="center" direction="row" style={{ paddingTop: 100, paddingBottom: 1 }}>
             {mensaje && 
                (
                    <Message tipoLabel={tipoLabel} openCollapse={openCollapse} mensaje={mensaje} setOpenCollapse={setOpenCollapse} />
                )}        
            </Grid>
            <Grid container alignItems="center" justify="center" direction="row" style={{ paddingTop: 10, paddingBottom: 1 }}>           
            <Button onClick={() => backPage()}> Atras </Button>
            </Grid> 
        {/* <Link to="/create">
                        <Tooltip title="Nuevo" placement="right" aria-label="add">
                            <Fab style={{ color: "white", backgroundColor: "black", height: "40px", width: "40px" }}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
        </Link> */}
            </Typography>
        </Container> 
        )
}