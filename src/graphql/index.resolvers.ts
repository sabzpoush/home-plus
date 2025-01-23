import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import {user,auth} from './types/user.type';
import {userQueryResolver, userResolver} from './resolvers/user.resolver';
import {query} from './queries/query'
import { mutation } from './mutations/mutation';
import {enumTypes} from './types/enum/enum.type';
import {editUser, houseInput} from './types/input/input.type';
import {unionTypes} from './types/union/union.type';
import {scalarType} from './types/scalar/scalar.type';
import { houseQuery,houseMutation } from './resolvers/house.resolver';
import {HouseType} from './types/house.type';

export const typeDefs = `#graphql
    #scaler
    ${scalarType}
    # enum
    ${enumTypes}
    # input 
    ${editUser}
    # House
    ${HouseType}
    ${houseInput}
    # main 
    ${user}
    ${auth}
    #union
    ${unionTypes}
    # query
    ${query}
    # mutation
    ${mutation}
`;

export const resolvers = {
    Json:GraphQLJSON,
    JsonObject:GraphQLJSONObject,
    Query:{
        ...userQueryResolver,
        ...houseQuery,
    },
    Mutation:{
        ...userResolver,
        ...houseMutation,
    }
}