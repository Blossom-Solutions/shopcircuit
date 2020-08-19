const cartReducer = (state=[],action)=>{
    switch(action.type){
        case 'ADD_ITEM':
            return [...state,action.payload]
        case 'DEL_ITEM':
            return state.filter(items => items!==action.payload)
        default:
            return state
    }
}

export default cartReducer