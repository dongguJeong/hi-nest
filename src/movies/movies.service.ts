import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { createMovieDTO } from './dto/create-movie-dto';
import { UpdateMovieDTO } from './dto/update-movie-dto';

// 가짜 db

//dependancy injection
// moviesService를 import 할 때 타입만 지정해줘도 알아서 다 추가됨
@Injectable()
export class MoviesService {
    private movies : Movie[] = [];

    getAll() : Movie[]{
        return this.movies;
    }

    getOne(id : number) : Movie{
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie){
            throw new NotFoundException("영화를 찾을 수 없습니다");
        }
        return movie;

    }

    deleteOne(id : number) : boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    createMovie(movieData : createMovieDTO){
        this.movies.push({
            id : this.movies.length+1,
            ...movieData
        });
    } 

    updateMovie(id : number, updateData : UpdateMovieDTO){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie,...updateData});
    }

}
