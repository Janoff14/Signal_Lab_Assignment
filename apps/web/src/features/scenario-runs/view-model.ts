import type { ScenarioRunSubmitResponse } from "@signal-lab/contracts";

type RunUiStateInput = {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  selectedScenario: string;
  latestRun?: ScenarioRunSubmitResponse;
  nowIso?: string;
};

export function getRunSubmissionUiState(input: RunUiStateInput) {
  const lifecycleState = input.isPending
    ? "running"
    : input.isError
      ? "error"
      : input.isSuccess
        ? "success"
        : "idle";
  const disableSubmit = input.isPending;
  const acknowledgment = input.isSuccess
    ? `Run submitted for scenario '${input.selectedScenario}'.`
    : "";
  const fallbackScenario = input.selectedScenario || "none";
  const lastUpdatedAt = input.latestRun?.updatedAt ?? input.nowIso ?? "-";
  const statusTextByState = {
    idle: "Idle",
    running: "Running",
    success: "Success",
    error: "Error",
  } as const;

  return {
    disableSubmit,
    acknowledgment,
    lifecycleState,
    statusStrip: {
      status: statusTextByState[lifecycleState],
      runId: input.latestRun?.runId ?? "pending",
      scenarioType: input.latestRun?.scenarioType ?? fallbackScenario,
      lastUpdatedAt,
    },
  };
}
