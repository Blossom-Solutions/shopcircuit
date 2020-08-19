import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import getProducts from '../redux/actions/getProducts'
import Product from './product'
import axios from 'axios'
import {Grid} from '@material-ui/core'
import banner from '../banner.jpg'

const bannerStyles = {
    position:'absolute',
    top:'50%',left:'50%',
    transform:'translate(-50%,-50%)',
    fontSize:'20px',
    fontFamily:'Lato sans serif',
    fontWeight:'500'}

 function Home({products,dispatch}){

    useEffect(()=>{
        axios.get('/products')
        .then(res=>{
            dispatch(getProducts(res.data))
        })
    },[dispatch])

    return(
    <Grid item container direction="column" alignItems="center" >
        <Grid item style={{position:'relative',textAlign:'center',color:'white',background:'black',marginBottom:'10px'}}>
            <img src={banner} alt="banner" style={{objectFit:'cover',width:'90vw',height:'10em',opacity:'0.5'}}/>
            <p style={bannerStyles}>All your electronic needs, at click distance <span role="img" aria-label="victory hand">✌</span><br/>Discover our products <span role="img" aria-label="sign down">👇</span></p>
        </Grid>
        <Grid item container direction="row" spacing={2} >
            {products.length && products.map(element => <Product prod={element} key={element.productId}/>)}
        </Grid>
    </Grid>
    )
}

function mapStateToProps(state){
    const products = state.productReducer
    return {products}
}

export default connect(mapStateToProps)(Home)