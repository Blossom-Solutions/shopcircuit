const functions = require('firebase-functions');
const app = require('express')()

const auth = require('./util/auth')
const adminAuth = require('./util/adminAuth')

const {
    getAllProducts,
    postProduct,
    deleteProduct,
    editProduct,
    uploadProductPhoto,
    getSingle
} = require('./API/products')

const {
    loginUser,
    signUpUser,
    getUserData,
    addOrder,
    updateDetails
} = require('./API/users')

//products routes

app.get('/products',getAllProducts)

app.get('/product/:id',getSingle)

app.post('/product',adminAuth,postProduct)

app.put('/product/img/:id',adminAuth,uploadProductPhoto)

app.delete('/product/:id',adminAuth,deleteProduct)

app.put('/product/:id',adminAuth,editProduct)

//User Routes
app.post('/login',loginUser)

app.post('/signup',signUpUser)

app.get('/user',auth,getUserData)

app.post('/user/orders',auth,addOrder)

app.put('/user',auth,updateDetails)

exports.api = functions.https.onRequest(app)