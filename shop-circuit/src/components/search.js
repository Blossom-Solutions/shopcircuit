import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid,Typography} from '@material-ui/core'
import Product from './product'

function Search({location,results,dispatch}){
    React.useEffect(()=>{
    },[location])

    return(
        <Grid container direction="column" alignItems="center" style={{height:'100%'}}>
            <Grid item style={{marginTop:'15px'}}>
                <Typography variant="h3">{`Search results for: ${location.search.split('=')[1]}`}</Typography>
            </Grid>
            <Grid item container direction="row" alignItems="center" spacing={2} >
            {results.length ? results.map(prod => <Product prod={prod} key={prod.productId}/>):<Grid item><Typography variant="h4" color="error" style={{height:'100vh'}}>No results!, try searching something else</Typography></Grid>}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state,ownProps)=>{
    const products = state.productReducer
    const query = ownProps.location.search.split('=')[1]
    const re = new RegExp(query,'gi')
    const results = products.filter(prod=> prod.title.match(re) || prod.categories.some(tag=> tag.match(re)))
    return {results}
}

export default withRouter(connect(mapStateToProps)(Search))