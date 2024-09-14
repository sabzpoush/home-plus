import {sale} from './types/sale.type';
import {user,auth} from './types/user.type';
import {rent} from './types/rent.type';
import {buyer} from './types/buyer.type';
import {userResolver} from './resolvers/user.resolver';
import {rentResolver} from './resolvers/rent.resolver';
import {saleResolver,saleQuery} from './resolvers/sale.resolver';
import {query} from './queries/query'
import { mutation } from './mutations/mutation';
import {enumTypes} from './types/enum/enum.type';
import {submitBuyerInput,submitRentInput,submitSaleInput} from './types/input/input.type';

export const typeDefs = `#graphql
    # enum
    ${enumTypes}
    #input 
    ${submitBuyerInput}
    ${submitRentInput}
    ${submitSaleInput}
    # main 
    ${sale}
    ${buyer}
    ${rent}
    ${user}
    ${auth}
    # query
    ${query}
    # mutation
    ${mutation}
`;

export const resolvers = {
    Query:{
        ...saleQuery,
    },
    Mutation:{
        ...rentResolver,
        ...saleResolver,
        ...userResolver,
    }
}