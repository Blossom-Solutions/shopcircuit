import React from 'react'
import {Grid,Typography,Button,TextField,Select,FormControl} from '@material-ui/core'
import {connect} from 'react-redux'
import axios from 'axios'

function Admin({user,products,history}){
    const [product,setProduct] = React.useState({})
    const [post,setPost] = React.useState({})
    const [image,setImage] = React.useState(null) 
    const [isPost,setIsPost]= React.useState(false)
    const [isEdit,setIsEdit]= React.useState(false)
    const [isDelete,setIsDelete]= React.useState(false)

    const onPostChange= e =>{
        setPost({
            ...post,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    const onFile = e =>{
        setImage(e.target.files[0])
    }

    const onProductChange= e =>{
        setProduct({...product,
            [e.target.name]:e.target.value})
    }

    const handleDelete = ()=>{
        let id = product.productId
        let config = {
            headers: {Authorization: `Bearer ${user.userToken}`}
        }
        axios.delete(`/product/${id}`,config)
        .then(res=>{
            history.push('/')
            window.location.reload()
        })
        .catch(err => console.error(err))
    }

    const submitEdit = () =>{
        let {title,description,categories,price} = product;
        categories = categories.split(' ')
        let body = {
            title,
            description,
            categories,
            price
        }
        let config = {
            headers: {Authorization: `Bearer ${user.userToken}`}
        }
        axios.put(`/product/${product.productId}`,body,config)
        .then(res=>{
            history.push('/')
            window.location.reload()
        })
        .catch(err => console.error(err))

    }

    

    const onPost= e =>{
        e.preventDefault()
        let {title,description,categories,price} = post;
        categories = categories.split(' ')
        let body = {
            title,
            description,
            categories,
            price
        }
        let config = {
            headers: {Authorization: `Bearer ${user.userToken}`}
        }
        axios.post('/product',body,config)
        .then((res)=>{
            let formdata = new FormData()
            formdata.append('file',image)
            let config2={
                headers:{
                    Authorization: `Bearer ${user.userToken}`,
                    'content-type':'multipart/form-data'
                }
            }
            axios.put(`/product/img/${res.data.productId}`,formdata,config2)
        })
        .then(res =>{
            history.push('/')
            window.location.reload()
        })
        .catch(err => console.error(err))
    }

    return(
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Typography variant="h2">Admin Page</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={()=> setIsPost(!isPost)}>Post</Button>
                <Button variant="contained" color="primary" onClick={()=> setIsEdit(!isEdit)} >Edit</Button>
                <Button variant="contained" color="primary" onClick={()=> setIsDelete(!isDelete)} >Delete</Button>
            </Grid>
            <Grid item hidden={!isPost} style={{width:'90vw'}}>
                <form onSubmit={onPost}>
                    <TextField onChange={onPostChange} required name="title" value={post.title} fullWidth variant="outlined" label="Title" /><br/>
                    <TextField onChange={onPostChange} required name="description" value={post.description} fullWidth variant="outlined" multiline rows={15} label="Description" /><br/>
                    <TextField onChange={onPostChange} required name="categories" value={post.categories} fullWidth variant="outlined" label="categories" /><br/>
                    <TextField onChange={onPostChange} required name="price" value={post.price} fullWidth variant="outlined" type="number" label="price" /><br/><br/>
                    <input onChange={onFile} required type="file"/><br/><br/>
                    <Button variant="contained" type="submit" color="primary">Submit</Button>
                </form>
            </Grid>
            <Grid item hidden={!isEdit}  >
                <FormControl style={{width:'90vw'}}>
                    <Select
                      value={product.title}
                      onChange={e => setProduct(e.target.value)}   
                    >
                        {products.map(prod => <option value={prod}>{prod.title}</option>)}
                    </Select><br/>
                    <TextField onChange={onProductChange} required name="title" value={product.title} fullWidth variant="outlined" label="Title" /><br/>
                    <TextField onChange={onProductChange} required name="description" value={product.description} fullWidth variant="outlined" multiline rows={15} label="Description" /><br/>
                    <TextField onChange={onProductChange} required name="categories" value={product.categories} fullWidth variant="outlined" label="categories" /><br/>
                    <TextField onChange={onProductChange} required name="price" value={product.price} fullWidth variant="outlined" type="number" label="price" /><br/><br/>
                    <Button onClick={submitEdit} variant="contained" color="primary">Submit Changes</Button>
                </FormControl>
                
            </Grid>
            <Grid item hidden={!isDelete}>
                <FormControl style={{width:'90vw'}}>
                    <Select
                      value={product.title}
                      onChange={e => setProduct(e.target.value)}   
                    >
                        {products.map(prod => <option value={prod}>{prod.title}</option>)}
                    </Select><br/>
                    <Button onClick={handleDelete} variant="contained" color="secondary">Delete Selected</Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}

const mapState = state =>{
    const user = state.userReducer
    const products = state.productReducer
    return{user,products}
}


export default connect(mapState)(Admin)