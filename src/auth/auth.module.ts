import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/user/auth.service';
import { UserResolver } from 'src/user/user.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
    imports:[
        PassportModule
        ,JwtModule.register({
            // useFactory: () => ({
                secret: process.env.AUTH_SECRET,
                signOptions: {
                    expiresIn: '60m'
                }
            })],
    providers:[UserResolver,AuthService,PrismaService,JwtStrategy,LocalStrategy]
})
export class AuthModule {}
