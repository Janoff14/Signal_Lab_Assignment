import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { HttpMetricsInterceptor } from "./common/interceptors/http-metrics.interceptor";
import { MetricsAdapter } from "./observability/metrics.adapter";
import { AppModule } from "./app.module";

export async function createApp() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: { target: false },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpMetricsInterceptor(app.get(MetricsAdapter)));
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Signal Lab API")
    .setDescription("Observability playground — run scenarios, emit signals, verify traces.")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  return app;
}
