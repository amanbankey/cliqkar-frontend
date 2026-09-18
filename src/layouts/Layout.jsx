import React, {useState} from "react";
import Navbar from "./Navbar";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);


  const hideNavbar =   location.pathname === "/signin" || location.pathname === "/signup" 

  const hideFooter = location.pathname === '/signin' || location.pathname === "/signup" || location.pathname === "/user-dashboard" || location.pathname === "/user-dashboard/profile" 
  || location.pathname === "/user-dashboard/wallet-history" || location.pathname === "/user-dashboard/visa-history" || location.pathname === "/user-dashboard/otb-history"

  return (
    <>
    
      {!hideNavbar && <Navbar show={show} setShow={setShow}/> }
      <Outlet />


      {!hideFooter && <Footer />}
      
      
    </>
  );
};

export default Layout;