import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export abstract class AuthorizationGuard implements CanActivate {
  protected constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp();
    const request = host.getRequest();
    const user = request.user;

    if (!user || !this.isAllowed(user.roles)) {
      console.log("User authenticated but not authorized; denying access");
      throw new ForbiddenException();
    }
    console.log("User authenticated and authorized; allowing access");

    return true;
  }

  private isAllowed(userRoles: string[]): boolean {
    let isAllowed = false;
    userRoles.forEach(role => {
      console.log("Checking if role allowed: " + role);
      if (this.allowedRoles.includes(role)) {
        isAllowed = true;
      }
    });
    return isAllowed;
  }
}
