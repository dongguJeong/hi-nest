import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// npm run test으로 하는 것은 테스팅 서버에서 돌아가는 것이고
// insomnia에서 동작하는 것은 실제 어플리케이션 서버다. 둘이 완전 다른 서버다
// 테스팅 서버와 실제 어플리케이션 환경을 일치시켜주어야 한다

describe('AppController (e2e)', () => {
  let app: INestApplication;


  // beforeEach를 하면 테스트를 할 때마다 새로 어플리케이션을 만든다 => beforeAll로 변경
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스팅 서버에서는 app을 새로 만든다!
    app = moduleFixture.createNestApplication();

    // 실제 어플리케이션 환경과 동일하도록 main.ts 에서 app의 설정에 대한 부분들을 복사해오자!
    app.useGlobalPipes(new ValidationPipe({

      // 허락한 데코레이터가 아니면 거절
      whitelist : true,
  
      // 데코레이션이 없으면 request 자체를 거절
      forbidNonWhitelisted : true,
  
      // 유저가 보낸 것을 우리가 원하는 타입으로 변환
      transform : true,
    }));

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my Movie API');
  });

  describe('/movies' , () => {
    it('GET' , () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
      })
    
      it('POST' ,() => {
        return request(app.getHttpServer())
        .post('/movies')
        .send({
          title : 'test',
          year : 2000,
          genres : ['test'],
        })
        .expect(201);
      });

      it('POST 400' ,() => {
        return request(app.getHttpServer())
        .post('/movies')
        .send({
          title : 'test',
          year : 2000,
          genres : ['test'],
          other : "thing"
        })
        .expect(400);
      });

      it('DELETE' ,() => {
        return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
      });
  });
  

  describe('/movies/:id' ,() => {
    it('GET 200' ,() => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });

    it('GET 404' ,() => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });

    it('PATCH' ,() => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title : 'finish!!!'
      })
      .expect(200);
    });

    it('DELETE' ,() => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
    
   
  })

  
});
