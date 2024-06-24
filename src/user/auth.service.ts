import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CreateUserInput } from "src/input/create-user.input";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "src/auth/auth.payload";
import { LoginUserInput } from "src/input/login-user.input";
import { EditUserInput } from "src/input/edit-user.input";

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

    async validateUser(user: LoginUserInput):Promise<User>{

        const currentUser = await this.prisma.user.findUnique({
            where: { username: user.username }
        })

        if(!currentUser){
            this.logger.debug("This user does not exist")
            throw new UnauthorizedException()
        }

        return currentUser;
    }

    async login(data:LoginUserInput):Promise<AuthPayload>{
        
        const user = await this.validateUser(data)
        const token = this.generateJwtTokenForUser(user)

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            this.logger.debug('Invalid email or password')
            throw new UnauthorizedException();
        }

        return {
            access_token: token,
            user
        }
    }

    async edit(id: number, input:EditUserInput):Promise<User>{

        return this.prisma.user.update({
            where:{id},
            data: input
        });
    }

    async findAllUsers():Promise<User[]>{
        return await this.prisma.user.findMany()
    }

    async findUserById(id: number):Promise<User>{
        return this.prisma.user.findFirstOrThrow({
            where: {id}
        })
    }

    async findUserByEmail(email: string):Promise<User>{
        return this.prisma.user.findFirstOrThrow({
            where:{email: email}
        })
    }

    async findUserByUsername(username: string):Promise<User>{
        return this.prisma.user.findFirst({
            where: {username: username}
        })
    }
}