import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { ScenarioStatus, ScenarioType, ScenarioRunSubmitResponse } from "@signal-lab/contracts";

type PersistedRun = {
  runId: string;
  scenarioType: ScenarioType;
  status: ScenarioStatus;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class ScenarioRunsRepository implements OnModuleDestroy {
  private readonly prisma: PrismaClient | null;
  private inMemoryRuns: PersistedRun[] = [];

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl?.startsWith("inmemory://")) {
      if (process.env.NODE_ENV !== "test") {
        throw new Error("inmemory:// DATABASE_URL is allowed only in test mode.");
      }
      this.prisma = null;
      return;
    }

    if (!databaseUrl) {
      throw new Error("DATABASE_URL must be set. Use inmemory:// only for tests.");
    }

    this.prisma = new PrismaClient();
  }

  async createRun(scenarioType: ScenarioType): Promise<ScenarioRunSubmitResponse> {
    if (this.prisma) {
      const runId = this.createRunId();
      const row = await this.prisma.scenarioRun.create({
        data: {
          runId,
          scenarioType,
          status: "running",
        },
      });

      return {
        runId: row.runId,
        scenarioType: row.scenarioType as ScenarioType,
        status: "running",
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      };
    }

    const now = new Date().toISOString();
    const run: PersistedRun = {
      runId: this.createRunId(),
      scenarioType,
      status: "running",
      createdAt: now,
      updatedAt: now,
    };
    this.inMemoryRuns.push(run);
    return run;
  }

  async getCreatedRunsCount(): Promise<number> {
    if (this.prisma) {
      return this.prisma.scenarioRun.count();
    }

    return this.inMemoryRuns.length;
  }

  async updateRunStatus(runId: string, status: ScenarioStatus, metadata?: Record<string, unknown>): Promise<ScenarioRunSubmitResponse> {
    if (this.prisma) {
      const data: Record<string, unknown> = { status };
      if (metadata) data.metadata = metadata;
      const row = await this.prisma.scenarioRun.update({
        where: { runId },
        data,
      });

      return {
        runId: row.runId,
        scenarioType: row.scenarioType as ScenarioType,
        status: row.status as ScenarioStatus,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      };
    }

    const run = this.inMemoryRuns.find((entry) => entry.runId === runId);
    if (!run) {
      throw new Error(`Run ${runId} not found`);
    }
    run.status = status;
    run.updatedAt = new Date().toISOString();
    return run;
  }

  async listRecentRuns(limit = 10): Promise<ScenarioRunSubmitResponse[]> {
    if (this.prisma) {
      const rows = await this.prisma.scenarioRun.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return rows.map((row) => ({
        runId: row.runId,
        scenarioType: row.scenarioType as ScenarioType,
        status: row.status as ScenarioStatus,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      }));
    }

    return [...this.inMemoryRuns]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  }

  async hasRun(runId: string): Promise<boolean> {
    if (this.prisma) {
      const count = await this.prisma.scenarioRun.count({ where: { runId } });
      return count > 0;
    }

    return this.inMemoryRuns.some((run) => run.runId === runId);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.prisma) {
      await this.prisma.$disconnect();
    }
  }

  private createRunId(): string {
    return `run-${randomUUID()}`;
  }
}
