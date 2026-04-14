const apiBase = process.env.REHEARSAL_API_BASE_URL ?? "http://localhost:3001";

async function run() {
  const createResponse = await fetch(`${apiBase}/api/v1/scenario-runs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ scenarioType: "system_error" }),
  });
  if (!createResponse.ok) {
    throw new Error(`Run creation failed with status ${createResponse.status}`);
  }
  const created = await createResponse.json();
  const runId = created.data.runId;

  const metricsText = await (await fetch(`${apiBase}/metrics`)).text();
  const logsPayload = await (await fetch(`${apiBase}/api/v1/observability/logs`)).json();
  const sentryPayload = await (await fetch(`${apiBase}/api/v1/observability/sentry-events`)).json();

  const checks = [
    {
      name: "Prometheus metric",
      pass: metricsText.includes("signal_lab_scenario_runs_total"),
    },
    {
      name: "Loki-style structured log",
      pass: logsPayload.data.some((entry) => entry.runId === runId),
    },
    {
      name: "Sentry error capture",
      pass: sentryPayload.data.some((entry) => entry.runId === runId),
    },
  ];

  const failed = checks.filter((check) => !check.pass);
  if (failed.length > 0) {
    for (const check of failed) {
      console.error(`FAILED: ${check.name}`);
    }
    process.exit(1);
  }

  for (const check of checks) {
    console.log(`OK: ${check.name}`);
  }
}

run().catch((error) => {
  console.error("Rehearsal check failed:", error);
  process.exit(1);
});
