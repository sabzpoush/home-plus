export const buyer = `#graphql
    type Buyer{
        id:String!
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
        submitedAt:String!
        type:BuyerType!
        property:[BuyerRequestType]
        user:User
    }

    type FilteredBuyer{
        newsetBuyer,
            oldestBuyer:[Buyer],
            highToLowBuyers:[Buyer],
            lowToHighBuyers:[Buyer],
            highToLowAskerRent:[Buyer],
            lowToHighAskerRent:[Buyer],
            lowToHighAskerMortgage:[Buyer],
    }
`;
