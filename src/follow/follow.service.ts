import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Subscribtion } from 'src/db/interfaces/subscribtion.inteface';

@Injectable()
export class FollowService {
    constructor(private readonly db:DbService){

    }


    async getSubscribtion(id:string):Promise<Subscribtion>{
        const existingSubscribtion = await this.db.getSubscribtion(id);
        return existingSubscribtion;
    }

    async getSubscribtions(followerId:number, publisherId:number):Promise<Subscribtion[]>{
        const existingSubscribtion = await this.db.getSubscribtions(followerId, publisherId);
        return existingSubscribtion;
    }

    async createSubscribtion(followerId:number, publisherId:number){
        const createdSubscribtion = await this.db.createSubscribtion(followerId, publisherId);
        return createdSubscribtion;
    }


    async deleteSubscribtion(id:string){
        const subscribtiontoDelete = await this.db.deleteSubscribtion(id);
        return subscribtiontoDelete;
    }
}
