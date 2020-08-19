const {admin,db} = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase')

firebase.initializeApp(config)

const {validateLogin, validateSignUp} = require('../util/validators')

exports.loginUser = (req,res)=>{
    const user ={
        email:req.body.email,
        password:req.body.password
    }

    const {valid,errors} = validateLogin(user);
    if(!valid) return res.status(400).json(errors);

    firebase
    .auth()
    .signInWithEmailAndPassword(user.email,user.password)
    .then(data=>{
        return data.user.getIdToken()
    })
    .then(token=>{
        return res.json({token})
    })
    .catch(err=>{
        console.error(err)
        return res.status(403).json({message:'wrong credentials'})
    })

}

exports.signUpUser = (req,res)=>{
    const newUser = {
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    }

    const {valid,errors} = validateSignUp(newUser)
    if(!valid){
        return res.status(400).json(errors)
    }

    let token, userId;

    db
    .doc(`/users/${newUser.username}`)
    .get()
    .then(doc=>{
        if(doc.exists){
            return res.status(400).json({username:'This username is already taken'})
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
        }
    })
    .then(data=>{
        userId = data.user.uid;
        return data.user.getIdToken()
    })
    .then(idToken=>{
        token = idToken;
        const userCredentials = {
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email,
            createdAt: Date.now(),
            orders:[],
            username:newUser.username,
            userId
        }
        return db.doc(`/users/${newUser.username}`).set(userCredentials)
    })
    .then(()=>{
        return res.status(201).json({token})
    })
    .catch(err=>{
        console.error(err)
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({email:'Email already in use'})
        } else{
            return res.status(500).json({message:'Something went wrong'})
        }
    })
}

exports.getUserData = (req,res)=>{
    let userData = {}
    db
    .doc(`/users/${req.user.username}`)
    .get()
    .then(doc=>{
        if(doc.exists){
            userData.userCredentials = doc.data()
            return res.json(userData)
        }
    })
    .catch(err=>{
        console.error(err)
        return res.status(500).json({error:err.code})
    })
}

exports.addOrder = (req,res)=>{
    let document = db.collection('users').doc(`${req.user.username}`)
    document.update({orders:admin.firestore.FieldValue.arrayUnion(req.body)})
    .then(()=>{
        res.json({ok:true})
    })
    .catch(err=>{
        console.error(err)
        return res.status(500).json({ok:false})
    })
}

exports.updateDetails = (req,res)=>{
    let document = db.collection('users').doc(`${req.user.username}`)
    document.update(req.body)
    .then(()=>{
        res.json({ok:true})
    })
    .catch(err=>{
        console.error(err)
        return res.status(500).json({ok:false})
    })
}