const express = require('express');
const app = express();
const fs = require("node:fs/promises");
const path = require("node:path");
const {application} = require("express");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const server = async () => {
    const readFile = async () => {
        return await fs.readFile(path.join(process.cwd(), 'db', 'users.json'), "utf-8");
    }

    const writeFile = async (data) => {
        await fs.writeFile(path.join(process.cwd(), 'db', 'users.json'), JSON.stringify(data));
    }

    const usersJson = await readFile();
    const parsedUsers = JSON.parse(usersJson);


    app.get('/', (req, res) => {
        res.send('Hello world');
    });


    app.get('/users', (req, res) => {
        res.json(parsedUsers);
    });

    app.post('/users', (req, res) => {
        const user = req.body;
        console.log(user);
        const newUser = {
            id: parsedUsers.length + 1,
            name: user.name,
            email: user.email,
            password: user.password
        }
        parsedUsers.push(newUser);
        writeFile(parsedUsers);
        res.sendStatus(201);
    })

    app.get('/users/:userId', (req, res) => {
        const params = req.params;
        const user = parsedUsers.find(user => user.id === Number(params.userId));
        res.json(user);
    })

    app.delete('/users/:userId', (req, res) => {
        const params = req.params;
        console.log(params);
        const filteredUsers = parsedUsers.filter(user => user.id !== Number(params.userId));
        writeFile(filteredUsers);
        res.sendStatus(204);
    })

    app.put('/users/:userId', (req, res) => {
        const params = req.params;
        console.log(params);
        const body = req.body;
        console.log(body);
        for (const user of parsedUsers) {
            if (user.id === Number(params.userId)) {
                user.name = body.name
                user.email = body.email
                user.password = body.password
            }
        }
        writeFile(parsedUsers);
        res.sendStatus(201);
    })

    app.listen(5000);
}

void server()






