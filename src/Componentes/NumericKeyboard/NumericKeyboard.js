import React, { useState, useEffect } from 'react';

import {Button, Grid, ButtonGroup} from "@material-ui/core";

   
export const NumericKeyboard = (props) =>
{
  const {numero, setNumero, limpiar, aceptar, max} = props

    return( 
      <>
       <Grid container alignItems="center" justify="center" direction="row" style={{ paddingTop: 10, paddingBottom: 1 }}>
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"1")}}> 1 </Button>
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"2")}}> 2 </Button>
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"3")}}> 3 </Button>
          </ButtonGroup>
      </Grid>

      <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>
        <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"4")}}> 4 </Button>
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"5")}}> 5 </Button>
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"6")}}> 6 </Button>
        </ButtonGroup>                  
      </Grid>

      <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>
        <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"7")}}> 7 </Button>
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"8")}}> 8 </Button>
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"9")}}> 9 </Button>
        </ButtonGroup>                  
      </Grid>
      <Grid container alignItems="center" justify="center" direction="row" style={{paddingBottom: 1 }}>
        <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => {if(numero.length < max) setNumero(numero+"0")}}> 0 </Button>
              <Button onClick={() => aceptar()} style={{fontSize: 11.5 }}> Aceptar </Button>          
        </ButtonGroup>                  
      </Grid>
      <Grid container alignItems="center" justify="center" direction="row">
        <ButtonGroup disableElevation variant="contained" color="primary">
              <Button onClick={() => limpiar()}  style={{fontSize: 11.5,width:132 }}> Limpiar </Button>          
        </ButtonGroup>                  
      </Grid>            
      </>
  )
}