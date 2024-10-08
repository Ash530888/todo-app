/*import express from 'express'; // express framework, helps set up server, define routes, manage requests/responses
import cors from 'cors'; // allows frontend to communicate w/ backend
import { Pool } from 'pg'; // to create a pool of PostgreSQL client connections*/

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express(); // instance of express app
const port = 3000; // port that the backend express server will run on

// configure connection pool to db
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todos_db',
    port: 5432
})

// Middleware
app.use(cors()); // allows your backend API to handle requests from different origins (e.g. your frontend)
app.use(express.json()); // middleward to auto-parse JSON request bodies

// GET endpoint at api/todos
app.get('/api/todos', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM todos ORDER BY datetime_due');
        res.json(result.rows);
    } catch(error){
        console.error('Error retrieving todos:', error);
        res.status(500).json({error: error.message})
    }
});

// POST endpoint at /api/todos
app.post('/api/todos', async (req, res) => {
    try{
        const new_todo = req.body;
        console.log("new_todo.datetime_due "+new_todo.datetime_due);
        if(new_todo.datetime_due){
            console.log("if(new_todo.datetime_due)");
            query = `INSERT INTO todos (datetime_due, name, details) VALUES ($1, $2, $3) RETURNING *`;
            values = [new Date(new_todo.datetime_due),new_todo.name, new_todo.details];
        }
        else{
            query = `INSERT INTO todos (name, details) VALUES ($1, $2) RETURNING *`;
            values = [new_todo.name, new_todo.details];
        }
        
        const result = await pool.query(query, values);
        res.status(201).json(result.rows);
    }
    catch(error){
        console.error('Failed to add new todo to database:', error);
        res.status(500).json({error: error.message});
    }
});

app.put('/api/todos/:id',  async (req, res) => {
    try{
        console.log("updating todo");
        const todoId = req.params.id;
        const updatedTodo = req.body;
        console.log(todoId);
        console.log(updatedTodo.name);
        if(updatedTodo.datetime_due){
            query = `UPDATE todos SET datetime_due = $1, name = $2, details = $3 WHERE id=$4`;
            values = [new Date(updatedTodo.datetime_due),updatedTodo.name, updatedTodo.details, todoId];
        }
        else{
            query = `UPDATE todos SET name = $1, details = $2 WHERE id=$3`;
            values = [updatedTodo.name, updatedTodo.details, todoId];
        }

        const result=await pool.query(query, values);
        console.log(result);
        res.status(201).json({ message: "Todo updated successfully"});

    } catch(error){
        console.error('Error adding todo:', error);
        res.status(500).json({error: error.message})
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try{
        const result=await pool.query(`DELETE FROM todos WHERE id = $1`, [req.params.id]);
        console.log(result);
        res.status(201).json({ message: "Deleted todo with id"+req.params.id});
    } catch(error){
        console.error('Error deleting todo with id '+req.params.id+': ', error);
        res.status(500).json({error: error.message})
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});