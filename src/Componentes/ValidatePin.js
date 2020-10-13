import React, { useState} from 'react';
import {NumericKeyboard} from '../Componentes/NumericKeyboard'
import {Container,Grid,TextField,Typography, Button} from "@material-ui/core";
import Message from '../Componentes/Message';
import NumberFormat from 'react-number-format';
import {useHistory} from "react-router-dom";

export const ValidatePin = () =>
{
    let history = useHistory();

    const idTarjeta = history.location.state.id;
    const numeroTarjeta = history.location.state.numero;
    const balanceTarjeta = history.location.state.balance;
    const [numeroPin, setNumeroPin] = useState('');
    const [count, setCount] = useState(0);
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState('info');
    const [openCollapse, setOpenCollapse] = useState(false);
   

    const redirectPage = (page, text, id, balance) => {
        history.push({
                        pathname : page,
                        state :{
                                message : text,
                                id : id,
                                balance:balance
                                }
                    });
    }


    const bloquearTarjeta = () => {    
        
        let body = JSON.stringify({
            id: idTarjeta,
            numero: numeroTarjeta,
            pin: numeroPin,
            habilitada: false,
            fechaVto: null,
            balance:balanceTarjeta
        })
        
        fetch(`https://localhost:44314/api/tarjeta`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: body
        })
        
        .then(response => response.text())
        .then(text => {
            try {
                
                if(JSON.parse(text) === true)
                {
                    redirectPage('/error', 'Tarjeta Bloqueada', null, null);  
                }

            } catch(err) {
                console.log('error');
                
            }})
        .finally(function()
            {
            }
        )
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
                redirectPage('/operations', 'OK', idTarjeta, JSON.parse(text).balance);
            } catch(err) {
                console.log('count: '+count);
                setCount(count + 1);
                if(count === 3)
                {
                    bloquearTarjeta();
                }
                setMensaje('PIN Incorrecto');
                setOpenCollapse(true)
                setTipoLabel("error");
                
            }})
        .finally(function()
            {
            }
        )
    }

    const limpiar = () => {    
        setNumeroPin('');
        setMensaje(null);
        setOpenCollapse(false)
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
                    onClick={() => redirectPage('/', 'OK', null, null)}> Salir </Button>
            </Grid> 
            </Typography>
        </Container> 
        )
}