import { Injectable } from "@nestjs/common";
import type { ScenarioStatus, ScenarioType } from "@signal-lab/contracts";

export type StructuredLogEntry = {
  timestamp: string;
  level: "info" | "error";
  event: "scenario.run.completed";
  runId: string;
  scenarioType: ScenarioType;
  status: ScenarioStatus;
  message: string;
};

@Injectable()
export class LogsAdapter {
  private readonly entries: StructuredLogEntry[] = [];

  recordScenarioRun(input: {
    runId: string;
    scenarioType: ScenarioType;
    status: ScenarioStatus;
    message: string;
  }): void {
    this.entries.unshift({
      timestamp: new Date().toISOString(),
      level: input.status === "error" ? "error" : "info",
      event: "scenario.run.completed",
      runId: input.runId,
      scenarioType: input.scenarioType,
      status: input.status,
      message: input.message,
    });
  }

  hasRun(runId: string): boolean {
    return this.entries.some((entry) => entry.runId === runId);
  }

  listRecent(limit = 20): StructuredLogEntry[] {
    return this.entries.slice(0, limit);
  }
}
