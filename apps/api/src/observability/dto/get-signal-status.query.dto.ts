import { IsIn, IsNotEmpty, IsString } from "class-validator";

const SUPPORTED_SCENARIOS = ["system_error", "success"] as const;

export class GetSignalStatusQueryDto {
  @IsString()
  @IsNotEmpty()
  runId!: string;

  @IsString()
  @IsIn(SUPPORTED_SCENARIOS)
  scenarioType!: (typeof SUPPORTED_SCENARIOS)[number];
}
