import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP_REQUEST');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Extract request and response objects
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    // Record current timestamp
    const now = Date.now();

    // Determine if in production
    const isProduction =
      process.env.DB_HOST?.toLowerCase()?.includes('stage') ||
      process.env.NODE_ENV === 'local';

    // Construct log message
    const logMessage = (statusCode: number): string =>
      `METHOD - ${req.method} | URL - ${req.url} | ` +
      (!isProduction
        ? ''
        : `QUERY - ${JSON.stringify(req.query)} | PARAMS - ${JSON.stringify(req.params)} | BODY - ${JSON.stringify(req.body)} `) +
      `${this.getColorizedStatusCode(statusCode)} ${Date.now() - now} ms`;

    // Handle the observable
    return next.handle().pipe(
      tap(() => {
        // Log request details on success
        req.url && this.logger.log(logMessage(res.statusCode));
      }),
      catchError((error) => {
        // Log request details on error and rethrow the error
        req.url && this.logger.log(logMessage(error.status));
        throw error;
      }),
    );
  }

  private getColorizedStatusCode(statusCode: number): string {
    // ANSI escape codes for colorization
    const cyan = '\x1b[36m';
    const magenta = '\x1b[35m';
    // const yellow = '\x1b[33m';
    const reset = '\x1b[0m';

    const color = statusCode >= 400 ? magenta : cyan;

    return `${color}${statusCode}${reset}`;
  }
}
