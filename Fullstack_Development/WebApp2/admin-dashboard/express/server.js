const express = require('express');
const cors = require("cors");
const {graphqlHTTP} = require("express-graphql");
const db = require("../express/database");
const graphql = require('./graphql')

db.sync();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/graphql",
    graphqlHTTP({
        schema: graphql.schema,
        rootValue: graphql.root,
        graphiql: true
    }))

// Set port, listen for requests.
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
