import {useState, useEffect} from 'react';
const useLocalStorage = () => {
    const [cart,setCart] = useState(()=>{
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);
    function addToCart(ticket){
        setCart(prev => [...prev, ticket]);
    }
    function removeFromCart(id){
        setCart(prev => prev.filter(m=> m.id !== id));
    }
    return {cart,addToCart,removeFromCart};
}
export default useLocalStorage;