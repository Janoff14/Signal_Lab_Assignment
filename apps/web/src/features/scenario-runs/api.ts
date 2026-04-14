import { SCENARIO_RUNS_PATH } from "@signal-lab/contracts";
import type {
  ApiError,
  ApiSuccess,
  CreateScenarioRunRequest,
  SignalStatusSummary,
  ScenarioRunSummary,
  ScenarioRunSubmitResponse,
} from "@signal-lab/contracts";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";
const endpointPath = SCENARIO_RUNS_PATH.startsWith("/api/v1")
  ? SCENARIO_RUNS_PATH.slice("/api/v1".length)
  : SCENARIO_RUNS_PATH;

export type SubmitResult =
  | { ok: true; data: ScenarioRunSubmitResponse }
  | { ok: false; status: number; message: string };

export async function submitScenarioRun(
  payload: CreateScenarioRunRequest,
): Promise<SubmitResult> {
  const response = await fetch(`${baseUrl}${endpointPath}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Run submission failed";
    try {
      const body = await response.json();
      message = body?.error?.message ?? body?.message ?? message;
    } catch { /* non-JSON response */ }
    return { ok: false, status: response.status, message };
  }

  const data = (await response.json()) as ApiSuccess<ScenarioRunSubmitResponse>;
  return { ok: true, data: data.data };
}

export async function fetchRecentScenarioRuns(): Promise<ScenarioRunSummary[]> {
  const response = await fetch(`${baseUrl}${endpointPath}`);

  if (!response.ok) {
    const error = (await response.json()) as ApiError;
    throw new Error(error.error.message || "Failed to load run history");
  }

  const data = (await response.json()) as ApiSuccess<ScenarioRunSummary[]>;
  return data.data;
}

export async function fetchSignalStatus(
  runId: string,
  scenarioType: string,
): Promise<SignalStatusSummary> {
  const response = await fetch(
    `${baseUrl}/observability/signals?runId=${encodeURIComponent(runId)}&scenarioType=${scenarioType}`,
  );
  if (!response.ok) {
    const error = (await response.json()) as ApiError;
    throw new Error(error.error.message || "Failed to load signal status");
  }
  const data = (await response.json()) as ApiSuccess<SignalStatusSummary>;
  return data.data;
}
