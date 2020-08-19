export default function getProducts(products){
    return {
        type:'GET_PRODUCTS',
        payload:products
    }
}