import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'cityride-auth/dist/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector: Reflector, 
                private readonly authSvc: AuthService ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    try{    
        let remoteUser = null;
        const cacheRawJson:string = await this.authSvc.getPair(request.headers.authorization);
        remoteUser = JSON.parse(cacheRawJson);      
        if(remoteUser == null || typeof remoteUser.id != 'number' || remoteUser.id <= 0){
            console.log("token is missing in redis")
            remoteUser = await this.authSvc.Authenticate(request.headers.authorization);
            this.authSvc.insertPair(request.headers.authorization, JSON.stringify(remoteUser),'EX',60);
        }
        else{
            console.log('Take user data from redis')
        }
        request.body.id = remoteUser.id;
        return true;

    }
    catch(e){
      console.log(`AuthGuard ERROR: ${e}`);
      return false;
    }
  }
}