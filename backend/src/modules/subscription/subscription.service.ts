import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Settings } from 'src/models/settings.model';
import { User } from 'src/models/user.model';
import { UserSubscription } from 'src/models/userSubscription.model';
const moment = require('moment');
const fs = require('fs');
@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Settings)
        private settingsModel: typeof Settings,
        @InjectModel(UserSubscription)
        private userSubscriptionModel: typeof UserSubscription,
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async updateSubscription(res: any){
      try {
        fs.appendFile('src/modules/subscription/response.txt', JSON.stringify(res), (fsErr) => {
          if (fsErr) {
            console.log('fsErr', fsErr);
          }
        })
        switch (res.type) {
          case 'customer.subscription.updated':
            if(res.data?.object?.plan?.id){
                const userSubscription = await this.userSubscriptionModel.findOne({
                    where: {
                        subscriptionId: res.data?.object?.id
                    },
                    order: [
                        ['createdAt', 'desc']
                    ]
                });
                if(userSubscription){
                    let subscribed = [];
                    subscribed['userId'] = userSubscription.userId;
                    subscribed['planId'] = userSubscription.planId;
                    subscribed['customerId'] = userSubscription.customerId;
                    subscribed['subscriptionToken'] = userSubscription.subscriptionToken;
                    subscribed['subscriptionId'] = userSubscription.subscriptionId;
                    subscribed['status'] = res.data?.object?.status;
                    subscribed['amount'] = null;
                    if(res.data?.object?.plan?.amount){
                        subscribed['amount'] = (res.data?.object?.plan?.amount / 100);
                    }
                    subscribed['resJson'] = JSON.stringify(res);
                    subscribed['startDate'] = await moment(res.data?.current_period_start).format('YYYY-MM-DD'); //current Date
                    subscribed['endDate'] = await moment(res.data?.current_period_end).format('YYYY-MM-DD'); //end date 
                    const newSubscriptionId = await this.userSubscriptionModel.create({...subscribed});
                    const user = await this.userModel.findOne({
                        where: {
                          id: userSubscription.userId
                        }
                    })
                    user.update({ 
                      planExpiryDate: subscribed['endDate'],
                      subscriptionId: newSubscriptionId.id
                    });
                    return user;
                }
            }
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);  
        }
      }
      catch (err) {
        console.log(err)
        fs.appendFile('src/modules/subscription/error-logs.txt', JSON.stringify(err), (fsErr) => {
          if (fsErr) {
            console.log('fsErr', fsErr);
          }
        })
      }
    }
}
