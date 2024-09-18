export const user = `#graphql
    type User{
        id:String!
        email:String!
        password:String!
        name:String!
        title:String!
        phone:String
        registerDate:String!
        Sale:[Sale]
        Buyer:[Buyer]
        Rent:[Rent]
    }
`;

export const auth = `#graphql
    type Auth{
        token:String
        user:User!
    }
    type Test{
        value:String
    }
`;