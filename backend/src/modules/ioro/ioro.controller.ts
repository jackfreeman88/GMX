import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseSuccess } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IOROService } from './ioro.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class IOROController {
    constructor(private readonly ioroService: IOROService){}

    @Get()
    async getAllIoro(){
        const ioro = await this.ioroService.getAllIoro();
        return new ResponseSuccess('Ioro',  ioro );
    }
}
