export const editUser = `#graphql
    input UserEdit{
        id: String!
        email: String!
        password: String
        name: String
        title: String
        phone: String
        registerDate: String!
   }
`;

export const houseInput = `#graphql
    input HouseSubmit {
        title:String!
        price:Int
        rent:Int
        mortagage:Int
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
        category:CategoryType!
        type:PropertyType!
    }

    input HouseEdit {
        title:String
        price:Int
        mortgage:Int
        rent:Int
        sellerName:String
        phone:String
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
        property:PropertyType
    }

    input HouseFilter {
        title:String
        priceFrom:Int
        priceTo:Int
        mortgageFrom:Int,
        mortgageTo:Int,
        rentFrom:Int,
        rentTo:Int,
        buildYearFrom:Int
        buildYearTo:Int
        meterage:Int
        meterageFrom:Int
        meterageTo:Int
        category:CategoryType
        type:[PropertyType]
        room:Int 
    }
`;