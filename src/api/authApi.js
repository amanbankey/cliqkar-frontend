import api from "./axios";

// ========================================
// USER SIGNUP
// ========================================

export const signupUser = async (formData) => {
  const response = await api.post("/auth/signup", formData);

  return response.data;
};

// ========================================
// USER SIGNIN
// ========================================

export const signinUser = async (formData) => {
  const response = await api.post("/auth/signin", formData);

  return response.data;
};

// ========================================
// ADMIN SIGNUP
// ========================================

export const signupAdmin = async (formData) => {
  const response = await api.post(
    "/auth/admin/signup",
    formData
  );

  return response.data;
};

// ========================================
// ADMIN LOGIN
// ========================================

export const signinAdmin = async (formData) => {
  const response = await api.post(
    "/auth/admin/login",
    formData
  );

  return response.data;
};

// ========================================
// GET LOGGED IN USER
// ========================================

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};