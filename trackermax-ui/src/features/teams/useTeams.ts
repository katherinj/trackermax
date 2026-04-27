import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamsApi } from "./teams.api";

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: () => teamsApi.getAll().then((r) => r.teams),
  });
}

export function useTeamDetail(id: string) {
  return useQuery({
    queryKey: ["teams", id],
    queryFn: () => teamsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => teamsApi.create(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => teamsApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, userId }: { teamId: string; userId: string }) =>
      teamsApi.addMember(teamId, userId),
    onSuccess: (_, { teamId }) =>
      queryClient.invalidateQueries({ queryKey: ["teams", teamId] }),
  });
}
