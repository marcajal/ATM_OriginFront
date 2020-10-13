import React, { useState, useEffect } from 'react';
import {Container,Grid,Button,TextField,Typography} from "@material-ui/core";
import Message from '../Componentes/Message';
import NumberFormat from 'react-number-format';
import {useHistory} from "react-router-dom";

export const ReportPage = () =>
{
    function Getdate()
    {
        return new Date().toISOString().substr(0, 10);
    }

    let history = useHistory();
    const idTarjeta = history.location.state.id;
    const importe = history.location.state.importe;
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState('info');
    const [openCollapse, setOpenCollapse] = useState(false);
    const [objTarjeta, setObjTarjeta] = useState([]);

    
    const redirectPage = (page, text) => {
        
        history.push({
                        pathname : page,
                        state :{
                                message : text,
                                id : idTarjeta
                                }
                    });
    }

  

    const backPage = () => {
        history.goBack();
      }  
    
      useEffect(function () {
        obtenerDatos();
    },[])


    const obtenerDatos = async () => {  
        setMensaje(false);  
        window.fetch(`https://localhost:44314/api/tarjeta/${idTarjeta}`)
        .then(response => response.text())
        .then(text => {
            try {
                setObjTarjeta(JSON.parse(text));

            } catch(err) {
                console.log('error');
                
            }})
            .finally(function()
            {
                
            }
        )        
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
            
                        <Grid item xs={3} style={{paddingLeft: 50}}>
                      
                        <TextField
                                            label="Numero Tarjeta"
                                            style={{width: "100%"}}
                                            value={objTarjeta.numero}
                                            inputMode="text"
                                            InputLabelProps={{
                                                shrink: true,
                                                }}
                                        />
                        </Grid>
                        <Grid item xs={2} style={{paddingLeft: 32,marginTop:16 }}>
                        <NumberFormat
                            prefix={'$'}
                            isNumericString={true}
                            thousandSeparator={true}
                            customInput={TextField}
                            value={objTarjeta.balance}
                            disabled={true}
                        /> 
                        </Grid> 
                        <Grid item xs={2} style={{paddingLeft: 32,marginTop:16 }}>
                        <NumberFormat
                            prefix={'$'}
                            isNumericString={true}
                            thousandSeparator={true}
                            customInput={TextField}
                            value={importe}
                            disabled={true}
                        /> 
                        </Grid>
                        <Grid item xs={3} style={{paddingLeft: 32}}>                                 
                        <TextField
                                id="Fecha"
                                label="Fecha"
                                type="date"
                                defaultValue={new Date().toISOString().substr(0, 10)}
                                //onChange={event => changeDateDesde(event.target.value)}
                                style={{width: "85%"}}
                                disabled={true}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid> 
            
            </Grid>              
            <Grid container alignItems="center" justify="center" direction="row" style={{ paddingTop: 10, paddingBottom: 1 }}>           
            <Button style={{fontSize: 11.5,width:132, color: "white", backgroundColor: "black"}} onClick={() => backPage()}> Atras </Button>
            </Grid> 

            <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>           
            <Button variant="contained" color="secondary" 
                    style={{fontSize: 11.5,width:132 }}
                    onClick={() => redirectPage('/', 'OK', null)}> Salir 
            </Button>
            </Grid>         
            </Typography>
        </Container> 
        )
}