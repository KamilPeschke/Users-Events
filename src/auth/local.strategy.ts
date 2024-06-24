import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "prisma/prisma.service";
import { LoginUserInput } from "src/input/login-user.input";
import { AuthService } from "src/user/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
    constructor(
        private readonly authService: AuthService
){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.AUTH_SECRET
        });
    }

    async validate(data: LoginUserInput):Promise<any>{
        return await this.authService.validateUser(
            data
        )
     }
}