import {Injectable, NestMiddleware} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../../env';

/*
* A middleware is a function that is executed before the rest of
* the code inside a controller. Middlewares can be chained, hence
* the "next" function.
* */
@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      // not all requests should be authenticated
      // guarding should be done in the guards
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, JWT_SECRET);
      if (user) {
        console.log("Found user in JWT: ", user);
        req.user = user;
      }
    } catch (err) {
      console.log("Could not decode JWT: ", err);
    } finally {
      next();
    }
  }
}
