import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../dist/apps/api/src/app.factory.js";
import { ScenarioRunsService } from "../dist/apps/api/src/scenario-runs/scenario-runs.service.js";

async function withRunningApp(run) {
  process.env.NODE_ENV = process.env.NODE_ENV ?? "test";
  process.env.DATABASE_URL = process.env.DATABASE_URL ?? "inmemory://scenario-runs-test";
  const app = await createApp();
  await app.listen(0);
  const address = app.getHttpServer().address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    await run({ app, baseUrl });
  } finally {
    await app.close();
  }
}

test("run submit path exists and returns success envelope", async () => {
  await withRunningApp(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/v1/scenario-runs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ scenarioType: "success" }),
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.equal(typeof payload.data.runId, "string");
    assert.equal(payload.data.scenarioType, "success");
    assert.equal(payload.data.status, "running");
    assert.equal(typeof payload.data.createdAt, "string");
    assert.equal(typeof payload.data.updatedAt, "string");
  });
});

test("invalid payload returns validation error and no run is created", async () => {
  await withRunningApp(async ({ app, baseUrl }) => {
    const service = app.get(ScenarioRunsService);
    const before = await service.getCreatedRunsCount();

    const response = await fetch(`${baseUrl}/api/v1/scenario-runs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    const payload = await response.json();

    const after = await service.getCreatedRunsCount();

    assert.equal(response.status, 400);
    assert.equal(payload.error.code, "HTTP_400");
    assert.equal(after, before);
  });
});

test("history endpoint returns recent run metadata", async () => {
  await withRunningApp(async ({ baseUrl }) => {
    await fetch(`${baseUrl}/api/v1/scenario-runs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ scenarioType: "success" }),
    });

    const response = await fetch(`${baseUrl}/api/v1/scenario-runs`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(Array.isArray(payload.data), true);
    assert.equal(payload.data.length > 0, true);
    assert.equal(typeof payload.data[0].runId, "string");
    assert.equal(typeof payload.data[0].updatedAt, "string");
  });
});

test("system_error emits metrics, logs, and sentry correlation", async () => {
  await withRunningApp(async ({ baseUrl }) => {
    const createResponse = await fetch(`${baseUrl}/api/v1/scenario-runs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ scenarioType: "system_error" }),
    });
    const createdPayload = await createResponse.json();
    const runId = createdPayload.data.runId;

    const metricsText = await (await fetch(`${baseUrl}/metrics`)).text();
    const logsPayload = await (await fetch(`${baseUrl}/api/v1/observability/logs`)).json();
    const sentryPayload = await (await fetch(`${baseUrl}/api/v1/observability/sentry-events`)).json();
    const signalPayload = await (
      await fetch(`${baseUrl}/api/v1/observability/signals?runId=${runId}&scenarioType=system_error`)
    ).json();

    assert.equal(createResponse.status, 201);
    assert.equal(createdPayload.data.status, "running");
    assert.equal(metricsText.includes('signal_lab_scenario_runs_total{scenario_type="system_error",status="error"}'), true);
    assert.equal(logsPayload.data.some((entry) => entry.runId === runId), true);
    assert.equal(sentryPayload.data.some((entry) => entry.runId === runId), true);
    assert.equal(signalPayload.data.metrics, "success");
    assert.equal(signalPayload.data.logs, "success");
    assert.equal(signalPayload.data.sentry, "success");
  });
});

test("signals endpoint validates required query parameters", async () => {
  await withRunningApp(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/v1/observability/signals`);
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error.code, "HTTP_400");
  });
});

test("signals endpoint returns 404 for unknown run id", async () => {
  await withRunningApp(async ({ baseUrl }) => {
    const response = await fetch(
      `${baseUrl}/api/v1/observability/signals?runId=run-does-not-exist&scenarioType=success`,
    );
    const payload = await response.json();

    assert.equal(response.status, 404);
    assert.equal(payload.error.code, "HTTP_404");
  });
});
