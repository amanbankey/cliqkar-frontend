import api from "./axios";

export const initiatePayment = async (paymentData) => {
  const response = await api.post(
    "/payment/initiate",
    paymentData
  );

  return response.data;
};