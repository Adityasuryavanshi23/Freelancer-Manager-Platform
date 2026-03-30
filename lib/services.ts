import { api } from "./axios";

export const fetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addClients = async (clientData: {
  name: string;
  email: string;
  company?: string;
  userEmail: string;
}) => {
  try {
    const result = await api.post("clients", clientData);
    return result.data;
  } catch (error) {
    throw error;
  }
};
