import React,{useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Typography,Stepper,Step,StepLabel,StepContent,Button, TextField} from '@material-ui/core'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios'

const initState= {
    name:'',
    cvc:'',
    expiry:'',
    number:''
}

function Checkout({history,cart,user}){
    const [shipInfo,setShipInfo] = useState({})
    const [paymentInfo,setPaymentInfo] = useState(initState)
    const [currentIndex,setCurrentIndex] = useState(0)


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


    const handleShipInfo = e =>{
        setShipInfo({
            ...shipInfo,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    const handlePaymentInfo = e =>{
        setPaymentInfo({
            ...paymentInfo,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    const submitShipInfo = e =>{
        e.preventDefault()
        setCurrentIndex(currentIndex + 1)
    }

    const handlePaymentSubmit = e =>{
        e.preventDefault()
        setCurrentIndex(currentIndex +1)
    }

    //This is just a mockup, I used to use Paypal demos but has since been deprecated.
    const onFinish= ()=>{
        let body = {
            orderId: Math.floor(Math.random()*100000),
            shipInfo,
            products:cart,
            paymentInfo:`Paid with C.C ${paymentInfo.number.slice(paymentInfo.number.length -4)}`
        }
        const config = {
            headers: { Authorization: `Bearer ${user.userToken}` }
          };
        axios.post('/user/orders',body,config)
        .then(res=> history.push('/success'))
        .catch(err=> console.error(err))
    }

    return(
        
            <Stepper activeStep={currentIndex} orientation="vertical" style={{width:'100%'}}  >
                <Step style={{margin:'15px auto' }}>
                    <StepLabel>Please input your Shipping info</StepLabel>
                    <StepContent >
                        <form onSubmit={submitShipInfo} >
                        <TextField label="Your Full Name" required  name="fullName" value={shipInfo.fullName} onChange={handleShipInfo} /><br/><br/>
                        <TextField label="Your state" required   name="state" value={shipInfo.state} onChange={handleShipInfo} /><br/><br/>
                        <TextField label="Your city" required   name="city" value={shipInfo.city} onChange={handleShipInfo} /><br/><br/>
                        <TextField label="Your Address"  required  name="address" value={shipInfo.address} onChange={handleShipInfo} /><br/><br/>
                        <TextField label="Addition Details" required   name="details" value={shipInfo.details} onChange={handleShipInfo} /><br/><br/>
                        <Button onClick={()=> history.push('/cart')}  color="secondary" >Back To Cart</Button>
                        <Button type="submit"  color="primary" >Next</Button>
                        </form>
                    </StepContent>
                </Step>
                <Step style={{margin:'0 auto'}}>
                    <StepLabel>Please input your Payment info</StepLabel>
                    <StepContent>
                        <Cards
                        cvc={paymentInfo.cvc}
                        expiry={paymentInfo.expiry}
                        name={paymentInfo.name}
                        number={paymentInfo.number}
                        /><br/>
                        <form onSubmit={handlePaymentSubmit}>
                            <TextField label="Your C.C Number"  fullWidth inputProps={{minLength:16,maxLength:16}} required name="number" value={paymentInfo.number} onChange={handlePaymentInfo}/><br/><br/>
                            <TextField label="Your Expire Date" fullWidth inputProps={{maxLength:4}} required name="expiry" value={paymentInfo.expiry} onChange={handlePaymentInfo}/><br/><br/>
                            <TextField label="Credit Card Name" fullWidth inputProps={{maxLength:32}} required name="name" value={paymentInfo.name} onChange={handlePaymentInfo}/><br/><br/>
                            <TextField label="Your CVC" fullWidth inputProps={{maxLength:4}}  required name="cvc" value={paymentInfo.cvc} onChange={handlePaymentInfo}/><br/><br/>
                            <Button color="secondary" onClick={()=> setCurrentIndex(currentIndex-1)}>Back</Button>
                            <Button color="primary" type="submit">Next</Button> 
                        </form>
                    </StepContent>
                </Step>
                <Step style={{margin: '0 auto'}}>
                    <StepLabel>Confirm your Order Details</StepLabel>
                    <StepContent>
                        <Typography>{`Total Number of items: ${totalProds()}`}</Typography>
                        {cart && cart.map(el =>
                            <Typography variant="button">{`${el.product.title} x${el.qty} units`}</Typography> 
                        )}
                        <Typography variant="subtitle2">{`Amount to pay: $${totalPrice()}`}</Typography>
                        <Typography variant="subtitle2">{`Will receive: ${shipInfo.fullName}`}</Typography>
                        <Typography variant="subtitle2">{`Shipping to: ${shipInfo.address},${shipInfo.city},${shipInfo.state}`}</Typography>
                        <Typography variant="subtitle2">{`Paying with card ending in ${paymentInfo.number.slice(paymentInfo.number.length -4)}`}</Typography><br/>
                        <Button color="secondary" onClick={()=> setCurrentIndex(currentIndex-1)}>Back</Button>
                        <Button variant="contained" color="primary" onClick={onFinish}>Finish</Button>
                    </StepContent>
                </Step>
            </Stepper>
    )
}

const mapStateToProps = (state)=>{
    const cart = state.cartReducer
    const user = state.userReducer
    return {cart,user}
}

export default withRouter(connect(mapStateToProps)(Checkout))