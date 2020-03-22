import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import * as phs from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../../env';

@Controller("login")
export class AuthController {
  constructor(
    @InjectModel("User") private userModel: Model
  ) {}

  @Post()
  async login(
    @Body("email") email: string,
    @Body("password") passwordPlaintext: string
  ) {
    const user = await this.userModel.findOne({email});
    if (!user) {
      console.log("no user found for email: " + email);
      throw new UnauthorizedException();
    }

    // callback based API makes hard to convert to Promise automatically
    return new Promise((resolve, reject) => {
      const {passwordHash, roles} = user;
      phs(passwordPlaintext).verifyAgainst(
        passwordHash,
        (err, verified) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }
          const authJwtToken = jwt.sign({email, roles}, JWT_SECRET);
          resolve({authJwtToken});
        }
      );
    });
  }
}
