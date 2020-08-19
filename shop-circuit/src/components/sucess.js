import React from 'react'
import {Grid,Typography} from '@material-ui/core'
import tickMark from '../tickmark.png'
import {withRouter} from 'react-router-dom'

 function Sucess({history}){

    React.useEffect(()=>{
        setTimeout(()=>{
        history.push('/')
        window.location.reload()},3000)
    })

    return(
        <Grid container direction="column" alignItems="center" style={{height:'100vh'}}>
            <Grid item>
                <img alt="tickmark" src={tickMark} style={{maxWidth:'400px'}} />
            </Grid>
            <Grid item>
                <Typography>Your Products have been succesfully ordered!</Typography>
            </Grid>
        </Grid>
    )
}

export default withRouter(Sucess)