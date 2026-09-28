import api from "./axios"

// ========================================
// GET LOGGED-IN AGENT'S PROFILE
// ========================================

export const getMyAgentProfile = async () => {
  const response = await api.get("/agent/profile/me");

  return response.data;
};

// ========================================
// UPDATE AGENT PERSONAL + COMMUNICATION DETAILS
// ========================================

export const updateMyAgentProfile = async (payload) => {
  const response = await api.put("/agent/profile/personal", payload);

  return response.data;
};

// ========================================
// AGENT: MY BOOKINGS
// ========================================

export const getMyAgentBookings = async () => {
  const response = await api.get("/agent/bookings/my-bookings");

  return response.data;
};

// ========================================
// AGENT: MY WALLET TRANSACTIONS
// ========================================

export const getMyAgentWallet = async () => {
  const response = await api.get("/agent/wallet/my-transactions");

  return response.data;
};

// ========================================
// AGENT: MY VISA APPLICATIONS
// ========================================

export const getMyAgentVisaApplications = async () => {
  const response = await api.get("/agent/visa/my-applications");

  return response.data;
};

// ========================================
// AGENT: MY OTB APPLICATIONS
// (same backend jo user side use karta hai — token se hi
//  filter hota hai, isliye agent ke liye bhi generic kaam karta hai)
// ========================================

export const getMyAgentOtbApplications = async () => {
  const response = await api.get("/otb/my-applications");

  return response.data;
};