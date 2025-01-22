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

        filterSaleByParameters(
            filter:FilterSaleInput
        ):[Sale]
        filterRentByParameters(
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
        newProp(reverse:Boolean,category:MainType,type:PropertyFilterType):Json!

        addLikedProperty(id:String!):UserLiked!
        removeLikedProperty(id:String!):UserLiked!

        highToLowSale(reverse:Boolean):[Sale]

        orderSale(type:PropertyType):FilteredSale
        orderRent(type:RentType):FilteredRent
        orderBuyer(category:BuyerType,type:BuyerRequestType):FilteredBuyer
        

        # Graphql Resolver For House 
        submitHouse(house:HouseInput):House
        editHouse(house:HouseEdit):House
        filterHouseByParameters(filter:HouseFilter):[House]
        selfHouseFilter(filter:HouseFilter):[House]
        singleHouse(houseId:ID!):House
        deleteHouse(houseId:ID!):String!
        orderHouse(category:CategoryType,type:PropertyType):OrderHouse
        

    }
`;
