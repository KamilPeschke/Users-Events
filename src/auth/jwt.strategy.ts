import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "prisma/prisma.service";
import { AuthService } from "src/user/auth.service";
import { User } from "src/user/user.entity";

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly authService: AuthService
){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.AUTH_SECRET
        });
    }

    async validate(payload: any):Promise<any>{
        return await this.authService.validateUser(
            payload.email, payload.password
        )
     }
  }   