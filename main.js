const express = require('express');
const app = express();
const fs = require("node:fs/promises");
const path = require("node:path");
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const readFile = async () => {
    return await fs.readFile(path.join(process.cwd(), 'db', 'users.json'), "utf-8");
}

const getUsers = async () => {
    const usersJson = await readFile();
    return JSON.parse(usersJson);
}

const users = getUsers();

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users', (req, res) => {
    res.json(users)
})
app.post('/users', (req, res) => {
    const user = req.body;
    console.log(user)
    res.json(user)
})

app.get('/users/userId', (req, res) => {
    const params = req.params;
    const user = users.find(user => user.id === Number(params.userId));
    res.json(user);
})

app.listen(5000)





