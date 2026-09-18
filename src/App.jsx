import React, { useCallback, useEffect, useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Routing from './Routing/Routing'


import { getJwt, getUser } from './Services/useServices';
import setAuthToken from './utils/setAuthToken';
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './Services/cartServices';

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import UserContext from './contexts/UserContext';
import CartContext from './contexts/CartContext'

setAuthToken(getJwt());

const App = () => {

  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([])

  

  useEffect(()=> {
      try {
        
        const jwtUser = getUser();
        if(Date.now() >= jwtUser.exp * 1000){
          localStorage.removeItem("token");
          location.reload();
        } else {
          
          setUser(jwtUser);
        }
      } catch (err) {
        
      }
    },[]);

const addToCart = useCallback((product, quantity) => {
 
    const updateCart = [...cart];
    const productIndex = updateCart.findIndex(item => item.product._id === product._id);

    if(productIndex === -1){
      updateCart.push({product: product, quantity: quantity})
    }else {
      updateCart[productIndex].quantity += quantity;
    }
    setCart(updateCart);

    addToCartAPI(product._id, quantity).then(res => {
       toast.success("Product Added Succesfully");
      
    }).catch(err => {
      toast.error("Failed to add product");
      setCart(cart);
    })
},[cart])


  const removeFromCart = useCallback((id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch(err => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    })
  },[cart])

  const updateCart = useCallback((type, id) => {
    const oldCart = [...cart];
    const updateCart = [...cart];
    const productIndex = updateCart.findIndex(item=> item.product._id === id);
    if(type === "increase"){
      updateCart[productIndex].quantity += 1;
      setCart(updateCart);

      increaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!");
        setCart(oldCart);
        
      })
    }
     if(type === "decrease"){
      updateCart[productIndex].quantity -= 1;
      setCart(updateCart);

      decreaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!");
        setCart(oldCart);
        
      })
    }
  },[cart])

    const getCart = useCallback(() => {
      getCartAPI().then(res => {
        setCart(res.data)
      }).catch(err => {
        toast.error("Something went wrong");
      })
    },[user])
    

useEffect(()=> {
  if(user){
    getCart();
  }
 },[user]);


  return (

  <UserContext.Provider value={user}>
    <CartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart }}>
    <div className='app'>
       <Navbar/>
        <main>
        <ToastContainer position='bottom-right'/>
        <Routing />
        </main>
    </div>
    </CartContext.Provider>
  </UserContext.Provider>
   
  )
}

export default App
