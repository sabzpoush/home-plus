export const mutation = `#graphql
    type Mutation{
        register(email:String!,password:String!):Auth
        login(email:String!,password:String!):Auth
        editUser(user:UserEdit):User
        checkUserToken:AuthResult
    
        submitSale(
            sale:SaleInput
        ):Sale

        submitRent(
            rent:RentInput
        ):Rent

        submitBuyer(
            buyer:BuyerInput
        ):Buyer

        editSale(
            id:ID!
            sale:SaleEdit
        ):Sale

        editRent(
            id:ID!
            rent:RentEdit
        ):Rent

        editBuyer(
            id:ID!
            buyer:BuyerEdit
        ):Buyer

        filterSale(
            filter:FilterSaleInput
        ):[Sale]
        filterRent(
            filter:FilterRentInput
        ):[Rent]

        selfPropertyFilter(
            filter:FilterSaleInput
        ):[Sale]

        singleSale(id:ID!):Sale
        singleRent(id:ID!):Rent
        singleBuyer(id:ID!):Buyer

        deleteSale(id:ID!):String
        deleteRent(id:ID!):String
        deleteBuyer(id:ID!):String
        
        uploadFile(file: Upload!): File!

        searchProperty(title:String!): AllProperties
        findProperty(id:String!): FindProp
        newProp(reverse:Boolean):Json!

        addLikedProperty(id:String!):UserLiked!
        removeLikedProperty(id:String!):UserLiked!

        highToLowSale(reverse:Boolean):[Sale]
        highToLowMortgage(reverse:Boolean):[Rent]
        highToLowRent(reverse:Boolean):[Rent]

        filteredSale(type:String):FilteredSale
    }
`;
