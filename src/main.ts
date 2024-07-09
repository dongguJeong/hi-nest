import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 데이터의 유효성 검사
  //npm i class-validator class-transformer 도 같이 진행
  // dto 파일들로 가서 특수한 데코레이터를 쓰자
  app.useGlobalPipes(new ValidationPipe({

    // 허락한 데코레이터가 아니면 거절
    whitelist : true,

    // 데코레이션이 없으면 request 자체를 거절
    forbidNonWhitelisted : true,

    // 유저가 보낸 것을 우리가 원하는 타입으로 변환
    transform : true,
  }))

  await app.listen(3000);
}
bootstrap();
