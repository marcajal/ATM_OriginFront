import React, { useState, useEffect } from 'react';
import DataTable            from "../Componentes/DataTable"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import {NumericKeyboard} from '../Componentes/NumericKeyboard'
import {
    Container,
    Tooltip,
    Fab,
    Grid,
    IconButton,
    TextField,
    Typography, Button
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

export const ValidatePin = () =>
{
    let history = useHistory();

    const numeroTarjeta = history.location.state.numero;
    const [numeroPin, setNumeroPin] = useState('');
    const [count, setCount] = useState(0);
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState('info');
    const [openCollapse, setOpenCollapse] = useState(false);
   

    const redirectPage = (page, text) => {
        history.push({
                        pathname : page,
                        state :{message : text}
                    });
    }

    

    const aceptar = () => {    

        if(numeroPin.length < 4)
        {
            setMensaje('Debe ingresar un PIN de 4 digitos');
            setOpenCollapse(true)
            setTipoLabel("warning");
            return;
        }

        let body = JSON.stringify({
            numero: numeroTarjeta,
            pin: numeroPin,
            habilitada: true
        })
        
        fetch(`https://localhost:44314/api/tarjeta/security`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: body
        })
        
        .then(response => response.text())
        .then(text => {
            try {
                console.log(JSON.parse(text));
                redirectPage('/operations', 'OK');
            } catch(err) {
                setCount(count + 1);
                if(count === 4)
                {
                    redirectPage('/error', 'Tarjeta Bloqueada');
                }
                setMensaje('PIN Incorrecto');
                setOpenCollapse(true)
                setTipoLabel("error");
                
            }})
        .finally(function()
            {
                // setMensaje('Eliminado correctamente');
                // setOpenCollapse(true)
                // setTipoLabel("success");
                //setTimeout(() => obtenerDatos(), 3000);
            }
        )
    }

    const limpiar = () => {    
        setNumeroPin('');
        setMensaje(null);
        setOpenCollapse(false)
    }
               
    // useEffect(function () {
    //         obtenerDatos();
    // },[])
    
    
    //console.log('numeroPin: '+ numeroPin);
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
            <NumberFormat
                placeholder="Ingrese PIN"
                format="####"
                isNumericString={true}
                thousandSeparator={true}
                customInput={TextField}
                value={numeroPin}
                disabled={true}
            /> 

            <NumericKeyboard 
                            setNumero={setNumeroPin} 
                            numero={numeroPin}
                            limpiar = {limpiar}
                            aceptar = {aceptar}
                            max = {4}
            />
            </Grid> 
            <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>           
            <Button variant="contained" color="secondary" 
                    style={{fontSize: 11.5,width:132 }}
                    onClick={() => redirectPage('/', 'OK')}> Salir </Button>
            </Grid> 
            </Typography>
        </Container> 
        )
}