import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate()
   

   
  return (
   <div className="">
    <button onClick={() => navigate("/dashboard")} >
      Dashboard
    </button>
   
   </div>
  );
};

export default Home;