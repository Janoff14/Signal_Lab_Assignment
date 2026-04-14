import { IsIn, IsOptional, IsString } from "class-validator";

const SUPPORTED_SCENARIOS = [
  "system_error",
  "success",
  "validation_error",
  "slow_request",
  "teapot",
] as const;

export class CreateScenarioRunDto {
  @IsString()
  @IsIn(SUPPORTED_SCENARIOS)
  scenarioType!: (typeof SUPPORTED_SCENARIOS)[number];

  @IsOptional()
  @IsString()
  name?: string;
}
