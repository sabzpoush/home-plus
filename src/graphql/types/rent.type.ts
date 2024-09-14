export const rent = `#graphql
    type Rent{
        id:String!
        title:String!
        owner:String
        mortgage:Int
        rent:Int
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
        submitedAt:String
        type:RentType
        user:User
    }
`;