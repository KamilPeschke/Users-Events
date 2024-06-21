import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CreateUserInput } from "src/input/create-user.input";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "src/auth/auth.payload";
import { LoginUserInput } from "src/input/login-user.input";

@Injectable()
export class AuthService{

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}

    private readonly logger = new Logger(AuthService.name)

    public generateJwtTokenForUser(user: User){
        return this.jwtService.sign({
            username: user.username,
            sub: user.id
        })
    }

    async createNewUser(input: CreateUserInput):Promise<User>{
        
       const hashedPassword = await bcrypt.hash(input.password, 10)

         try{    
              return await this.prisma.user.create({
                data:{
                    username: input.username,
                    password: hashedPassword,
                    email: input.email,
                }
            })

         }catch(error){
            throw new Error('username or email already exist')
         }    
    }       

    async register(input: CreateUserInput):Promise<AuthPayload>{

        const newUser = await this.createNewUser(input);
        const token = this.generateJwtTokenForUser(newUser);

        return{
            access_token: token,
            user: newUser
        }
    }

    async validateUser(email: string, password: string):Promise<User>{
        const user = await this.prisma.user.findFirst({
            where: {email: email}
        })

        const token = this.generateJwtTokenForUser(user)

        if(!user){
            this.logger.debug(`this user does not exist`)
            throw new UnauthorizedException();
        }
        if(!bcrypt.compare(password, user.password)){
            this.logger.debug(`invalid password`)
            throw new UnauthorizedException();
        }
        
        return user
    }

    async findAllUsers():Promise<User[]>{
        return await this.prisma.user.findMany()
    }

    async findUserById(id: number):Promise<User>{
        return this.prisma.user.findFirstOrThrow({
            where: {id}
        })
    }
}