const productReducer = (state=[],action)=>{
    switch(action.type){
        case 'ADD_PRODUCT':
            return [...state,action.payload];
        case 'REMOVE_PRODUCT':
            return state.filter(item => item !== action.payload);
        case 'GET_PRODUCTS':
            if(state === action.payload){
                return state
            }else{
                return [...action.payload]
            }
        default:
            return state;
    }
}

export default productReducer