import "reflect-metadata";
import { createApp } from "./app.factory";

async function bootstrap() {
  const app = await createApp();
  const port = Number(process.env.PORT ?? process.env.API_PORT ?? 3001);
  await app.listen(port, "0.0.0.0");
  // Keep startup output explicit for baseline checks.
  console.log(`Signal Lab API listening on http://localhost:${port}`);
}

bootstrap();
