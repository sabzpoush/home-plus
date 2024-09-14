export const submitSaleInput = `#graphql
    input SaleInput{
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
        type:PropertyType!
    }
`;

export const submitRentInput = `#graphql
    input RentInput{
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
        type:RentType
    }

`;

export const submitBuyerInput = `#graphql
    input BuyerInput{
        title:String!
        price:Int
        sellerName:String
        phone:String!
        address:String
        detail:String
        fromMeter:Int
        toMeter:Int
        room:Int
        fromBuildYear:Int
        toBuildYear:Int
        floor:Int
        countFloor:Int
        parking:Boolean
        elvator:Boolean
        warehouse:Boolean
        tag:[String]
        property:[BuyerRequestType]
        type:BuyerType
    }
`;