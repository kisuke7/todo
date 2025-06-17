const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173"
}));


app.post("/todos",async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(400).json({
            msg: "Invalid payload"
        })
        return;
    }
    await todo.create({
        title: parsedPayload.data.title,
        description: parsedPayload.data.description,
        completed: false
    })
    res.status(201).json({
        msg: "Todo created successfully"
    })
});

app.get("/todos", async (req, res) => {
    const todos = await todo.find({});
    res.status(200).json({
        todos
    })
});

app.put("/completed",async (req,res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(400).json({
            msg: "Invalid payload"
        })
    }
    await todo.updateMany({
        _id: req.body.id
    },{
        completed: true
    })
    res.status(200).json({
        msg: "Todo completed successfully"
    })
});

app.listen(3000);