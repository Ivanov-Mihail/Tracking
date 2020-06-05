import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Subscription } from 'src/db/interfaces/subscribtion.inteface';

@Injectable()
export class FollowService {
    constructor(private readonly db:DbService) { }


    async getSubscription(id:string):Promise<Subscription>{
        const existingSubscription = await this.db.getSubscription(id);
        return existingSubscription;
    }

    async getSubscriptions(followerId:number, publisherId:number):Promise<Subscription[]>{
        const existingSubscription = await this.db.getSubscriptions(followerId, publisherId);
        return existingSubscription;
    }

    async createSubscription(followerId:number, publisherId:number){
        const createdSubscription = await this.db.createSubscription(followerId, publisherId);
        return createdSubscription;
    }


    async deleteSubscription(id:string){
        const subscriptionDelete = await this.db.deleteSubscription(id);
        if(subscriptionDelete.n == 1)
            return {isDeleted: true, message:`Subscription ${(id)} successfully deleted.`};
        else
            return {isDeleted: false, message:`Subscription ${(id)} dosen't exist.`};
    }
}
