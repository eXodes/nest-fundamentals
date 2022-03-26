import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('[PROCESSED TIME]');

    res.on('finish', () => {
      console.timeEnd('[PROCESSED TIME]');
    });
    next();
  }
}
