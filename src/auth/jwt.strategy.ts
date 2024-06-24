import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

       constructor(
        private readonly prisma: PrismaService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_SECRET
            });
    }

    public async validate(payload:any):Promise<any>{
        return this.prisma.user.findUnique({
            where:{id :payload.sub}
        })
    }
  
  }   