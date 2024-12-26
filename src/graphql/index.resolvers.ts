import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import {sale} from './types/sale.type';
import {user,auth} from './types/user.type';
import {rent} from './types/rent.type';
import {buyer} from './types/buyer.type';
import {userQueryResolver, userResolver} from './resolvers/user.resolver';
import {rentResolver} from './resolvers/rent.resolver';
import {saleResolver,saleQuery} from './resolvers/sale.resolver';
import {query} from './queries/query'
import { mutation } from './mutations/mutation';
import {enumTypes} from './types/enum/enum.type';
import { filterSaleInput,
    submitBuyerInput,
    submitRentInput,
    submitSaleInput ,
    editSale,editBuyer,editRent, editUser,filterRentInput } from './types/input/input.type';
import {submitedType} from './types/input/query.type';
import {unionTypes} from './types/union/union.type';
import {allResolvers} from './resolvers/all.resolver';
import {scalarType} from './types/scaler/scalar.type';



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
    # main 
    ${sale}
    ${buyer}
    ${rent}
    ${user}
    ${auth}
    #union
    ${unionTypes}
    # query
    ${submitedType}
    ${query}
    # mutation
    ${mutation}
`;

export const resolvers = {
    // mixedPropertyType: {
    //     __resolveType(obj) {
    //       if (obj.type == "Rent") {
    //         return obj.type;
    //       } else if (obj.type == "Buyer") {
    //         return obj.type;
    //       } else if(obj !=null && obj != undefined && !obj.length){
    //         return "Sale";
    //       }
    //       return null;
    //     },
    //   },
    Json:GraphQLJSON,
    JsonObject:GraphQLJSONObject,
    Query:{
        ...saleQuery,
        ...userQueryResolver
    },
    Mutation:{
        ...allResolvers,
        ...rentResolver,
        ...saleResolver,
        ...userResolver,
    }
}