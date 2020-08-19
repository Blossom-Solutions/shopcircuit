import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import setToken from '../redux/actions/setToken'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignUp({history,dispatch}) {
  const [credentials,setCredentials] = React.useState({})
  const [error,setError] = React.useState(false)
  const classes = useStyles();

  const handleCredentials = e =>{
    setCredentials({
        ...credentials,
        [e.currentTarget.name]:e.currentTarget.value
    })
}

  const handleSubmit = (e)=>{
    e.preventDefault()
    let body = {
      firstName:credentials.firstName,
      lastName:credentials.lastName,
      username:credentials.username,
      email:credentials.email,
      password:credentials.password
    }
    axios.post('/signup',body)
    .then(res =>{
      dispatch(setToken(res.data.token))
      history.push('/')
    })
    .catch(err=> setError(true))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                value={credentials.firstName}
                onChange={handleCredentials}
                inputProps={{minLength:2}}
                fullWidth
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                inputProps={{minLength:2}}
                value={credentials.lastName}
                onChange={handleCredentials}
              />
            </Grid>
            <Grid xs={12}>
              <TextField 
                variant="outlined"
                required
                fullWidth
                label="Username"
                name="username"
                value={credentials.userName}
                onChange={handleCredentials}
                inputProps={{minLength:5}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleCredentials}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                inputProps={{minLength:5}}
                value={credentials.password}
                onChange={handleCredentials}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
            anchorOrigin={{
              vertical:'bottom',
              horizontal:'center'
            }}
            open={error}
            autoHideDuration={4000}
            onClose={()=> setError(false)}
            message="❌ That username is already taken "

            ></Snackbar>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(connect()(SignUp))