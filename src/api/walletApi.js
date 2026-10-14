import api from "./axios";

export const getMyWallet = async () => (await api.get("/wallet/my-transactions")).data;
export const payFromWallet = async (payload) => (await api.post("/wallet/debit", payload)).data;
export const initiateWalletRecharge = async (amount) => (await api.post("/wallet/recharge/initiate", { amount })).data;
export const getAdminWalletTransactions = async (params = {}) => (await api.get("/admin/wallet/transactions", { params })).data;
