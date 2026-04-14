export type ScenarioStatus = "idle" | "running" | "success" | "error";
export type ScenarioType = "system_error" | "success" | "validation_error" | "slow_request" | "teapot";
export type SignalState = "pending" | "success" | "failed";

export const SCENARIO_RUNS_PATH = "/api/v1/scenario-runs";

export interface ApiSuccess<T> {
  data: T;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface CreateScenarioRunRequest {
  scenarioType: ScenarioType;
}

export interface ScenarioRunSummary {
  runId: string;
  scenarioType: ScenarioType;
  status: ScenarioStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ScenarioRunSubmitResponse extends ScenarioRunSummary {}

export interface SignalStatusSummary {
  runId: string;
  scenarioType: ScenarioType;
  metrics: SignalState;
  logs: SignalState;
  sentry: SignalState;
  lastUpdatedAt: string;
}
