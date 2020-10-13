import React from 'react';
import {Container,Grid,Button,Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";


export const OperationsPage = () =>
{
    let history = useHistory();    
    const idTarjeta = history.location.state.id;
    const balanceTarjeta = history.location.state.balance;
    
 
    const redirectPage = (page, text) => {
        history.push({
                        pathname : page,
                        state :{
                                message : text,
                                id : idTarjeta,
                                balance: balanceTarjeta
                                }
                    });
    }


    return(
        <Container>
           <Typography variant="h5" align="center" style={{fontFamily:"monospace"}}>
            
            <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1, paddingTop:100 }}>           
            <Button variant="contained" color="primary" 
                    style={{fontSize: 11.5,width:132 }}
                    onClick={() => redirectPage('/balance', 'OK')}> Balance 
            </Button>
            </Grid>         
            <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>           
            <Button variant="contained" color="primary" 
                    style={{fontSize: 11.5,width:132 }}
                    onClick={() => redirectPage('/retiro', 'OK')}> Retiro 
            </Button>
            </Grid>                     
            <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>           
            <Button variant="contained" color="secondary" 
                    style={{fontSize: 11.5,width:132 }}
                    onClick={() => redirectPage('/', 'OK')}> Salir 
            </Button>
            </Grid>         
            </Typography>
        </Container> 
        )
}