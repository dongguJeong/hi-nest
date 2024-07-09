import { IsNumber, IsOptional, IsString } from "class-validator";

// dto : data transfer object

// readonly 한 것들만 읽을 수 있음
export class createMovieDTO{
    @IsString()
    readonly title : string;

    @IsNumber()
    readonly year : number;
    
    @IsString({each : true})
    @IsOptional()
    readonly genres : string[];
}