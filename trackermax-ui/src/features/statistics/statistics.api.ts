import { apiFetch } from "../../lib/api";

export interface DashboardStats {
  summary: {
    open_tickets: string;
    closed_tickets: string;
    total_projects: string;
    total_members: string;
  };
  byStatus: { status: string; count: string }[];
  byPriority: { priority: string; count: string }[];
  recentTickets: {
    id: string;
    title: string;
    status: string;
    priority: string;
    created_at: string;
    first_name: string;
    last_name: string;
  }[];
}

export const statisticsApi = {
  getDashboard: () => apiFetch<DashboardStats>("/statistics"),
};
