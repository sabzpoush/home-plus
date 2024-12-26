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

export const filterSaleInput = `#graphql
    input FilterSaleInput{
        priceFrom:Int
        priceTo:Int
        buildYearFrom:Int
        buildYearTo:Int
        meterageFrom:Int
        meterageTo:Int
        type:[PropertyType]
        room:Int
    }
`; 

export const filterRentInput = `#graphql
    input FilterRentInput{
        mortgageFrom:Int,
        mortgageTo:Int,
        rentFrom:Int,
        rentTo:Int,
        buildYearFrom:Int
        buildYearTo:Int
        meterageFrom:Int
        meterageTo:Int
        type:[PropertyType]
        room:Int
    }
`; 

export const editSale = `#graphql
    input SaleEdit{
        title:String
        price:Int
        sellerName:String
        phone:String
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
    }
`;

export const editBuyer = `#graphql
    input BuyerEdit{
        title:String
        price:Int
        sellerName:String
        phone:String
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
    }
`;

export const editRent = `#graphql
    input RentEdit{
        title:String
        owner:String
        mortgage:Int
        rent:Int
        phone:String
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
    }
`;

export const editUser = `#graphql
    input UserEdit{
        id: String!
        email: String!
        password: String
        name: String
        title: String
        phone: String
        registerDate: String!
        token: String
    }
`;