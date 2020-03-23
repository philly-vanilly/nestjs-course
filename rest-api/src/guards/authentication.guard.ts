import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp();
    const request = host.getRequest();
    const user = request.user;

    if (!user) {
      console.log("User not authenticated; denying access");
      throw new UnauthorizedException();
    }
    console.log("User authenticated; allowing access");

    return true;
  }
}
