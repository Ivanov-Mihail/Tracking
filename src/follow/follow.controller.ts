import { Controller, Body, Get, Param, Query, Post, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from 'cityride-auth/dist/auth/auth.guard';


UseGuards(AuthGuard)
@Controller('subscriptions')
export class FollowController {

    constructor(private readonly followSvc:FollowService) {}

    @Get('/:id')  
    async getSubscription( @Param('id') id:string){
        const existingSubscription = await this.followSvc.getSubscription(id);
        return { data:{ id:existingSubscription._id, followerId:existingSubscription.followerId, publisherId:existingSubscription.publisherId} }
    }

    @Get() 
    async getSubscriptions( @Query('follower_id') followerId:number, @Query('publisher_id') publisherId:number){
        console.log(`${followerId}, ${publisherId}`);
        const existingSubscriptions = await this.followSvc.getSubscriptions(followerId, publisherId);
        const data = [];
        for(let i = 0;i<existingSubscriptions.length; i++){
            const existingSubscription = existingSubscriptions[i];
            // eslint-disable-next-line @typescript-eslint/camelcase
            const subscription = {id: existingSubscription._id, follower_id:existingSubscription.followerId, existingSubscription:existingSubscription.publisherId};
            data.push(subscription);
        }
        return { data:data }
    }

    @Post()
    async createSubscription( @Body('follower_id') followerId:number, @Body('publisher_id') publisherId:number){
        if(typeof followerId !== 'number' || typeof publisherId !== 'number' ){
            return new BadRequestException();
        }
        console.log(`${followerId}, ${publisherId}`);
        const createdSubscription = await this.followSvc.createSubscription(followerId, publisherId);
        // eslint-disable-next-line @typescript-eslint/camelcase
        return { data: { id: createdSubscription._id, follower_id: createdSubscription.followerId, publisher_id: createdSubscription.publisherId} };
    }

    @Delete('/:id')
    async deleteSubscription( @Param('id') id:string){   
        const subscriptiontoDelete = await this.followSvc.deleteSubscription(id);
        return { data: subscriptiontoDelete };
    }
    

}
