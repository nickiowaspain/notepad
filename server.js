const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const Note = require('./db');

app.post('/notes', (req, res) => {
    Note.create({data: req.body.data}).then((note)=>{res.json(note)})
})

app.get('/notes', (req, res) => {

    const query = {order:[['updatedAt', 'DESC']], where: {id: {$gte: 1}}};

    if (req.params.limit) {
        query.limit = req.params.limit
    };

    if (req.params.order) {
        query. order = [['updatedAt', req.params.order]]
    };

    if (req.params.start) {
        query.where = {id: {$gte: req.params.start}}
    }

    Note.findAll(query).then((notes)=>{res.json(notes)})
})

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findById(id).then((note)=>{
        res.json(note)
    })
})

app.put('/notes/:id', (req,res)=> {
    Note.update({ data: req.body.data},{ where: { id: req.params.id }})
    .then(()=>{
        Note.findById(req.params.id)
        .then((note)=>{
            res.json(note);
        })
    })
})

app.delete('/notes/:id', (req,res)=> {
    Note.destroy({ where: { id: req.params.id }})
    .then(()=>{
        res.end()
    })
})

app.listen(3000, function(){
    console.log("server running on port 3000")
})