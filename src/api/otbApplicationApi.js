import api from "./axios";

export const submitOtbApplication = async (formData) => {
  const response = await api.post("/otb/apply", formData);
  return response.data;
};

export const getOtbApplications = async (params = {}) => {
  const response = await api.get("/admin/otb-applications", { params });
  return response.data;
};

export const getOtbApplicationStats = async () => {
  const response = await api.get("/admin/otb-applications/stats");
  return response.data;
};

export const getOtbApplicationById = async (id) => {
  const response = await api.get(`/admin/otb-applications/${id}`);
  return response.data;
};

export const updateOtbApplication = async (id, data) => {
  const response = await api.patch(`/admin/otb-applications/${id}`, data);
  return response.data;
};
