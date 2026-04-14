-- AlterTable
ALTER TABLE "scenario_runs" ADD COLUMN "duration" INTEGER;
ALTER TABLE "scenario_runs" ADD COLUMN "error" TEXT;
ALTER TABLE "scenario_runs" ADD COLUMN "metadata" JSONB;
