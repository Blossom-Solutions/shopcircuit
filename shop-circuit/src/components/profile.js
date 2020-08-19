import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid,Typography,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, TextField} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios'

 function Profile({userInfo,user}){

    const initValue= {
        firstName:userInfo.firstName,
        lastName:userInfo.lastName,
        email:userInfo.email
    }

    const [settingsOn,setSettingsOn] = React.useState(true)
    const [settings,setSettings] = React.useState(initValue)

    const onChange= e =>{
        setSettings({
            ...settings,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${user.userToken}` }
          };
        
        axios.put('/user',settings,config)
        .then(res => window.location.reload())
        .catch(err=> console.error(err))
    }

    return(
        <Grid container direction="column" alignItems="center" spacing={3} style={{marginTop:'15px'}}>
            <Grid item>
                <Typography variant="h4">{`Hello ${userInfo.firstName}! :)`}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2">{`You currently are Lv.${userInfo.orders.length}, each order gives you a Lvl up!`}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={()=> setSettingsOn(!settingsOn)} variant="contained" color="primary" startIcon={<SettingsIcon/>}>Profile</Button>
            </Grid>
            <Grid item hidden={settingsOn}>
                <form onSubmit={onSubmit}>
                    <Grid item>
                        <TextField label="First Name" name="firstName" value={settings.firstName} onChange={onChange} ></TextField>
                    </Grid>
                    <Grid item>
                        <TextField label="Last Name" name="lastName" value={settings.lastName} onChange={onChange}  />
                    </Grid>
                    <Grid item>
                        <TextField label="Email" name="email" value={settings.email} onChange={onChange}  />
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary">Submit Changes</Button>
                    </Grid>
                </form>
            </Grid>
            <Grid item>
                <Typography>Order History</Typography>
            </Grid>
            <Grid item>
                {userInfo.orders.length ? (
                <TableContainer style={{border:'1px solid black'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">Products</TableCell>
                                <TableCell align="center">Payment</TableCell>
                                <TableCell align="center">Shipping</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userInfo.orders.map(element =>
                                <TableRow key={element.orderId}>
                                    <TableCell component="th" scope="row">{element.orderId}</TableCell>
                                    <TableCell align="center">{element.products.length}</TableCell>
                                    <TableCell align="right">{element.paymentInfo}</TableCell>
                                    <TableCell align="right">{`${element.shipInfo.address}, ${element.shipInfo.city}, ${element.shipInfo.state}`}</TableCell>{}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>) : <Typography color="error">No items yet.</Typography>}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state)=>{
    const userInfo = state.userReducer.userInfo
    const user = state.userReducer
    return {userInfo,user}
}

export default withRouter(connect(mapStateToProps)(Profile))