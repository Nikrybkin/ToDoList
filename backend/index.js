const express = require('express');
const fs = require('fs');

const server = express();
server.use(express.json());
server.use(cors());
const PORT = 8000;

server.post('/',(req,res) => {
    const body = req.body;
    console.log('body: ', body);
    fs.readFile('./todos.json', (err, data) => {
        const db = JSON.parse(data);
        data.todos.push(req.body)
        console.log('data: ', db.todos)
        // db.todos.push(req.body)

        fs.writeFile('./todos.json', JSON.stringify(db), (err) => {
            if (err) {
              console.log('error', err)
            } else {
              res.send(db)
            }
          }
        );

      });
  },
);

server.get('/', (req,res,) => {
    fs.readFile('./todos.json', (err, data) => {
        res.send(JSON.parse(data));
      },
    );
  });

server.path('/', (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        const db = JSON.parse(data)
        console.log('data: ', db.todos)
        // db.todos.push(req.body)
        const index = db.todos.findIndex((todo) => req.body.id === todo.id);
      db.todos[index].complecated = !db.todos[index].complecated;

        fs.writeFile('./todos.json', JSON.stringify(db), (err) => {
            if (err) {
                console.log('error', err)
            } else {
                res.send(db)
            }
        })
    })
})

server.delete('/', (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        const db = JSON.parse(data)
        console.log('data: ', db.todos)

        const NewTodos = db.todos.filter((todo) => req.body.id !== todo.id)
        db.todos = NewTodos

        fs.writeFile('./todos.json', JSON.stringify(db), (err) => {
            if (err) {
                console.log('error', err)
            } else {
                res.send(db)
            }
        })
    })
})

server.listen(3000, () => {
  console.log('server server');
});