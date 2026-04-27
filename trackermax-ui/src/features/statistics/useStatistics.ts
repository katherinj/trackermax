import { useQuery } from "@tanstack/react-query";
import { statisticsApi } from "./statistics.api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: statisticsApi.getDashboard,
  });
}
