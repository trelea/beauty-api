import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class GetAppointmentsInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest<Request>();

        return next.handle().pipe(
            map((data: any[]) => {
                if (req.session.user.ROLE === 'ADMIN') return data;
                return data.filter((d) => {
                    if (d.userId)
                        return (
                            d.userId !== null &&
                            d.userId === req.session.user.id
                        );

                    if (d.googleUserId)
                        return (
                            d.googleUserId !== null &&
                            d.googleUserId === req.session.user.id
                        );
                });
            })
        );
    }
}
