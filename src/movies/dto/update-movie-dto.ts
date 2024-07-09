import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { createMovieDTO } from "./create-movie-dto";


//npm i @nestjs/mapped-types
// allow transform DTO
// 모든 게 필수사항은 아닐때
// 업데이트를 할 때, 제목만, 연도만, 장르만 바꾸고 싶을 때
export class UpdateMovieDTO extends PartialType(createMovieDTO){}