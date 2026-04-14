import { Body, Controller, Get, Post } from "@nestjs/common";
import { SCENARIO_RUNS_PATH } from "@signal-lab/contracts";
import type { ApiSuccess, ScenarioRunSubmitResponse } from "@signal-lab/contracts";
import { CreateScenarioRunDto } from "./dto/create-scenario-run.dto";
import { ScenarioRunsService } from "./scenario-runs.service";

@Controller(SCENARIO_RUNS_PATH)
export class ScenarioRunsController {
  constructor(private readonly scenarioRunsService: ScenarioRunsService) {}

  @Post()
  async createScenarioRun(
    @Body() body: CreateScenarioRunDto,
  ): Promise<ApiSuccess<ScenarioRunSubmitResponse>> {
    const data = await this.scenarioRunsService.createRun(body.scenarioType, body.name);
    return { data };
  }

  @Get()
  async listScenarioRuns(): Promise<ApiSuccess<ScenarioRunSubmitResponse[]>> {
    const data = await this.scenarioRunsService.listRecentRuns();
    return { data };
  }
}
