import React, { useState} from 'react';
import {NumericKeyboard} from '../Componentes/NumericKeyboard'
import {Container,Grid,TextField,Typography} from "@material-ui/core";
import Message from '../Componentes/Message';
import NumberFormat from 'react-number-format';
import {useHistory} from "react-router-dom";


export const Home = () =>
{
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState('info');
    const [openCollapse, setOpenCollapse] = useState(false);
    

    let history = useHistory();

    const redirectPage = (page, text, numero, id, balance) => {
        
        history.push({pathname : page,
                      state :{
                                message : text,
                                numero : numero,
                                id : id,
                                balance: balance
                                }
                    });
    }

    const aceptar = () => {    

        if(numeroTarjeta.length < 16)
        {
            setMensaje('Debe ingresar 16 digitos');
            setOpenCollapse(true)
            setTipoLabel("warning");
            return;
        }
        else
        {
            setNumeroTarjeta(numeroTarjeta.substring(0, 16));
        }
        
        window.fetch(`https://localhost:44314/api/tarjeta/number/${numeroTarjeta}`, {
        method: "GET"
        })
        .then(response => response.text())
        .then(text => {
            try {
                redirectPage('/validate', 'OK', JSON.parse(text).numero, JSON.parse(text).id, JSON.parse(text).balance);
            } catch(err) {
                redirectPage('/error', 'Número Incorrecto o Tarjeta Bloqueada',null, null, null);
            }})

        .finally(function()
            {
            }
        )
    }

    const limpiar = () => {    
        setNumeroTarjeta('');
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
                placeholder="0000-0000-0000-0000"
                format="####-####-####-####"
                isNumericString={true}
                thousandSeparator={true}
                customInput={TextField}
                value={numeroTarjeta}
                disabled={true}
            /> 

            <NumericKeyboard 
                            setNumero={setNumeroTarjeta} 
                            numero={numeroTarjeta}
                            limpiar = {limpiar}
                            aceptar = {aceptar}
                            max = {16}
            />
            </Grid> 
    
            </Typography>
        </Container> 
        )
}