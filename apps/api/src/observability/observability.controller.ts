import { Controller, Get, Header, Query } from "@nestjs/common";
import type { ApiSuccess, SignalStatusSummary } from "@signal-lab/contracts";
import { GetSignalStatusQueryDto } from "./dto/get-signal-status.query.dto";
import { ObservabilityService } from "./observability.service";

@Controller()
export class ObservabilityController {
  constructor(private readonly observabilityService: ObservabilityService) {}

  @Get("metrics")
  @Header("Content-Type", "text/plain; version=0.0.4")
  getMetrics(): string {
    return this.observabilityService.renderMetrics();
  }

  @Get("api/v1/observability/logs")
  getLogs(): ApiSuccess<ReturnType<ObservabilityService["listLogs"]>> {
    return { data: this.observabilityService.listLogs() };
  }

  @Get("api/v1/observability/sentry-events")
  getSentryEvents(): ApiSuccess<ReturnType<ObservabilityService["listSentryEvents"]>> {
    return { data: this.observabilityService.listSentryEvents() };
  }

  @Get("api/v1/observability/signals")
  async getSignalStatus(
    @Query() query: GetSignalStatusQueryDto,
  ): Promise<ApiSuccess<SignalStatusSummary>> {
    return {
      data: await this.observabilityService.getSignalStatus(query.runId, query.scenarioType),
    };
  }
}
