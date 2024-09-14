export const sale = `#graphql
    type Sale{
        id:String!
        title:String!
        price:Int
        sellerName:String
        phone:String!
        address:String
        detail:String
        meterage:Int
        room:Int
        buildYear:Int
        floor:Int
        countFloor:Int
        parking:Boolean
        elvator:Boolean
        warehouse:Boolean
        tag:[String]
        submitedAt:String!
        userId:String
        user:User
        type:PropertyType
    }
`;



