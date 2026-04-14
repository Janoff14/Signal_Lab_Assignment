import { Injectable } from "@nestjs/common";
import type { ScenarioType } from "@signal-lab/contracts";

export type SentryEvent = {
  timestamp: string;
  runId: string;
  scenarioType: ScenarioType;
  message: string;
};

@Injectable()
export class SentryAdapter {
  private readonly events: SentryEvent[] = [];

  captureRunFailure(input: { runId: string; scenarioType: ScenarioType; message: string }): void {
    this.events.unshift({
      timestamp: new Date().toISOString(),
      runId: input.runId,
      scenarioType: input.scenarioType,
      message: input.message,
    });
  }

  captureBreadcrumb(input: { scenarioType: ScenarioType; message: string }): void {
    this.events.unshift({
      timestamp: new Date().toISOString(),
      runId: "breadcrumb",
      scenarioType: input.scenarioType,
      message: `[breadcrumb] ${input.message}`,
    });
  }

  hasRun(runId: string): boolean {
    return this.events.some((event) => event.runId === runId);
  }

  listRecent(limit = 20): SentryEvent[] {
    return this.events.slice(0, limit);
  }
}
