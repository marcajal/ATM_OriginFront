import React, { useState, useEffect } from 'react';
import {NumericKeyboard} from '../Componentes/NumericKeyboard'
import {Container,Grid,Button,TextField,Typography} from "@material-ui/core";
import Message from '../Componentes/Message';
import NumberFormat from 'react-number-format';
import {useHistory} from "react-router-dom";


export const RetiroPage = () =>
{
    let history = useHistory();
    const idTarjeta = history.location.state.id;
    const [importe, setImporte] = useState('');
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState('info');
    const [openCollapse, setOpenCollapse] = useState(false);
    const [objTarjeta, setObjTarjeta] = useState([]);
    const [balanceInput, setBalanceInput] = useState(0);
    

    const redirectPage = (page, text, id, importe) => {        
        history.push({
                        pathname : page,
                        state :{
                                message : text,
                                id : id,
                                importe: importe
                                }
                    });
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
     }

     
    const insertOperacion = () => {    
    
            let body = JSON.stringify({
                tarjetaId: idTarjeta,
                fecha: null,
                codigoOperacion: 'RETIRO',
                balance: balanceInput
            })
           
            fetch(`https://localhost:44314/api/tarjeta`, {
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
                        console.log('report: '+JSON.stringify(JSON.parse(text)));
                        redirectPage('/report', null, idTarjeta, balanceInput);  
                                     
                    } catch(err) {
                        console.log('error');
                        
                    }})
                .finally(function()
                    {
                        limpiar();
                    }
                )        
        }        

    const aceptar = () => {    
       
        if(!balanceInput)
        {
            setMensaje('Ingrese un importe')
            setTipoLabel('warning')
            setOpenCollapse(true);
            return;
        }

        if(balanceInput > objTarjeta.balance)
        {
            redirectPage('/error', 'Importe ingresado excedido', null, null);  
            return;
        }

        let body = JSON.stringify({
            id: idTarjeta,
            numero: objTarjeta.numero,
            pin: objTarjeta.pin,
            habilitada: objTarjeta.habilitada,
            fechaVto: objTarjeta.fechaVto,
            balance: (objTarjeta.balance-balanceInput)
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
                        insertOperacion();
                    }
    
                } catch(err) {
                    console.log('error');
                    
                }})
            .finally(function()
                {
                    limpiar();
                }
            )        
    }

    const limpiar = () => {    
        setMensaje(null);
        setOpenCollapse(false)
        setImporte('');
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
                
                prefix={'$'}
                placeholder="Ingrese Importe"
                isNumericString={true}
                thousandSeparator={true}
                customInput={TextField}
                value={importe}
                disabled={true}
                onValueChange={(values) => {
                            setBalanceInput(values.floatValue)
                  }}
            /> 

            <NumericKeyboard 
                            setNumero={setImporte} 
                            numero={importe}
                            limpiar = {limpiar}
                            aceptar = {aceptar}
                            max = {16}
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