import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Subscribtion } from 'src/db/interfaces/subscribtion.inteface';

@Injectable()
export class FollowService {
    constructor(private readonly db:DbService){

    }

    async getSubscribtions(id:string, followerId:number, publisherId:number):Promise<Subscribtion[]>{
        const existingSubscribtion = await this.db.getSubscribtions(id, followerId, publisherId);
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
