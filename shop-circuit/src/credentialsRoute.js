import React from 'react'
import {Route, Redirect,withRouter} from 'react-router-dom'

const CredentialsRoute =({component: Component, loggedIn,...rest})=>{
    return(
        <Route {...rest} render={
            props => {
            if(!loggedIn){
                return <Component {...rest}{...props}/>
            } else{
                return <Redirect to={'/profile'}/>
            }
        }
        }
        />
    )
}

export default withRouter(CredentialsRoute);