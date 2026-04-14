import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateScenarioRunRequest } from "@signal-lab/contracts";
import { fetchRecentScenarioRuns, fetchSignalStatus, submitScenarioRun } from "./api";
import { scenarioRunQueryKeys } from "./query-keys";

export function useSubmitScenarioRun() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: scenarioRunQueryKeys.all,
    mutationFn: (payload: CreateScenarioRunRequest) => submitScenarioRun(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: scenarioRunQueryKeys.history });
    },
  });
}

export function useRecentScenarioRuns() {
  return useQuery({
    queryKey: scenarioRunQueryKeys.history,
    queryFn: fetchRecentScenarioRuns,
  });
}

export function useSignalStatus(runId?: string, scenarioType?: string) {
  return useQuery({
    queryKey: [...scenarioRunQueryKeys.signals, runId ?? "", scenarioType ?? ""] as const,
    queryFn: () => fetchSignalStatus(runId as string, scenarioType as string),
    enabled: Boolean(runId && scenarioType),
    refetchInterval: 2000,
  });
}
