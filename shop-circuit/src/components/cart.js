import React from 'react'
import {connect} from 'react-redux' 
import {Grid,Typography,Avatar,Divider,IconButton,Button} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import ClearIcon from '@material-ui/icons/Clear';
import delItem from '../redux/actions/delItem'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';

function Cart({cart,dispatch,history}){

    const totalProds = ()=>{
        let sum = 0
        const getSum = (a,b)=> a+b;
        cart.forEach(el=> sum = getSum(el.qty,sum))
        return sum
    }

    const totalPrice = ()=>{
        let sum = 0
        const getPrice = (a,b)=> (a.product.price * a.qty) + b;
        cart.forEach(el=> sum = getPrice(el,sum))
        return sum
    }

    return(
        <Grid item container style={{height:'100%',marginTop:'15px'}} direction="column" spacing={3} alignItems="center">
            <Grid item container direction="column" spacing={2} xs={12} sm={6}>
                <Grid item>
                    <Button startIcon={<ArrowBackIcon/>} variant="outlined" color="primary" onClick={()=> history.push('/')}>Continue shopping</Button>
                </Grid>
                {cart && cart.map(element =>(
                    <Grid item container direction="row" alignItems="center" spacing={1} style={{backgroundColor:'white',border:'1px solid #4F5D75',margin:'5px 5px',borderRadius:'15px'}} >
                        <Grid item>
                            <Avatar src={element.product.img} style={{height:'64px',width:'64px'}}/>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography>{`Product: ${element.product.title}`}</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography>{`Quantity: ${element.qty}`}</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography>{`Price: $${element.product.price}`}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={()=> dispatch(delItem(element))}>
                                <ClearIcon style={{color:'red'}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            
            {cart.length ? (
                <Grid item container direction="column" spacing={2} xs={12} sm={6} alignItems="center" >
                    <Grid item>
                        <Typography color="secondary" style={{textDecoration:'underline'}}>Your Cart</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{`Total Products: ${totalProds()}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="primary">{`Total Price: $${totalPrice()}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<CheckIcon/>} variant="outlined" style={{color:'green'}} onClick={()=> history.push('/checkout')} >Proceed to checkout</Button>
                    </Grid>
                </Grid>
                ): <Grid item><Typography variant="h3" color="secondary"> No Items in Cart!</Typography></Grid>}
        </Grid>
    )
}

const mapStateToProps = (state)=>{
    const cart = state.cartReducer
    return {cart}
}

export default withRouter(connect(mapStateToProps)(Cart))