import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class GetMastersInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        const isAdmin = context.switchToHttp().getRequest<Request>().session
            ?.user?.ROLE;

        return next.handle().pipe(
            map((data) => {
                if (isAdmin === 'ADMIN') return data;

                return data.map((d) => {
                    const {
                        contact,
                        email,
                        birthDate,
                        created_at,
                        updated_at,
                        ...rest
                    } = d;

                    return { ...rest };
                });
            })
        );
    }
}
