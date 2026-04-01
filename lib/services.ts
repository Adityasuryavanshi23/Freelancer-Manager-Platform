import { api } from "./axios";
import { ClientInput, ClientUpdate, TaskInput, TaskUpdate } from "./types";

export const fetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addClients = async (clientData: ClientInput) => {
  try {
    const result = await api.post("clients", clientData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (taskData: TaskInput) => {
  try {
    const result = await api.post("/tasks", taskData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteTask = async (taskid: string) => {
  try {
    const ressult = await api.delete(`/tasks/${taskid}`);
    return ressult.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId: string, taskData: TaskUpdate) => {
  try {
    const result = await api.put(`/tasks/${taskId}`, taskData);
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (clientId: string) => {
  try {
    const result = await api.delete(`/clients/${clientId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};
export const updateClient = async (
  clientId: string,
  clientData: ClientUpdate,
) => {
  try {
    const result = await api.put(`/clients/${clientId}`, clientData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const formatDateAndTime = (dateString: string) => {
  const date = new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date} at ${time}`;
};
