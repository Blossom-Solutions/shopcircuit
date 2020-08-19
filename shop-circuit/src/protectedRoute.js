import React from 'react'
import {Route, Redirect,withRouter} from 'react-router-dom'

const ProtectedRoute =({component: Component, loggedIn,...rest})=>{
    return(
        <Route {...rest} render={
            props => {
            if(loggedIn){
                return <Component {...rest}{...props}/>
            } else{
                return <Redirect to={'/login'}/>
            }
        }
        }
        />
    )
}

export default withRouter(ProtectedRoute);