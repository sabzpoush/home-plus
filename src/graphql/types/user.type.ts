export const user = `#graphql
    type User{
        id:String!
        email:String!
        password:String!
        name:String!
        title:String!
        phone:String
        registerDate:String!
        token:String
        Sale:[Sale]
        Buyer:[Buyer]
        Rent:[Rent]
    }
    scalar Upload

    type File {
      filename: String!
      mimetype: String!
      encoding: String!
    }

    type UserLiked {
        message:String
    }

    type AuthResult {
        user:Json
        tokenStat:Boolean!
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