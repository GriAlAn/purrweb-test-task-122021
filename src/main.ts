import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 9000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Purrweb Tesk Task Project')
    .setDescription('Документация REST API -- purrweb, study, internship')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api', app, document)

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
