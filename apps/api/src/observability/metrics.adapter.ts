import { Injectable } from "@nestjs/common";
import type { ScenarioStatus, ScenarioType } from "@signal-lab/contracts";

type CounterKey = `${ScenarioType}:${ScenarioStatus}`;

const HISTOGRAM_BUCKETS = [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10];

@Injectable()
export class MetricsAdapter {
  private readonly counters = new Map<CounterKey, number>();
  private readonly seenRunIds = new Set<string>();
  private readonly durations: { scenarioType: ScenarioType; seconds: number }[] = [];
  private readonly httpCounters = new Map<string, number>();

  recordScenarioRun(input: {
    runId: string;
    scenarioType: ScenarioType;
    status: ScenarioStatus;
    durationMs: number;
  }): void {
    this.seenRunIds.add(input.runId);
    const key = `${input.scenarioType}:${input.status}` as CounterKey;
    this.counters.set(key, (this.counters.get(key) ?? 0) + 1);
    this.durations.push({
      scenarioType: input.scenarioType,
      seconds: input.durationMs / 1000,
    });
  }

  recordHttpRequest(method: string, path: string, statusCode: number): void {
    const key = `${method}:${path}:${statusCode}`;
    this.httpCounters.set(key, (this.httpCounters.get(key) ?? 0) + 1);
  }

  hasRun(runId: string): boolean {
    return this.seenRunIds.has(runId);
  }

  renderPrometheus(): string {
    const lines: string[] = [];

    lines.push("# HELP signal_lab_scenario_runs_total Scenario runs by type and status");
    lines.push("# TYPE signal_lab_scenario_runs_total counter");
    for (const [key, value] of this.counters.entries()) {
      const [scenarioType, status] = key.split(":");
      lines.push(
        `signal_lab_scenario_runs_total{scenario_type="${scenarioType}",status="${status}"} ${value}`,
      );
    }

    lines.push("");
    lines.push("# HELP signal_lab_scenario_run_duration_seconds Scenario run duration");
    lines.push("# TYPE signal_lab_scenario_run_duration_seconds histogram");

    const byType = new Map<string, number[]>();
    for (const d of this.durations) {
      const arr = byType.get(d.scenarioType) ?? [];
      arr.push(d.seconds);
      byType.set(d.scenarioType, arr);
    }

    for (const [scenarioType, values] of byType.entries()) {
      let cumulativeCount = 0;
      const sum = values.reduce((a, b) => a + b, 0);
      for (const bucket of HISTOGRAM_BUCKETS) {
        cumulativeCount = values.filter((v) => v <= bucket).length;
        lines.push(
          `signal_lab_scenario_run_duration_seconds_bucket{scenario_type="${scenarioType}",le="${bucket}"} ${cumulativeCount}`,
        );
      }
      lines.push(
        `signal_lab_scenario_run_duration_seconds_bucket{scenario_type="${scenarioType}",le="+Inf"} ${values.length}`,
      );
      lines.push(
        `signal_lab_scenario_run_duration_seconds_sum{scenario_type="${scenarioType}"} ${sum}`,
      );
      lines.push(
        `signal_lab_scenario_run_duration_seconds_count{scenario_type="${scenarioType}"} ${values.length}`,
      );
    }

    lines.push("");
    lines.push("# HELP http_requests_total Total HTTP requests");
    lines.push("# TYPE http_requests_total counter");
    for (const [key, value] of this.httpCounters.entries()) {
      const [method, path, statusCode] = key.split(":");
      lines.push(
        `http_requests_total{method="${method}",path="${path}",status_code="${statusCode}"} ${value}`,
      );
    }

    return `${lines.join("\n")}\n`;
  }
}
