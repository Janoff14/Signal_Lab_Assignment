import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { LogsAdapter } from "./observability/logs.adapter";
import { MetricsAdapter } from "./observability/metrics.adapter";
import { ObservabilityController } from "./observability/observability.controller";
import { ObservabilityService } from "./observability/observability.service";
import { SentryAdapter } from "./observability/sentry.adapter";
import { ScenarioRunsController } from "./scenario-runs/scenario-runs.controller";
import { ScenarioRunsRepository } from "./scenario-runs/scenario-runs.repository";
import { ScenarioRunsService } from "./scenario-runs/scenario-runs.service";

@Module({
  controllers: [HealthController, ScenarioRunsController, ObservabilityController],
  providers: [
    ScenarioRunsService,
    ScenarioRunsRepository,
    ObservabilityService,
    MetricsAdapter,
    LogsAdapter,
    SentryAdapter,
  ],
})
export class AppModule {}
