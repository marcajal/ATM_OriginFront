import React, { useState, useEffect} from "react";
import {
        IconButton }from "@material-ui/core";
import { Alert} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';



const Message = (props) => {        
    const [backgroundColor, setBackgroundColor] = useState()
    const [color, setColor] = useState()
    const [border, setBorder] = useState()
    
    const {tipoLabel, openCollapse, mensaje, setOpenCollapse} = props

    useEffect(() => {
        (() => {
            if(tipoLabel === "warning"){
                setBackgroundColor('yellow')
                setColor("black")
                setBorder("1px solid")
            }
            else if (tipoLabel === "success") {
                setBackgroundColor('limegreen')
                setBorder("1px solid black")
            }
            else {
                setBorder("1px solid black")

            }
        })()
    }, [tipoLabel])

    var style;
    
    if(tipoLabel === 'warning')
    {
        style = {
            backgroundColor: backgroundColor,
            color:color,
            border: border
        };
    }
    else if(tipoLabel === 'success')
    {
        style = {
            backgroundColor: backgroundColor,
            border: border
        };
    }
    else{
        style = {
            border: border
        };
    }


    return (
        <>
            <Collapse in={openCollapse}>
                <Alert variant="filled" severity={tipoLabel} style={style}
                    action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => { setOpenCollapse(false)}}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        {mensaje}      
                </Alert>
            </Collapse>               
        </>       
    )}     

export default Message