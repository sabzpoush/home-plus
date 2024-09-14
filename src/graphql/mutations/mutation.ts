export const mutation = `#graphql
    type Mutation{
        register(name:String!,title:String!,phone:String!):Auth
        login(phone:String!):Auth
        test(value:PropertyType):Test
        
        submitSale(
            sale:SaleInput
        ):Sale

        submitRent(
            rent:RentInput
        ):Rent

        submitBuyer(
            buyer:BuyerInput
        ):Buyer
    }
`;
