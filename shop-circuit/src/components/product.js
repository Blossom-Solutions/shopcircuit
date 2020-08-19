import React from 'react'
import {Grid, Card,CardMedia,CardContent,CardHeader,CardActionArea, Typography} from '@material-ui/core'
import {withRouter} from 'react-router-dom'


 function Product({prod,history}){
  let titleCase = prod.title

  return(
    <Grid item xs={12} sm={4}  >
      <Card style={{maxWidth:'480px'}}>
        <CardActionArea onClick={()=>history.push(`/products/${prod.productId}`)}>
        <CardHeader title={titleCase} style={{fontFamily:'Lato sans-serif',minWidth:'200px'}} />
        <CardContent>
          <CardMedia image={prod.img} style={{height:'25em'}}/>
          <Typography variant="button" style={{fontSize:'14px',color:'#009000'}} component="span">{`$${prod.price}`}</Typography>
          <Typography>Buy Now!</Typography>
        </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default withRouter(Product)