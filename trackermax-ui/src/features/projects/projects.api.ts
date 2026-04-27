import { apiFetch } from "../../lib/api";

export interface Project {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  creator_id: string;
  created_at: string;
  creator_first_name: string;
  creator_last_name: string;
  ticket_count: string;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  image_url?: string;
}

export const projectsApi = {
  getAll: () => apiFetch<{ projects: Project[] }>("/projects"),
  getById: (id: string) => apiFetch<{ project: Project }>(`/projects/${id}`),
  create: (data: CreateProjectDto) =>
    apiFetch<{ project: Project }>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CreateProjectDto>) =>
    apiFetch<{ project: Project }>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiFetch<{ message: string }>(`/projects/${id}`, { method: "DELETE" }),
};
