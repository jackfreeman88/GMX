import { Body, Controller, Get, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseSuccess } from 'src/common/dto/response.dto';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const path = require('path');
export const documentStorage = {
  storage: diskStorage({
      destination: '../assets',
      filename: (req, file, cb) => {
          let filename: string =
              '/attachments/'+path.parse('attachment-').name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
      },
  }),
};

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('file', documentStorage))
  async createMessage(
    @Request() req,
    @Body() messageDto: MessageDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<IResponse> {
    const message = await this.messagesService.createMessage(req.user, messageDto, file);
      return new ResponseSuccess('Message has been sent', message);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users-list')
  async getUsersList(
    @Request() req,
    @Query('searchQuery') searchQuery: string
  ){
    const usersList = await this.messagesService.getUsersList(req.user, searchQuery)
    return new ResponseSuccess('usersList', usersList); 
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('all-messages')
  async getMessages(
    @Request() req,
    @Body('anotherUserSlug') anotherUserSlug: string,
    @Body('offset') offset: string
  ){
    const messages = await this.messagesService.getMessages(req.user, anotherUserSlug, +offset)
    return new ResponseSuccess('messages', messages);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get/unread/count')
  async getUnreadCount(
    @Request() req,
  ){
    const messages = await this.messagesService.getUnreadCount(req.user)
    return new ResponseSuccess('messages', messages);
  }

  @Get('get/unread-messages/all')
  async getAllUnreadMessages(
  ){
    const messages = await this.messagesService.getAllUnreadMessages();
    return new ResponseSuccess('messages', messages);
  }
}
