import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { MetricsAdapter } from "../../observability/metrics.adapter";

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsAdapter: MetricsAdapter) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const path = req.route?.path ?? req.url;

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          this.metricsAdapter.recordHttpRequest(method, path, res.statusCode);
        },
        error: (err) => {
          const statusCode = err?.status ?? err?.getStatus?.() ?? 500;
          this.metricsAdapter.recordHttpRequest(method, path, statusCode);
        },
      }),
    );
  }
}
