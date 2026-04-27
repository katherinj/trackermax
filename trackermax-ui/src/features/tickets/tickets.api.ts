import { apiFetch } from "../../lib/api";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  complexity: number;
  project_id: string;
  creator_id: string;
  assignee_id?: string;
  created_at: string;
  updated_at: string;
  creator_first_name: string;
  creator_last_name: string;
  assignee_first_name?: string;
  assignee_last_name?: string;
  project_name: string;
}

export interface CreateTicketDto {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  complexity: number;
  project_id: string;
  assignee_id?: string;
}

export const ticketsApi = {
  getAll: () => apiFetch<{ tickets: Ticket[] }>("/tickets"),
  getById: (id: string) => apiFetch<{ ticket: Ticket }>(`/tickets/${id}`),
  create: (data: CreateTicketDto) =>
    apiFetch<{ ticket: Ticket }>("/tickets", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CreateTicketDto>) =>
    apiFetch<{ ticket: Ticket }>(`/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiFetch<{ message: string }>(`/tickets/${id}`, { method: "DELETE" }),
};
