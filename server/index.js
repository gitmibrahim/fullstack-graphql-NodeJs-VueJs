import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers.js'
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('GraphQL with Node.js and Vue.js');
});

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(4200, () => console.log('Server is running on http://localhost:4200/graphql'));