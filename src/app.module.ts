import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 루트 모듈의 기능
// app.module은 app의 controller와 app의 provider만 가진다
// Movies는 MoviesModule로 합쳐 준다
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
