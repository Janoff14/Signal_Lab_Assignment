import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import type { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === 418 && isHttpException) {
      response.status(418).json(exception.getResponse());
      return;
    }

    const payload = isHttpException
      ? (exception.getResponse() as
          | string
          | { message?: string | string[]; error?: string; details?: unknown })
      : { message: "Unexpected server error" };

    const message =
      typeof payload === "string"
        ? payload
        : Array.isArray(payload?.message)
          ? payload.message.join(", ")
          : (payload?.message ?? "Request failed");

    response.status(status).json({
      error: {
        code: `HTTP_${status}`,
        message,
        details: typeof payload === "string" ? undefined : payload,
      },
    });
  }
}
