export const mutation = `#graphql
    type Mutation{
        register(email:String!,password:String!):Auth
        login(email:String!,password:String):Auth
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

        filterSale(
            filter:FilterSaleInput
        ):[Sale]

        singleSale(id:ID!):Sale
    }
`;
