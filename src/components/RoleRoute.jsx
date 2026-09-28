import React from "react";
import { Navigate } from "react-router-dom";

/*
  Login ke baad token + user (role ke saath) localStorage mein save hota hai
  (user signin, agent signin aur agent signup teeno mein).
  Yahan se hi role padh kar decide karte hain ki kaun kis dashboard mein ja sakta hai.
*/

const getStoredRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role || null;
  } catch (error) {
    return null;
  }
};

/* -------------------------------------------------------
   AGENT DASHBOARD GUARD
   - login nahi hai            -> Agent Sign in page
   - login hai par agent nahi  -> Home
   - agent hai                 -> dashboard khulta hai
------------------------------------------------------- */
export const AgentRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = getStoredRole();

  if (!token) {
    return <Navigate to="/agent/signin" replace />;
  }

  if (role !== "agent") {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* -------------------------------------------------------
   USER DASHBOARD GUARD
   - agent ko uske apne dashboard pe bhej deta hai
   - baaki sabke liye pehle jaisa hi (koi naya restriction nahi)
------------------------------------------------------- */
export const UserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = getStoredRole();

  if (token && role === "agent") {
    return <Navigate to="/agent-dashboard/profile" replace />;
  }

  return children;
};
