import React from 'react';
import {Route,Switch} from 'react-router-dom'
import NavBar from './components/navbar'
import Home from './components/homepage'
import Login from './components/login'
import SignUp from './components/signup'
import Search from './components/search'
import Cart from './components/cart'
import Checkout from './components/checkout'
import {Grid,Snackbar} from '@material-ui/core'
import {connect} from 'react-redux'
import ShowProduct from './components/showProduct'
import axios from 'axios'
import setLogin from './redux/actions/setLogin'
import setToken from './redux/actions/setToken'
import Sucess from './components/sucess'
import Profile from './components/profile'
import ProtectedRoute from './protectedRoute'
import CredentialsRoute from './credentialsRoute'
import AdminRoute from './adminRoute'
import Admin from './components/admin'


function App({user,dispatch}) {
  const [expired,setExpired] = React.useState(false)

  React.useEffect(()=>{
    if(user.userToken){
      localStorage.setItem('TOKEN',user.userToken)
      const config = {
        headers: { Authorization: `Bearer ${user.userToken}` }
      };
      console.log('yay')
      axios.get('/user',config)
      .then(res=>dispatch(setLogin(res.data.userCredentials)))
      .catch(err=>setExpired(true))
    } else{
      let storageToken = localStorage.getItem('TOKEN')
      if(storageToken){
        dispatch(setToken(storageToken))
      }
    }
  },[user.userToken,dispatch])

  return (
    <Grid container spacing={1} direction="column" alignItems="center" style={{backgroundColor:'#ffffff',overflow:'hidden'}}>
      <Grid item >
        <NavBar />
      </Grid>
      <Grid item container >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <CredentialsRoute path="/login" loggedIn={user.isLogged} component={Login}/>
          <CredentialsRoute path="/signup" loggedIn={user.isLogged} component={SignUp}/>
          <Route path="/search">
            <Search/>
          </Route>
          <Route path="/products/:id">
            <ShowProduct/>
          </Route>
          <ProtectedRoute path="/cart" component={Cart} loggedIn={user.isLogged} />
          <ProtectedRoute path="/checkout" component={Checkout} loggedIn={user.isLogged} />
          <ProtectedRoute path="/success" component={Sucess} loggedIn={user.isLogged} />
          <ProtectedRoute path="/profile" component={Profile} loggedIn={user.isLogged} />
          <AdminRoute path="/secret" component={Admin} loggedIn={user.isLogged} admin={user.userInfo.isAdmin}/>
        </Switch>
      </Grid>
      <Snackbar
            anchorOrigin={{
              vertical:'bottom',
              horizontal:'center'
            }}
            open={expired}
            autoHideDuration={4000}
            onClose={()=> setExpired(false)}
            message="❌Session Expired, please login again."

            ></Snackbar>
    </Grid>
  );
}

const mapStateToProps = (state)=>{
  const user = state.userReducer
  return {user}
}

export default connect(mapStateToProps)(App);
