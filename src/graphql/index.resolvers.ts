import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import {sale} from './types/sale.type';
import {user,auth} from './types/user.type';
import {rent} from './types/rent.type';
import {buyer} from './types/buyer.type';
import {userQueryResolver, userResolver} from './resolvers/user.resolver';
import {rentQuery, rentResolver} from './resolvers/rent.resolver';
import {saleMutation,saleQuery} from './resolvers/sale.resolver';
import {query} from './queries/query'
import { mutation } from './mutations/mutation';
import {enumTypes} from './types/enum/enum.type';
import { filterSaleInput,
    submitBuyerInput,
    submitRentInput,
    submitSaleInput ,
    editSale,editBuyer,editRent, editUser,filterRentInput, 
    houseInput} from './types/input/input.type';
import {allPropertiesType} from './types/input/query.type';
import {unionTypes} from './types/union/union.type';
import {allResolversMutation,allResolversQuery} from './resolvers/all.resolver';
import {scalarType} from './types/scalar/scalar.type';
import { buyerQuery } from './resolvers/buyer.resolver';
import { houseQuery,houseMutation } from './resolvers/house.resolver';
import {HouseType} from './types/house.type';

export const typeDefs = `#graphql
    #scaler
    ${scalarType}
    # enum
    ${enumTypes}
    # input 
    ${submitBuyerInput}
    ${submitRentInput}
    ${submitSaleInput}
    ${filterSaleInput}
    ${editSale}
    ${editBuyer}
    ${editRent}
    ${editUser}
    ${filterRentInput}
    # House
    ${HouseType}
    ${houseInput}
    # main 
    ${sale}
    ${buyer}
    ${rent}
    ${user}
    ${auth}
    #union
    ${unionTypes}
    # query
    ${allPropertiesType}
    ${query}
    # mutation
    ${mutation}
`;

export const resolvers = {
    Json:GraphQLJSON,
    JsonObject:GraphQLJSONObject,
    Query:{
        ...buyerQuery,
        ...saleQuery,
        ...rentQuery,
        ...userQueryResolver,
        ...allResolversQuery,
        ...houseQuery,
    },
    Mutation:{
        ...allResolversMutation,
        ...rentResolver,
        ...saleMutation,
        ...userResolver,
        ...houseMutation,
    }
}