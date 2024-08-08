import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as session from 'express-session';
import { sessionConf } from './config/session.config';
import { corsConf } from './config/cors.config';
import { SwaggerSetup } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(session(sessionConf));
    app.useStaticAssets(join(process.cwd(), 'uploads'), {
        prefix: '/thumbnails'
    });
    app.enableCors(corsConf);
    app.setGlobalPrefix('/api/v1');

    SwaggerSetup(app);
    await app.listen(3000);
}
bootstrap();
