import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateRepostDto {
    @IsNotEmpty()
    type: number

    @IsOptional()
    post: string

    @IsNotEmpty()
    repostId: number
}