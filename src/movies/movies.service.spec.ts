import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { NotFoundException } from "@nestjs/common";
import { after } from "node:test";


describe('MoviesService',() => {
    let service : MoviesService;

    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule({
            providers : [MoviesService],
        }).compile();
        
        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined',() => {
        expect(service).toBeDefined();
    })

   describe('getAll', () => {
    it('should return an array', () => {
        const result = service.getAll();
        expect(result).toBeInstanceOf(Array);
    })
   });

   describe('getOne' , () => {
    it('should return movie' , () => {
       service.createMovie({
            title : "test",
            genres : ["test"],
            year: 2000,
        }); 
        const movie = service.getOne(1);
        expect(movie).toBeDefined();
        expect(movie.id).toEqual(1);
    });

    it('should throw 404 error' ,() => {
        try{
            service.getOne(999);
        }catch(e){
            expect(e).toBeInstanceOf(NotFoundException);
            expect(e.message).toEqual("영화를 찾을 수 없습니다");
        }
    })
    
   });

   describe('delete One' ,() => {
    it('delete movie' ,() => {
        service.createMovie({
            title : "test",
            genres : ["test"],
            year: 2000,
        });
        const beforeMovies = service.getAll();
        service.deleteOne(1); 
        const afterMovies = service.getAll();
        expect(afterMovies.length).toBeLessThan(beforeMovies.length);
    })

    it('should throw 404 error' ,() => {
        try{
            service.deleteOne(999);
        }catch(e){
            expect(e).toBeInstanceOf(NotFoundException);
            expect(e.message).toEqual("영화를 찾을 수 없습니다");
        }
    })
   });

   describe('create' , ()=>{
    it('should create movie',()=>{
        const beforeCreate = service.getAll().length;
        service.createMovie({
            title : "test",
            genres : ["test"],
            year: 2000,
        });
        const afterCreate = service.getAll().length;
        expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
   })

   describe('update' , () => {
    it('should update movie',() => {
        service.createMovie({
            title : "test",
            genres : ["test"],
            year: 2000,
        });
        service.updateMovie(1,{title : 'update movie'});
        const movie = service.getOne(1);
        expect(movie.title).toEqual('update movie');
    });

    it('should throw 404 error' ,() => {
        try{
            service.deleteOne(999);
        }catch(e){
            expect(e).toBeInstanceOf(NotFoundException);
            expect(e.message).toEqual("영화를 찾을 수 없습니다");
        }
    });
   })
})