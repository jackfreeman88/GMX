import { ForbiddenException, Injectable, NotFoundException, Res, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron } from '@nestjs/schedule';
import { Op, Sequelize } from 'sequelize';
import { Message } from 'src/models/message.model';
import { MessageDto } from './dto/message.dto';
import { JwtUserDTO } from '../auth/dto/JwtUser.dto';
import { Brand } from 'src/models/brand.model';
import { User } from 'src/models/user.model';
import { HelperService } from 'src/services/Helper.service';
import { MailServiceService } from 'src/mail-service/mail-service.service';
const { FRONEND_BASE_URL, SITE_NAME, ASSETS_URL } = process.env;
var filesize = require('file-size');
var fs = require("fs");
const path = require('path');
@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectModel(Brand)
    private brandModel: typeof Brand,
    @InjectModel(Message)
    private messageModel: typeof Message,
    @InjectModel(User)
    private userModel: typeof User,
    private mailService?: MailServiceService,
  ) { }

  async createMessage(jwtUserDTO: JwtUserDTO, messageDto: MessageDto, file){
    const receiver = await this.userModel.findOne({
      where: {
          slug: messageDto.slug
      }
    });
    if(!receiver) throw new NotFoundException();
    const senderUser = await this.userModel.findOne({
      where: {
        id: jwtUserDTO.id
      }
    });
    if(!senderUser) throw new NotFoundException();
    // if(receiver.stateId !== senderUser.stateId){
    //   throw new ForbiddenException('You can message seller who is in your state only');
    // }
    if(file !== undefined){
      var stats = fs.statSync(file.path)
      var fileSizeInBytes = stats.size;
      var fileSize = filesize(fileSizeInBytes, {
        fixed: 1,
        spacer: ' '
      }).human('si');
      var fileType = path.parse(file.originalname).ext.split('.')[1]
    }
    const message = this.messageModel.create({
      fromId: jwtUserDTO.id,
      toId: receiver.id,
      message: file !== undefined ? file.filename : messageDto.message,
      attachment: file !== undefined ? 1 : 2,
      fileType: file !== undefined ? fileType : null,
      fileSize: file !== undefined ? fileSize : null,
      readStatus: 2,
    });
    return message
  }

  async getUsersList(jwtUserDTO: JwtUserDTO, searchQuery: string){
    // const usersList = await this.messageModel.findAll({
    //   include: [
    //     { 
    //       model: User,
    //       as: 'sender',
    //       attributes: ['id', 'firstName', 'lastName', 'brandName', 'slug', 'profilePath', 'role'],
    //     },
    //     { 
    //       model: User,
    //       as: 'receiver',
    //       attributes: ['id', 'firstName', 'lastName', 'brandName', 'slug', 'profilePath', 'role'],
    //     }
    //   ],
    //   attributes: [
    //     'message',
    //     // [Sequelize.literal(`CASE fromId WHEN ${jwtUserDTO.id} THEN toId ELSE fromId END`), 'conversationId'],
    //     // [Sequelize.literal(`MAX(Message.id)`), 'lastIdOfConversation'],
    //     // [Sequelize.literal(`(select count(*) from (select CASE WHEN fromId = ${jwtUserDTO.id} THEN toId ELSE fromId END as conversationId from messages where (fromId = ${jwtUserDTO.id} OR toId = ${jwtUserDTO.id}) and readStatus = 2) as t group by t.conversationId)`), 'unreadCount'],
    //     // [Sequelize.literal(`(SELECT SUM(CASE WHEN toId = ${jwtUserDTO.id} AND readStatus =2 THEN 1 ELSE 0 END) AS UnreadMessages from messages where fromId = ${jwtUserDTO.id} or toId = ${jwtUserDTO.id} GROUP by LEAST(fromId, toId), GREATEST(fromId, toId))`), 'unreadCount'],
    //     ['createdAt', 'messageTime']
    //   ],
    //   // attributes: {
    //   //   include: [
    //   //       [
    //   //           Sequelize.literal(`(
    //   //               SELECT COUNT(*)
    //   //               FROM reactions AS reaction
    //   //               WHERE
    //   //                   reaction.postId = post.id
    //   //                   AND
    //   //                   reaction.type = "Laugh"
    //   //           )`),
    //   //           'laughReactionsCount'
    //   //       ]
    //   //   ]
    //   // },
    //   where: {
    //     [Op.or]: [
    //       {fromId: jwtUserDTO.id},
    //       {toId: jwtUserDTO.id}
    //     ],
    //     id: {
    //       [Op.in]: [Sequelize.literal(`(select t.lastIdOfConversation from (select MAX(id) as lastIdOfConversation, CASE WHEN fromId = ${jwtUserDTO.id} THEN toId ELSE fromId END as conversationId from messages where (fromId = ${jwtUserDTO.id} OR toId = ${jwtUserDTO.id}) group by conversationId) as t)`)]
    //     }
    //   },
    //   order: [
    //     [ 'createdAt', 'desc' ]
    //   ],
    //   // group: [ 'conversationId']
    // })
    const user = await this.userModel.findOne({
      where: {
        id: jwtUserDTO.id
      }
    });
    if(!user){
      throw new NotFoundException();
    }
    let userFilter = {};
    if(+user.role === 2){
      userFilter = {
        [Op.or]: [
            {
              // [Op.or]: [
              //   {'$sender.firstName$': { [Op.like]: `%${searchQuery}%`}},
              //   {'$sender.lastName$': { [Op.like]: `%${searchQuery}%`}},
              // ],
              '$sender.businessName$': { [Op.like]: `%${searchQuery}%`}
            },
            {
              // [Op.or]: [
              //   {'$receiver.firstName$': { [Op.like]: `%${searchQuery}%`}},
              //   {'$receiver.lastName$': { [Op.like]: `%${searchQuery}%`}},
              // ]
              '$receiver.businessName$': { [Op.like]: `%${searchQuery}%`}
            }
        ]
      }
    } else {
      userFilter = {
        [Op.or]: [
          {
            [Op.or]: [
              {'$sender.brandName$': { [Op.like]: `%${searchQuery}%`}},
              {'$sender.brandName$': { [Op.like]: `%${searchQuery}%`}},
            ],
          },
          {
            [Op.or]: [
              {'$receiver.brandName$': { [Op.like]: `%${searchQuery}%`}},
              {'$receiver.brandName$': { [Op.like]: `%${searchQuery}%`}},
            ]
          }
        ]
      }
    }

    const usersList = await this.messageModel.findAll({
      include: [
        { 
          model: User,
          as: 'sender',
          // attributes: ['id', 'firstName', 'lastName', 'brandName', 'slug', 'profilePath', 'role'],
          attributes: ['id', 'businessName', 'brandName', 'slug', 'profilePath', 'role'],
        },
        { 
          model: User,
          as: 'receiver',
          // attributes: ['id', 'firstName', 'lastName', 'brandName', 'slug', 'profilePath', 'role'],
          attributes: ['id', 'businessName', 'brandName', 'slug', 'profilePath', 'role'],
        }
      ],
      attributes: [
        [Sequelize.literal(`(select attachment from messages where id=MAX(Message.id))`), 'isAttachment'],
        [Sequelize.literal(`(select message from messages where id=MAX(Message.id))`), 'message'],
        [Sequelize.literal(`(select createdAt from messages where id=MAX(Message.id))`), 'lastMsgTime'],
        [Sequelize.literal(`CASE fromId WHEN ${jwtUserDTO.id} THEN toId ELSE fromId END`), 'conversationId'],
        [Sequelize.literal(`(select count(*) from messages where toId=${jwtUserDTO.id} and fromId=${`conversationId`} and readStatus=2)`), 'unreadCount']
      ],
      // attributes: {
      //   include: [
      //       [Sequelize.literal(`(select message from messages where id=MAX(Message.id))`), 'message'],
      //       [Sequelize.literal(`(select createdAt from messages where id=MAX(Message.id))`), 'lastMsgTime'],
      //       [Sequelize.literal(`CASE fromId WHEN ${jwtUserDTO.id} THEN toId ELSE fromId END`), 'conversationId'],
      //       [Sequelize.literal(`(select count(*) from messages where toId=${jwtUserDTO.id} and fromId=${`conversationId`} and readStatus=2)`), 'unreadCount']
      //   ]
      // },
      where: {
        [Op.or]: [
          {fromId: jwtUserDTO.id},
          {toId: jwtUserDTO.id}
        ],
        [Op.and]: [
          {
            ...userFilter
          }
        ],
      },
      order: [
        [Sequelize.literal('lastMsgTime'), 'desc']
      ],
      group: ['conversationId']
    })
    return usersList;
  }

  async getMessages(jwtUserDTO: JwtUserDTO, anotherUserSlug: string, offset: number = 0, limit: number = 50){
    const user = await this.userModel.findOne({
      where: {
        slug: anotherUserSlug
      }
    });
    if(!user){
      throw new NotFoundException();
    }
    const senderUser = await this.userModel.findOne({
      where: {
        id: jwtUserDTO.id
      }
    });
    if(!senderUser) throw new NotFoundException();
    if(senderUser.role === user.role){
      throw new ForbiddenException('Something went wrong');
    }
    // if(user.stateId !== senderUser.stateId){
    //   throw new ForbiddenException('You can message seller who is in your state only');
    // }
    const messages = await this.messageModel.findAll({
      where: {
        [Op.or]:[
          {
            [Op.and]: [
              {fromId: jwtUserDTO.id},
              {toId: user.id}
            ]
          },
          {
            [Op.and]: [
              {fromId: user.id},
              {toId: jwtUserDTO.id}
            ]
          }
        ]
      },
      order: [
        [ 'id', 'desc' ]
      ],
      offset: offset ? offset * limit : 0,
      limit: limit
    })
    await Message.update({ readStatus: 1 },
      {
        where: {
          [Op.or]:[
            {
              [Op.and]: [
                {fromId: jwtUserDTO.id},
                {toId: user.id}
              ]
            },
            {
              [Op.and]: [
                {fromId: user.id},
                {toId: jwtUserDTO.id}
              ]
            }
          ]
        }
      }
    )
    messages.sort(function(a, b){return a.id - b.id});
    return {
      messages,
      user
    };
  }

  async getUnreadCount(jwtUserDTO: JwtUserDTO){
    const data = await this.messageModel.findAndCountAll({
      where: {
        toId: jwtUserDTO.id,
        readStatus: 2
      }
    })
    return data.count
  }

  async getAllUnreadMessages(){
      const unreadMessages =  await this.messageModel.findAll({
        include: [
          { 
            model: User,
            as: 'sender',
            required:true,
            attributes: ['id', 'slug', 'email', 'businessName', 'profilePath'],
          },
          { 
            model: User,
            as: 'receiver',
            required:true,
            attributes: ['id', 'slug', 'email', 'businessName', 'profilePath'],
          }
        ],
        where: {
          readStatus: 2,
          mailSend:2
        },
        order:[
          ['id', 'ASC'],
          [{model: User, as: 'receiver'},'id','ASC']
        ]
      });
      const results = unreadMessages.reduce((groups, item) => {
        const group = (groups[item.receiver.id] || []);
        group.push(item);
        groups[item.receiver.id] = group;
        return groups;
      }, {});
      for (const key in results) {
        let templateHtml = "";
        let senderId = [];
        let receiverId = results[key][0]['receiver']['id'];
        if(results[key].length > 0){
          let email = results[key][0]['receiver']['email'];
         // let name = results[key][0]['receiver']['businessName'];
          templateHtml += `<div style="max-width:600px; margin: 0 auto; display:block; width:100%; padding: 20px;background-color: #fff;">
        <p style="font-family: Arial, sans-serif, 'Open Sans'; font-size: 32px; line-height:36px; text-align:center;color: #242b3d;">You have <strong>${results[key].length} new mesage</strong></p><p style="font-family: Arial, sans-serif, 'Open Sans';font-size: 20px;line-height: 28px; text-align:center; color: #242b3d;">Get the full messaging experience on ${SITE_NAME}</p><p style="width: 100%; height:3px; background-color: #f5f5f5;ma">&nbsp;</p>`;
        
          results[key].forEach(unreadMessag => {
            senderId.push(unreadMessag.sender.id);
            templateHtml += 
            `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 10px 0">
                <tbody>
                <tr>
                  <td width="150px" style="text-align: center;">
                    <div style="font-family: Arial, sans-serif, 'Open Sans';margin-top: 0px;margin-bottom: 0px;font-size: 20px;line-height: 28px;max-width: 584px;color: #82899a;text-align: center;">
                      <div style="width: 80px; height: 80px; margin: 0 auto; display: block; text-align:center; border-radius:100px; overflow: hidden;"><img alt="img" src="${ASSETS_URL}${unreadMessag.sender.profilePath}" style="width: 100%; height:100%; object-fit:cover" /></div>		                    
                    </div>
                  </td>
                  <td style="width:100%;">
                    <div style="font-family: Arial, sans-serif, 'Open Sans';margin-top: 0px;margin-bottom: 0px;font-size: 20px;line-height: 28px;max-width: 584px;color: #82899a;text-align: left; margin-left: 15px;">		                    
                      <p style="margin: 0;"><strong style="color: #242b3d;">${unreadMessag.sender.businessName}</strong></p>
                      <p style="margin-top: 0; margin-bottom: 10px;">${unreadMessag.message}</p>
                    </div>
                  </td>
                  <td align="center" style="font-family: Arial, sans-serif, 'Open Sans';font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #22a612;border-radius: 10px; border :thin solid #22a612;" width="210">
                    <a href="${FRONEND_BASE_URL}/messages/${unreadMessag.sender.slug}" style="text-decoration: none;outline:none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;">View Message</a>
                  </td>
                </tr>
              </tbody>
            </table>`;
          });
          templateHtml += `</div>`;
          const helperService = await new HelperService();
          const userData = {
              'MESSAGE': templateHtml,
              'LINK_1': FRONEND_BASE_URL+'/contact-us'
          };
          const emailContent = await helperService.emailTemplateContent(23, userData);
          let mailSent = await this.mailService.sendMail(email, emailContent.subject, emailContent.body);
          if(mailSent === true){
            await Message.update({ mailSend: "1" }, {
              where: {
                mailSend:"2",
                toId:receiverId,
                fromId: {
                  [Op.in]: senderId
                }, 
              }
            });
          }
        }
      }
  }

  @Cron('0 0 0 * * *')
  async handleCron() {
    this.logger.debug('unread message send email');
    await this.getAllUnreadMessages();
  }
}
