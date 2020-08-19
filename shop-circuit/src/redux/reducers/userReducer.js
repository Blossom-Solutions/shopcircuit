const initialState = {
    userInfo:{},
    userToken:'',
    isLogged:false
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SET_TOKEN':
            return {...state,userToken:action.payload}
        case 'SET_LOGIN':
            return {...state,
                    userInfo:action.payload,
                    isLogged:true}
        case 'LOG_OUT':
            return initialState
        default:
            return state
    }
}

export default userReducer;