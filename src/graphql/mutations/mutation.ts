export const mutation = `#graphql
    type Mutation{
        # User Resolver
        register(email:String!,password:String!):Auth
        login(email:String!,password:String!):Auth
        editUser(user:UserEdit):User
        checkUserToken:AuthResult
        addLikedProperty(id:String!):UserLiked!
        removeLikedProperty(id:String!):UserLiked!
        
        # Upload Resolver
        uploadFile(file: Upload!): File!
        searchProperty(title:String!): [House]
    
        
        

        # Graphql Resolver For House 
        submitHouse(house:HouseSubmit):House
        editHouse(house:HouseEdit):House
        filterHouseByParameters(filter:HouseFilter):[House]
        selfHouseFilter(filter:HouseFilter):[House]
        singleHouse(houseId:ID!):House
        deleteHouse(houseId:ID!):String!
        orderHouse(category:CategoryType,type:PropertyType):OrderHouse
        

    }
`;
