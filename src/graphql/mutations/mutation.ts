export const mutation = `#graphql
    type Mutation{
        register(email:String!,password:String!):Auth
        login(email:String!,password:String):Auth
    

        submitSale(
            sale:SaleInput
        ):Sale

        filterSale(
            filter:FilterSaleInput
        ):[Sale]

        singleSale(id:ID!):Sale
        singleRent(id:ID!):Rent
        singleBuer(id:ID!):Buyer

        deleteSale(id:ID!):String
        deleteRent(id:ID!):String
        deleteBuyer(id:ID!):String

        submitRent(
            rent:RentInput
        ):Rent

        submitBuyer(
            buyer:BuyerInput
        ):Buyer
    }
`;
