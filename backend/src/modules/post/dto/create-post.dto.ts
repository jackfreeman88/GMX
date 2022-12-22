import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePostDto {
    @IsNotEmpty()
    type: string

    @IsOptional()
    post: string

    @IsOptional()
    attachableType: string
}