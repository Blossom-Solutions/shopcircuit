import React from 'react'
import {withRouter} from 'react-router-dom'
import {AppBar,Toolbar,IconButton,Button,makeStyles, Typography,TextField,Menu,MenuItem,Badge} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from '../logo.png'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => (
    {
        offset: theme.mixins.toolbar
    }
))

function NavBar({user,history,dispatch,cartItems}){
    const [anchor,setAnchor] = React.useState(null)
    const [query,setQuery] = React.useState('')
    const classes = useStyles()
    const handleSearch = (e)=>{
        if(e.key === 'Enter'){
            if(query){
                history.push(`/search?query=${query}`)
                setQuery('')
            }
        }
    }

    const handleLogout = ()=>{
        dispatch({type:'LOG_OUT'})
        localStorage.removeItem('TOKEN')
    }

    return(
        <div className={classes.offset}>
        <AppBar style={{backgroundColor:'#fff159'}} >
            <Toolbar>
                <IconButton edge="start"   onClick={()=> history.push('/')}>
                    <img src={logo} alt="logo" width="150px"/>
                </IconButton>
                <Typography variant="caption" style={{flexGrow:1}}>
                    <span role="img" aria-label="spark">⚡</span>
                </Typography>
                <TextField label="Search" value={query} onChange={(e)=> setQuery(e.target.value)} onKeyPress={handleSearch}/>
                {!user.isLogged ?<div><Button onClick={()=> history.push('/login')} >
                    Login
                </Button>
                <Button onClick={()=> history.push('/signup')}>
                    Sign Up
                </Button></div>
                :<div>
                    
                <IconButton onClick={()=> history.push('/cart')} >
                    <Badge badgeContent={cartItems} color="secondary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <IconButton onClick={e=> setAnchor(e.currentTarget)}>
                    <AccountCircleIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchor}
                    keepMounted
                    open={Boolean(anchor)}
                    onClose={()=> setAnchor(null)}
                >
                    <MenuItem onClick={()=> history.push('/profile')}>My Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
                {user.userInfo.isAdmin && <Button onClick={()=>history.push('/secret')}>Admin</Button>}
                </div>}
            </Toolbar>
        </AppBar>
        </div>
    )
}

const mapStateToProps = (state)=>{
    const user = state.userReducer
    const cartItems = state.cartReducer.length
    return {user,cartItems}
}

export default withRouter(connect(mapStateToProps)(NavBar))