import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerSetup = (app: INestApplication<any>) => {
    const config = new DocumentBuilder()
        .setTitle('Beauty APIs')
        .setDescription('Beauty APIs Desc')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
};
