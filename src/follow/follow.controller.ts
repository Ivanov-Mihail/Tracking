import { Controller, Body, Get, Param, Query, Post, Delete, BadRequestException } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('subscribtions')
export class FollowController {

    constructor(private readonly followSvc:FollowService) {}

    @Get('/:id')  // http://localhost:3001/subscribtions/5ec7de16f06da5369455b339?follower_id=1&publisher_id=2
    async getSubscribtion(@Param('id') id:string){
        const existingSubscribtion = await this.followSvc.getSubscribtion(id);
        return { data:{ id:existingSubscribtion._id, followerId:existingSubscribtion.followerId, publisherId:existingSubscribtion.publisherId} }
    }

    @Get() // http://localhost:3001/subscribtions?follower_id=1&publisher_id=3
    async getSubscribtions(@Query('follower_id') followerId:number, @Query('publisher_id') publisherId:number){
        console.log(`${followerId}, ${publisherId}`);
        const existingSubscribtions = await this.followSvc.getSubscribtions(followerId, publisherId);
        const data = [];
        for(let i = 0;i<existingSubscribtions.length; i++){
            const existingSubscribtion = existingSubscribtions[i];
            // eslint-disable-next-line @typescript-eslint/camelcase
            const subscribtion = {id: existingSubscribtion._id, follower_id:existingSubscribtion.followerId, existingSubscribtion:existingSubscribtion.publisherId};
            data.push(subscribtion);
        }
        return { data:data }
    }

    @Post()
    async createSubscribtion(@Body('follower_id') followerId:number, @Body('publisher_id') publisherId:number){
        if(typeof followerId !== 'number' || typeof publisherId !== 'number' ){
            return new BadRequestException();
        }
        console.log(`${followerId}, ${publisherId}`);
        const createdSubscribtion = await this.followSvc.createSubscribtion(followerId, publisherId);
        // eslint-disable-next-line @typescript-eslint/camelcase
        return { data:{id: createdSubscribtion._id, follower_id:createdSubscribtion.followerId, publisher_id:createdSubscribtion.publisherId} };
    }

    @Delete('/:id')
    async deleteSubscribtion(@Param(':id') id:string){
        const subscribtiontoDelete = await this.followSvc.deleteSubscribtion(id);
        return subscribtiontoDelete;
    }
}
