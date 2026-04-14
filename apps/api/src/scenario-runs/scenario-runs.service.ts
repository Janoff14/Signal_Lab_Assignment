import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import type { ScenarioRunSubmitResponse, ScenarioStatus, ScenarioType } from "@signal-lab/contracts";
import { LogsAdapter } from "../observability/logs.adapter";
import { MetricsAdapter } from "../observability/metrics.adapter";
import { SentryAdapter } from "../observability/sentry.adapter";
import { ScenarioRunsRepository } from "./scenario-runs.repository";

@Injectable()
export class ScenarioRunsService {
  constructor(
    private readonly scenarioRunsRepository: ScenarioRunsRepository,
    private readonly metricsAdapter: MetricsAdapter,
    private readonly logsAdapter: LogsAdapter,
    private readonly sentryAdapter: SentryAdapter,
  ) {}

  async createRun(scenarioType: ScenarioType, name?: string): Promise<ScenarioRunSubmitResponse> {
    if (scenarioType === "validation_error") {
      this.logsAdapter.recordScenarioRun({
        runId: "n/a",
        scenarioType,
        status: "error",
        message: `Validation rejected: scenario '${scenarioType}' simulates invalid input.`,
      });
      this.metricsAdapter.recordScenarioRun({
        runId: "n/a",
        scenarioType,
        status: "error",
        durationMs: 0,
      });
      this.sentryAdapter.captureBreadcrumb({
        scenarioType,
        message: "validation_error scenario triggered",
      });
      throw new BadRequestException("Simulated validation error: invalid scenario input.");
    }

    if (scenarioType === "teapot") {
      const createdRun = await this.scenarioRunsRepository.createRun(scenarioType);
      await this.scenarioRunsRepository.updateRunStatus(createdRun.runId, "success", {
        easter: true,
      });
      this.metricsAdapter.recordScenarioRun({
        runId: createdRun.runId,
        scenarioType,
        status: "success",
        durationMs: 0,
      });
      this.logsAdapter.recordScenarioRun({
        runId: createdRun.runId,
        scenarioType,
        status: "success",
        message: "I'm a teapot",
      });
      throw new HttpException({ signal: 42, message: "I'm a teapot" }, 418);
    }

    const createdRun = await this.scenarioRunsRepository.createRun(scenarioType);
    await this.completeRun(createdRun.runId, scenarioType);
    return { ...createdRun };
  }

  private async completeRun(runId: string, scenarioType: ScenarioType): Promise<void> {
    const startMs = Date.now();

    if (scenarioType === "slow_request") {
      const delay = 2000 + Math.floor(Math.random() * 3000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    const finalStatus: ScenarioStatus = scenarioType === "system_error" ? "error" : "success";
    const completedRun = await this.scenarioRunsRepository.updateRunStatus(runId, finalStatus);
    const durationMs = Date.now() - startMs;

    this.metricsAdapter.recordScenarioRun({
      runId: completedRun.runId,
      scenarioType: completedRun.scenarioType,
      status: completedRun.status,
      durationMs,
    });
    this.logsAdapter.recordScenarioRun({
      runId: completedRun.runId,
      scenarioType: completedRun.scenarioType,
      status: completedRun.status,
      message: scenarioType === "slow_request"
        ? `Slow scenario completed in ${durationMs}ms.`
        : `Scenario '${completedRun.scenarioType}' completed with '${completedRun.status}'.`,
    });

    if (completedRun.status === "error") {
      this.sentryAdapter.captureRunFailure({
        runId: completedRun.runId,
        scenarioType: completedRun.scenarioType,
        message: "Simulated system_error scenario failure.",
      });
    }
  }

  async getCreatedRunsCount(): Promise<number> {
    return this.scenarioRunsRepository.getCreatedRunsCount();
  }

  async listRecentRuns(): Promise<ScenarioRunSubmitResponse[]> {
    return this.scenarioRunsRepository.listRecentRuns();
  }
}
