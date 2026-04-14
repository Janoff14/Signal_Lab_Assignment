import { Injectable, NotFoundException } from "@nestjs/common";
import type { SignalStatusSummary } from "@signal-lab/contracts";
import { ScenarioRunsRepository } from "../scenario-runs/scenario-runs.repository";
import { LogsAdapter } from "./logs.adapter";
import { MetricsAdapter } from "./metrics.adapter";
import { SentryAdapter } from "./sentry.adapter";

@Injectable()
export class ObservabilityService {
  constructor(
    private readonly metricsAdapter: MetricsAdapter,
    private readonly logsAdapter: LogsAdapter,
    private readonly sentryAdapter: SentryAdapter,
    private readonly scenarioRunsRepository: ScenarioRunsRepository,
  ) {}

  renderMetrics(): string {
    return this.metricsAdapter.renderPrometheus();
  }

  listLogs() {
    return this.logsAdapter.listRecent();
  }

  listSentryEvents() {
    return this.sentryAdapter.listRecent();
  }

  async getSignalStatus(runId: string, scenarioType: "system_error" | "success"): Promise<SignalStatusSummary> {
    const exists = await this.scenarioRunsRepository.hasRun(runId);
    if (!exists) {
      throw new NotFoundException(`Run '${runId}' not found.`);
    }

    const metrics = this.metricsAdapter.hasRun(runId) ? "success" : "pending";
    const logs = this.logsAdapter.hasRun(runId) ? "success" : "pending";
    const sentry =
      scenarioType === "system_error"
        ? this.sentryAdapter.hasRun(runId)
          ? "success"
          : "failed"
        : "success";

    return {
      runId,
      scenarioType,
      metrics,
      logs,
      sentry,
      lastUpdatedAt: new Date().toISOString(),
    };
  }
}
