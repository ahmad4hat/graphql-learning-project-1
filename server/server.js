const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/graphqldb");
mongoose.connection.once("open", () =>
  console.log("connected to the database")
);

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("listen on port 4000"));
