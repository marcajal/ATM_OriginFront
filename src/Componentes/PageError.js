import React, { useState} from 'react';
import {Container,Grid,Button,Typography} from "@material-ui/core";
import Message from '../Componentes/Message';
import {useHistory} from "react-router-dom";

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
            <Button style={{fontSize: 15,width:132, color: "white", backgroundColor: "black"}} onClick={() => backPage()}> Atras </Button>
            </Grid> 
       
            </Typography>
        </Container> 
        )
}