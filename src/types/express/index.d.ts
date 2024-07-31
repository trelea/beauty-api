import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        confirm:
            | {
                  otp: any;
                  payload: any;
              }
            | undefined
            | null;
        user: Record<string, any>;
    }
}
