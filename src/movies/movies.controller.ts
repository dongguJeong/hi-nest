import { 
    Controller,
    Get ,
    Param,
    Post, 
    Delete ,
    Patch,
    Body,
    Query,
    Req,
    Res
    
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { createMovieDTO } from './dto/create-movie-dto';
import { UpdateMovieDTO } from './dto/update-movie-dto';

// movies URL을 위한 컨트롤러
@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesServices : MoviesService){
    }

    // expressJS 위에서 동작하기 때문에 req,res를 받아서 쓸 수 있지만 좋지는 않다
    // nestJS는 expressJS외에 Fastify 같은 프레임워크로 전환을 시킬 수도 있다
    // fastify는 express 보다 2배 정도 빠르다.
    // 따라서 req,res 를 사용하는 걸 지양하도록 하자
    @Get()
    getAll() : Movie[]{
        return this.moviesServices.getAll();
    }  


    // query 요청하기
    // 가변 인자 보다 밑에 있으면 search를 가변인자로 인식함!!
    // 다른 Get 요청도 마찬가지
    @Get("search")
    search(@Query("year") searchingYear : string ){
        return `검색 중 : ${searchingYear}`;
    }

    @Get("/:id")
    // 원래는 movieId가 string 이지만 transform을 true로 설정해서
    // movieId를 숫자로 변경
    getOne(@Param('id') movieId : number) : Movie {
        return this.moviesServices.getOne(movieId);
    }

    @Post()
    create(@Body() movieData : createMovieDTO){
        return this.moviesServices.createMovie(movieData);
    }

    @Delete('/:id')
    deleteMovie(@Param('id') movieId : number){
        return this.moviesServices.deleteOne(movieId);
    }

    // @Put : 리소스의 모든 부분을 전송 
    // @Patch : 리소스의 일부분을 전송 
    // 원하는 게 있으면 반드시 요청을 해야 함
    @Patch('/:id')
    patchMovie(@Param('id') movieId : number, @Body() updateData : UpdateMovieDTO){
        return this.moviesServices.updateMovie(movieId,updateData);
    }

    
}
