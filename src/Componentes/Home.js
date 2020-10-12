import React, { useState, useEffect } from 'react';
import DataTable            from "../Componentes/DataTable"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import { Link} from "react-router-dom";
import {NumericKeyboard} from '../Componentes/NumericKeyboard/NumericKeyboard'
import {
    Container,
    Tooltip,
    Fab,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import Message from '../Componentes/Message';

import NumberFormat from 'react-number-format';




export const Home = () =>
{
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState('info');
    const [openCollapse, setOpenCollapse] = useState(false);


    const aceptar = () => {    

        console.log('numeroTarjeta: ',numeroTarjeta);
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
        .then(response => {console.log('response: '+JSON.stringify(response))})
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
        setNumeroTarjeta('');
        setMensaje(null);
        setOpenCollapse(false)
    }
               
    // useEffect(function () {
    //         obtenerDatos();
    // },[])
    
    
    console.log('numeroTarjeta: '+ numeroTarjeta);
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