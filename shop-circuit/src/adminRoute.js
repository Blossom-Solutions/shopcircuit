import React from 'react'
import {Route, Redirect,withRouter} from 'react-router-dom'

const AdminRoute =({component: Component, loggedIn,admin,...rest})=>{
    return(
        <Route {...rest} render={
            props => {
            if(loggedIn && admin){
                return <Component {...rest}{...props}/>
            } else{
                return <Redirect to={'/'}/>
            }
        }
        }
        />
    )
}

export default withRouter(AdminRoute);