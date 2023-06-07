const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

// make a MongoClient
const uri = `mongodb+srv://crud:gr8Ex7jwl9OKybEe@cluster0.undypbz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const run = async () => {
  try {
    const usersCollection = client.db("mongoCrudServer").collection("users");
    app.post("/users", async (req, res) => {
      const user = req.body;
      //   console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const curser = usersCollection.find(query);
      const users = await curser.toArray();
      res.send(users);
    });

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({
        // must added new kayword before ObjectId()
        _id: new ObjectId(id),
      });
      res.send(result);
      //   const result = await usersCollection.deleteOne(query);
    });
  } finally {
  }
};
run().catch((err) => console.log(err));

// Base API
app.get("/", (req, res) => {
  res.send("Mongo server is running");
});

app.listen(port, () => {
  console.log(`Mongo crud server is running on http://localhost:${port}`);
});
