const isEmpty = string=>{
    string.trim() === '' ? true :false;
}

const isEmail = email =>{
    const emailRegEx  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(email.match(emailRegEx)){
        return true
    } else {
        return false
    }
}

exports.validateLogin = data=>{
    let errors = {}
    isEmpty(data.email) && (errors.email = 'Must not be empty');
    isEmpty(data.password) && (errors.password = 'Must not be empty');
    return{
        errors,
        valid: Object.keys(errors).length===0 ? true : false
    }
}

exports.validateSignUp = data=>{
    let errors = {}
    if(isEmpty(data.email)){
        errors.email = "Must not be empty"
    } else if(!isEmail(data.email)){
        errors.email = "Must be a valid email"
    }

    isEmpty(data.username) && (errors.username = "Username mustn't be empty")
    isEmpty(data.firstName) && (errors.firstName = "First name mustn't be empty")
    isEmpty(data.lastName) && (errors.lastName = "Last Name mustn't be empty")
    (isEmpty(data.password) || data.password.length <6 ) && (errors.password = "Password not valid")
    return{
        errors,
        valid: Object.keys(errors).length === 0 ? true:false
    }
}