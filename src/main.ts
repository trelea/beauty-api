import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as session from 'express-session';
import { sessionConf } from './config/session.config';
import { corsConf } from './config/cors.config';
import { SwaggerSetup } from './config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(session(sessionConf));
    app.enableCors(corsConf);
    app.setGlobalPrefix('/api/v1');

    SwaggerSetup(app);
    await app.listen(3000, process.env.LOCAL_HOST);
}
bootstrap();
