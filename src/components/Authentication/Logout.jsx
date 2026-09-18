import React, { useEffect } from 'react'
import { logout } from '../../Services/useServices';

const Logout = () => {
    useEffect(()=> {
        logout();
        window.location = "/";
    },[])
  return null;
}
export default Logout