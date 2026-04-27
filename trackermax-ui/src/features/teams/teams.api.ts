import { apiFetch } from "../../lib/api";

export interface Team {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  creator_first_name: string;
  creator_last_name: string;
  member_count: string;
}

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const teamsApi = {
  getAll: () => apiFetch<{ teams: Team[] }>("/teams"),
  getById: (id: string) =>
    apiFetch<{ team: Team; members: TeamMember[] }>(`/teams/${id}`),
  create: (name: string) =>
    apiFetch<{ team: Team }>("/teams", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
  addMember: (teamId: string, userId: string) =>
    apiFetch(`/teams/${teamId}/members`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    }),
  removeMember: (teamId: string, userId: string) =>
    apiFetch(`/teams/${teamId}/members/${userId}`, { method: "DELETE" }),
  delete: (id: string) => apiFetch(`/teams/${id}`, { method: "DELETE" }),
};
