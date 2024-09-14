import express,{Request,Response,NextFunction,Router} from 'express';
import {ApolloServer} from 'apollo-server-express';
import {resolvers,typeDefs} from './graphql/index.resolvers';
import { userValidator } from './utils/auth/auth.util';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const startServer = async()=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async({ req }) => {
            return {req};
          },
    });
    await server.start();

    server.applyMiddleware({app});
}

startServer();

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000');
});