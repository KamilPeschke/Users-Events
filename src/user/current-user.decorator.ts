import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
        const context = GqlExecutionContext.create(ctx);

        if(context){
            return context.getContext().user;
        }
    }
)