import React from 'react'
import {Grid,Typography,Card,CardHeader,CardContent,CardActions,Chip,IconButton,Button,Snackbar} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import addItem from '../redux/actions/addItem'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


function ShowProduct({match,dispatch,history,user}){
    const [product,setProduct] = React.useState({})
    const [error,setError] = React.useState(false)
    const [notFound,setNotFound] = React.useState(false)
    const [qty,setQty] = React.useState(1)

    React.useEffect(()=>{
        axios.get(`/product/${match.params.id}`)
        .then(res => setProduct(res.data))
        .catch(err=> setNotFound(true))
    },[match])

    const handleAddCart = ()=>{
        if(user.isLogged){
            dispatch(addItem(
                {
                    product,
                    qty
                }
            ))
            history.push('/cart')
        } else{
            setError(true)
        }
    }

    return( 
        <Grid item container style={{background:'white',borderRadius:'15px'}}>
            {notFound ? <p>Not Found</p>:<Grid item container direction="column" alignItems="center"   >
            <Grid item   >
                <img src={product.img} alt="product" style={{objectFit:'cover', maxWidth:'80vw'}}/>
            </Grid>
            <Grid item  >
                <Card >
                    <CardHeader title={product.title} titleTypographyProps={{align:'center'}} />
                    <CardContent>
                        {product.categories && product.categories.map(el => <Chip variant="outlined" key={el}color="primary" label={el} />)}
                        <Typography variant="h6" color="secondary">Product Description:</Typography>
                        <Typography variant="body1" style={{maxWidth:'80vw',whiteSpace:'pre-wrap'}}>{product.description}</Typography>
                        <Typography variant="overline" style={{color:'green'}}>{`Price: $${product.price}`}</Typography>
                    </CardContent>
                    <CardActions>
                        
                        <IconButton onClick={()=> setQty(qty+1)} style={{color:'blue'}}>
                            <AddIcon/>
                        </IconButton>
                        
                        <IconButton onClick={()=> qty > 0 && setQty(qty-1)} style={{color:'red'}}>
                            <RemoveIcon/>
                        </IconButton>
                        <Typography variant="button">{`Quantity: ${qty}`}</Typography>
                        <Button variant="outlined" disabled={qty===0} color="primary" onClick={handleAddCart} startIcon={<AddShoppingCartIcon/>}>ADD TO CART</Button>
                    </CardActions>
                </Card>
            </Grid>
            </Grid>
            }
            <Snackbar
            anchorOrigin={{
              vertical:'bottom',
              horizontal:'center'
            }}
            open={error}
            autoHideDuration={4000}
            onClose={()=> setError(false)}
            message="❌You Must be logged in first!"

            ></Snackbar>
        </Grid>
        
    )
}

const mapStateToProps= (state)=>{
    const user = state.userReducer
    return{user}
}


export default withRouter(connect(mapStateToProps)(ShowProduct))