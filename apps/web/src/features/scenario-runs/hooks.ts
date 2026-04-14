import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateScenarioRunRequest, ScenarioRunSubmitResponse } from "@signal-lab/contracts";
import { fetchRecentScenarioRuns, fetchSignalStatus, submitScenarioRun, type SubmitResult } from "./api";
import { scenarioRunQueryKeys } from "./query-keys";

export function useSubmitScenarioRun() {
  const queryClient = useQueryClient();

  return useMutation<SubmitResult, Error, CreateScenarioRunRequest>({
    mutationKey: scenarioRunQueryKeys.all,
    mutationFn: (payload) => submitScenarioRun(payload),
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
