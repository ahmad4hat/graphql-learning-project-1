const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

//mongoose connect
mongoose.connect("mongodb://mogod:27017/graphqldb");
mongoose.connection.once("open", () =>
  console.log("connected to the database")
);

//allow cross orifin request

const app = express();
//allow cross orifin request

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("listen on port 4000"));
