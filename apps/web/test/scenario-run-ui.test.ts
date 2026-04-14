import assert from "node:assert/strict";
import test from "node:test";
import { getRunSubmissionUiState } from "../src/features/scenario-runs/view-model";

test("submission acknowledgment appears on success", () => {
  const state = getRunSubmissionUiState({
    isPending: false,
    isSuccess: true,
    isError: false,
    selectedScenario: "system_error",
    nowIso: "2026-04-14T19:00:00.000Z",
  });

  assert.equal(state.acknowledgment, "Run submitted for scenario 'system_error'.");
  assert.equal(state.lifecycleState, "success");
  assert.equal(state.statusStrip.status, "Success");
});

test("submit button is disabled while request is pending", () => {
  const state = getRunSubmissionUiState({
    isPending: true,
    isSuccess: false,
    isError: false,
    selectedScenario: "success",
    nowIso: "2026-04-14T19:00:00.000Z",
  });

  assert.equal(state.disableSubmit, true);
  assert.equal(state.lifecycleState, "running");
});

test("status strip includes metadata for latest run", () => {
  const state = getRunSubmissionUiState({
    isPending: false,
    isSuccess: true,
    isError: false,
    selectedScenario: "success",
    latestRun: {
      runId: "run-123",
      scenarioType: "success",
      status: "running",
      createdAt: "2026-04-14T18:59:59.000Z",
      updatedAt: "2026-04-14T19:00:00.000Z",
    },
    nowIso: "2026-04-14T19:01:00.000Z",
  });

  assert.equal(state.statusStrip.runId, "run-123");
  assert.equal(state.statusStrip.scenarioType, "success");
  assert.equal(state.statusStrip.lastUpdatedAt, "2026-04-14T19:01:00.000Z");
});
