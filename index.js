const express = require("express");

const server = express();

server.use(express.json());

let users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
]

server.get("/api/users", (req, res) => {
    if (users) {
    res.json(users)
        } else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.post("/api/users", (req, res) => {
    const user = req.body;
    if(!user.bio || !user.name) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else{
    users.push(user);
    res.status(201).json(users)
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    const userId = users.find(user => user.id == id)
    if (userId === undefined) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    res.json(userId)
});


const port = 5000;
server.listen(port, () => console.log(`/n === api running on port ${port} === /n`))