import { Controller, Body, Get, Param, Query, Post, Delete, BadRequestException } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('subscribtions')
export class FollowController {

    constructor(private readonly followSvc:FollowService){

    }

    @Get('/:id')
    async getSubscribtions(@Param('id') id:string, @Query('follower_id') followerId:number, @Query('publisher_id') publisherId:number){
        console.log(`${id}, ${followerId}, ${publisherId}`);
        const existingSubscribtions = await this.followSvc.getSubscribtions(id, followerId, publisherId);
        let data = [];
        for(let i = 0;i<existingSubscribtions.length; i++){
            let existingSubscribtion = existingSubscribtions[i];
            let subscribtion = {id: existingSubscribtion._id, follower_id:existingSubscribtion.followerId, existingSubscribtion:existingSubscribtion.publisherId};
            data.push(subscribtion);
        }
        return { data:data }
    }

    @Get()
    async getSubscribtion(@Query('follower_id') followerId:number, @Query('publisher_id') publisherId:number){
        console.log(`${followerId}, ${publisherId}`);
        const existingSubscribtions = await this.followSvc.getSubscribtions(null, followerId, publisherId);
        let data = [];
        for(let i = 0;i<existingSubscribtions.length; i++){
            let existingSubscribtion = existingSubscribtions[i];
            let subscribtion = {id: existingSubscribtion._id, follower_id:existingSubscribtion.followerId, existingSubscribtion:existingSubscribtion.publisherId};
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
        return { data:{id: createdSubscribtion._id, follower_id:createdSubscribtion.followerId, publisher_id:createdSubscribtion.publisherId} };
    }


    @Delete(':/id')
    async deleteSubscribtion(@Param(':id') id:string){
        const subscribtiontoDelete = await this.followSvc.deleteSubscribtion(id);
        return subscribtiontoDelete;
    }
}
