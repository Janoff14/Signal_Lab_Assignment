"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import type { ScenarioType } from "@signal-lab/contracts";
import {
  useRecentScenarioRuns,
  useSignalStatus,
  useSubmitScenarioRun,
} from "../features/scenario-runs/hooks";
import { getRunSubmissionUiState } from "../features/scenario-runs/view-model";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type ScenarioFormValues = {
  scenarioType: string;
  name?: string;
};

const STATUS_COLOR: Record<string, string> = {
  Idle: "text-muted-foreground",
  Running: "text-amber-500",
  Success: "text-emerald-500",
  Error: "text-destructive",
};

const SIGNAL_BADGE: Record<string, { label: string; cls: string }> = {
  success: { label: "OK", cls: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-800" },
  failed: { label: "Failed", cls: "bg-red-100 text-red-800" },
};

function ScenarioForm() {
  const mutation = useSubmitScenarioRun();
  const historyQuery = useRecentScenarioRuns();
  const signalQuery = useSignalStatus(
    mutation.data?.runId,
    mutation.data?.scenarioType
  );

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";
  const metricsUrl =
    process.env.NEXT_PUBLIC_METRICS_URL ?? "http://localhost:3001/metrics";

  const observabilityLinks = [
    {
      label: "Prometheus Metrics",
      href: metricsUrl,
      hint: "signal_lab_scenario_runs_total",
    },
    {
      label: "Loki Logs",
      href: `${apiBase}/observability/logs`,
      hint: "structured run log entries with runId",
    },
    {
      label: "Grafana Dashboard",
      href: process.env.NEXT_PUBLIC_GRAFANA_URL ?? "/grafana",
      hint: "run-level signal visualization",
    },
    {
      label: "Sentry Errors",
      href: `${apiBase}/observability/sentry-events`,
      hint: "system_error run capture",
    },
  ];

  const { register, handleSubmit, formState, watch } =
    useForm<ScenarioFormValues>({ defaultValues: { scenarioType: "" } });
  const selectedScenario = watch("scenarioType") || "";

  const uiState = getRunSubmissionUiState({
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    selectedScenario,
    latestRun: mutation.data,
  });

  const onSubmit = async (values: ScenarioFormValues) => {
    await mutation.mutateAsync({
      scenarioType: values.scenarioType as ScenarioType,
    });
  };

  return (
    <>
      {/* ── Run Scenario ── */}
      <Card>
        <CardHeader>
          <CardTitle>Run Scenario</CardTitle>
          <CardDescription>
            Select a scenario type and execute it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Scenario runner form"
            className="flex flex-wrap items-end gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="scenarioType"
                className="text-xs font-medium text-muted-foreground"
              >
                Scenario
              </label>
              <select
                id="scenarioType"
                className="h-8 rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                {...register("scenarioType", {
                  required: "Please select a scenario.",
                    validate: (value) =>
                    ["system_error", "success", "validation_error", "slow_request", "teapot"].includes(value)
                      ? true
                      : "Unsupported scenario selected.",
                })}
              >
                <option value="">-- Select a scenario --</option>
                <option value="success">success</option>
                <option value="system_error">system_error</option>
                <option value="validation_error">validation_error</option>
                <option value="slow_request">slow_request</option>
                <option value="teapot">teapot</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="scenarioName"
                className="text-xs font-medium text-muted-foreground"
              >
                Name (optional)
              </label>
              <input
                id="scenarioName"
                type="text"
                placeholder="e.g. my test run"
                className="h-8 rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                {...register("name")}
              />
            </div>

            <Button
              type="submit"
              disabled={uiState.disableSubmit}
              aria-label="Run selected scenario"
            >
              {mutation.isPending ? "Running\u2026" : "Run"}
            </Button>
          </form>

          {formState.errors.scenarioType?.message ? (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {formState.errors.scenarioType.message}
            </p>
          ) : null}
          {mutation.isError ? (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {mutation.error.message}
            </p>
          ) : null}
          {uiState.acknowledgment ? (
            <p className="mt-2 text-sm text-emerald-600">
              {uiState.acknowledgment}
            </p>
          ) : null}
        </CardContent>
      </Card>

      {/* ── Current Run Status ── */}
      <Card>
        <CardHeader>
          <CardTitle>Current Run Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4"
            aria-live="polite"
            aria-label="Current run status"
          >
            <div>
              <span className="text-muted-foreground">Status</span>
              <p
                className={`font-semibold ${STATUS_COLOR[uiState.statusStrip.status] ?? ""}`}
              >
                {uiState.statusStrip.status}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Run&nbsp;ID</span>
              <p className="font-mono text-xs break-all">
                {uiState.statusStrip.runId}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Scenario</span>
              <p>{uiState.statusStrip.scenarioType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Updated</span>
              <p className="font-mono text-xs">
                {uiState.statusStrip.lastUpdatedAt}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Verification Links ── */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Links</CardTitle>
          <CardDescription>
            Click to verify each observability signal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {observabilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-1 rounded-lg border border-border bg-muted/50 p-3 text-sm transition hover:border-primary/30 hover:shadow"
              >
                <span className="font-medium text-primary">{link.label}</span>
                <span className="text-xs text-muted-foreground">
                  Expect: {link.hint}
                </span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Signal States ── */}
      <Card>
        <CardHeader>
          <CardTitle>Signal States</CardTitle>
        </CardHeader>
        <CardContent>
          {mutation.isPending ? (
            <p className="text-sm text-amber-600">
              Signals pending while run is processing.
            </p>
          ) : null}
          {signalQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              Checking signals\u2026
            </p>
          ) : null}
          {signalQuery.data ? (
            <div className="flex flex-wrap gap-4 text-sm">
              {(["metrics", "logs", "sentry"] as const).map((key) => {
                const state = signalQuery.data[key];
                const badge = SIGNAL_BADGE[state] ?? SIGNAL_BADGE.pending;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="capitalize text-foreground">{key}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : null}

          {signalQuery.data &&
          (signalQuery.data.metrics === "pending" ||
            signalQuery.data.logs === "pending" ||
            signalQuery.data.sentry === "pending") ? (
            <p role="status" className="mt-3 text-xs text-amber-600">
              Signals are still propagating. Recheck in a few seconds before
              marking verification failed.
            </p>
          ) : null}

          {signalQuery.data &&
          (signalQuery.data.metrics === "failed" ||
            signalQuery.data.logs === "failed" ||
            signalQuery.data.sentry === "failed") ? (
            <div className="mt-3 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <p role="alert">
                One or more signals failed verification. Check API logs and
                observability endpoints.
              </p>
              <a
                href="#troubleshooting-checklist"
                className="mt-1 inline-block font-medium underline"
              >
                Open troubleshooting checklist
              </a>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* ── Recent Runs ── */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Runs</CardTitle>
        </CardHeader>
        <CardContent>
          {historyQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading history\u2026
            </p>
          ) : null}
          {historyQuery.isError ? (
            <p role="alert" className="text-sm text-destructive">
              Could not load run history.
            </p>
          ) : null}
          {!historyQuery.isLoading && !historyQuery.isError ? (
            historyQuery.data && historyQuery.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run ID</TableHead>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyQuery.data.map((run) => (
                    <TableRow key={run.runId}>
                      <TableCell className="font-mono text-xs">
                        {run.runId}
                      </TableCell>
                      <TableCell>{run.scenarioType}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            run.status === "success"
                              ? "default"
                              : run.status === "error"
                                ? "destructive"
                                : run.status === "running"
                                  ? "secondary"
                                  : "outline"
                          }
                          className={
                            run.status === "success"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : ""
                          }
                        >
                          {run.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {run.updatedAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">No runs yet.</p>
            )
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { enabled: false } },
      }),
    []
  );

  useEffect(() => {
    queryClient.setDefaultOptions({ queries: { enabled: true } });
    setMounted(true);
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto min-h-screen max-w-4xl space-y-6 px-4 py-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight">Signal Lab</h1>
          <p className="text-sm text-muted-foreground">
            Run scenarios, verify observability signals, trace everything.
          </p>
        </header>

        {mounted ? (
          <ScenarioForm />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Initializing\u2026
              </p>
            </CardContent>
          </Card>
        )}

        <Card id="troubleshooting-checklist">
          <CardHeader>
            <CardTitle>Troubleshooting Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              <li>
                Confirm API is running on port 3001 and{" "}
                <code className="rounded bg-muted px-1 text-xs">/metrics</code>{" "}
                responds.
              </li>
              <li>
                Run{" "}
                <code className="rounded bg-muted px-1 text-xs">
                  system_error
                </code>{" "}
                and verify new run appears in history.
              </li>
              <li>
                Verify logs/sentry status via signal state panel and backend
                endpoints.
              </li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </QueryClientProvider>
  );
}
