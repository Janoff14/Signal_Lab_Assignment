CREATE TABLE "scenario_runs" (
    "id" TEXT NOT NULL,
    "run_id" TEXT NOT NULL,
    "scenario_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scenario_runs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "scenario_runs_run_id_key" ON "scenario_runs"("run_id");
