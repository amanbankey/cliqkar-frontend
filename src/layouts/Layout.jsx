import React, {useState} from "react";
import Navbar from "./Navbar";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);


  const hideNavbar =   location.pathname === "/admin-dashboard"

  const hideFooter = location.pathname === '/admin-dashboard'

  return (
    <>
    
      {!hideNavbar && <Navbar show={show} setShow={setShow}/> }
      <Outlet />

      {/* {show && <Signup setShow={setShow} />} */}
      
      {!hideFooter && <Footer />}
      
      
    </>
  );
};

export default Layout;