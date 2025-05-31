import express,{Request,Response,NextFunction,Router} from 'express';
import {ApolloServer} from 'apollo-server-express';
import {resolvers,typeDefs} from './graphql/index.resolvers';


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

app.get('/',(req,res)=>{
    res.status(200).json({message:'welcome!'});
});

app.get('/ip', (req, res) => {
    // Get the client's IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.send(`Your IP address is: ${ip}`);
  });
  

app.listen(3010,'0.0.0.0',()=>{
    console.log('Server Server Server http://localhost:3000');
});