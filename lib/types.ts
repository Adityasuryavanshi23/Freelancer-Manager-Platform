export type taskStatus = "pending" | "in-progress" | "completed";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status?: taskStatus;
  clientId: string;
  createdAt: string;
  updatedAt: string;
};

export interface Client {
  _id: string;
  name: string;
  email: string;
  company?: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientInput {
  name: string;
  email: string;
  company?: string;
  userEmail: string;
}

export interface ClientUpdate {
  name?: string;
  email?: string;
  company?: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  status?: taskStatus;
  userEmail: string;
  clientId: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: taskStatus;
}
