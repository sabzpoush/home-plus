export const HouseType = `#graphql
    type House{
        id:String!
        title:String!
        price:Int
        mortgage:Int
        rent:Int
        sellerName:String
        phone:String!
        address:String
        detail:String
        meterage:Int
        fromMeter:Int
        toMeter:Int
        room:Int
        buildYear:Int
        fromBuildYear:Int
        toBuildYear:Int
        floor:Int
        countFloor:Int
        parking:Boolean
        elvator:Boolean
        warehouse:Boolean
        tag:[String]
        submitedAt:String!
        type:PropertyType!
        category:CategoryType!
        user:User!
    }

    type OrderHouse{
        newestHouse:[House],
        oldestHouse:[House],
        highToLowBuyers:[House],
        lowToHighBuyers:[House],
        highToLowAskerRent:[House],
        lowToHighAskerRent:[House],
        highToLowAskerMortgage:[House],
        lowToHighAskerMortgage:[House],
        highToLowRentMortgage:[House]
        lowToHighRentMortgage:[House]
        highToLowRent:[House]
        lowToHighRent:[House]
        highToLowSales:[House]
        lowToHighSales:[House]
    }

    type FilterHouseByCategory{
        newestHouse:[House],
        oldestHouse:[House],
        highToLowHouse:[House],
        lowToHighHouse:[House],
        highMortgage:[House],
        lowMortgage:[House],
    }
`;
